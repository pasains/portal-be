// handling all db related for inventory use case

import prisma from "../configuration/db";
import {
  InventoryCreateParams,
  InventoryUpdateParams,
} from "../types/inventory";

export const createInventory = async (inventory: InventoryCreateParams) => {
  const newInventory = await prisma.$transaction(async (prisma) => {
    const createdInventory = await prisma.inventory.create({
      data: {
        id: inventory.id,
        inventoryName: inventory.inventoryName,
        refId: inventory.refId,
        description: inventory.description,
        condition: inventory.condition,
        note: inventory.note,
        isBorrowable: inventory.isBorrowable,
        inventoryTypeIdRel: {
          connectOrCreate: {
            where: {
              id: inventory.inventoryTypeId,
            },
            create: {
              inventoryTypeName: inventory.inventoryTypeName,
              description: inventory.descriptionInventoryType,
            },
          },
        },
        documentIdRel: {
          createMany: {
            data: [{ url: inventory.url }],
          },
        },
        inventoryStockIdRel: {
          create: {
            totalQuantity: inventory.currentQuantity,
            currentQuantity: inventory.currentQuantity,
          },
        },
      },
      include: {
        inventoryHistoryIdRel: true,
        inventoryStockIdRel: true,
        documentIdRel: true,
      },
    });
    return createdInventory;
  });
  return newInventory;
};

export const updateInventory = async (
  inventoryId: bigint,
  inventory: InventoryUpdateParams,
) => {
  const newUpdatedInventory = await prisma.$transaction(async (prisma) => {
    const updatedInventory = await prisma.inventory.update({
      where: { id: inventoryId },
      data: {
        id: inventory.id,
        inventoryName: inventory.inventoryName,
        description: inventory.description,
        refId: inventory.refId,
        condition: inventory.condition,
        note: inventory.note,
        isBorrowable: inventory.isBorrowable,
        inventoryTypeIdRel: {
          update: {
            data: {
              inventoryTypeName: inventory.inventoryTypeName,
              description: inventory.descriptionInventoryType,
            },
          },
        },
        documentIdRel: {
          updateMany: {
            where: { inventoryId: inventory.id },
            data: { url: inventory.url },
          },
        },
        inventoryStockIdRel: {
          updateMany: {
            where: { inventoryId: inventory.id },
            data: { currentQuantity: inventory.currentQuantity },
          },
        },
      },
      include: {
        inventoryStockIdRel: { select: { currentQuantity: true } },
        documentIdRel: { select: { url: true } },
      },
    });
    return updatedInventory;
  });
  return newUpdatedInventory;
};

export const patchInventory = async (
  inventoryId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedInventory = await prisma.inventory.update({
    where: { id: inventoryId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedInventory;
};

export const deleteInventory = async (inventoryId: bigint) => {
  const deletedInventory = await prisma.inventory.delete({
    where: { id: inventoryId },
  });
  console.log(`DELETE_INVENTORY_`, deletedInventory);
  return deletedInventory;
};

export const getInventory = async (inventoryId: bigint) => {
  const inventory = await prisma.inventory.findUnique({
    where: { id: inventoryId, deleted: false },
    include: {
      inventoryTypeIdRel: true,
      inventoryStockIdRel: {
        select: { currentQuantity: true, totalQuantity: true },
      },
      documentIdRel: {
        select: { url: true },
      },
    },
  });
  return inventory;
};

export const getAllInventory = async (props: {
  inventoryTypeId: bigint | null;
  inventoryGroupId: bigint | undefined;
  page?: number;
  limit?: number;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.inventoryTypeId != null) {
    filter.inventoryTypeId = props.inventoryTypeId;
  }
  if (props.inventoryGroupId != undefined) {
    filter.inventoryGroupId = props.inventoryGroupId;
  }
  const allInventory = await prisma.inventory.findMany({
    where: {
      ...filter,
      deleted: false,
    },
    include: {
      inventoryTypeIdRel: {
        include: {
          group: {
            include: {
              type: {
                include: {
                  group: {},
                },
              },
            },
          },
        },
      },
      inventoryStockIdRel: true,
      documentIdRel: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const borrowableInventory = await prisma.inventory.findMany({
    where: {
      deleted: false,
      isBorrowable: { equals: true },
      itemInventoryIdRel: { none: { status: "OUT" } },
    },
    include: {
      inventoryTypeIdRel: true,
      inventoryStockIdRel: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalBorrowableInventory = await prisma.inventory.count({
    where: {
      deleted: false,
      isBorrowable: { equals: true },
      itemInventoryIdRel: { none: { status: "OUT" } },
    },
  });
  const totalInventory = await prisma.inventory.count({
    where: { ...filter, deleted: false },
  });
  return {
    inventory: allInventory,
    currentPageInventory: page,
    totalPageInventory: Math.ceil(totalInventory / limit),
    borrowableInventory: borrowableInventory,
    currentPageBorrowableInventory: page,
    totalPageBorrowableInventory: Math.ceil(totalBorrowableInventory / limit),
  };
};
