// handling all db related for inventory use case

import { PrismaClient } from "@prisma/client";
import {
  InventoryCreateParams,
  InventoryUpdateParams,
} from "../types/inventory";

const prisma = new PrismaClient();

export const createInventory = async (inventory: InventoryCreateParams) => {
  const newInventory = await prisma.$transaction(async (prisma) => {
    const createdInventory = await prisma.inventory.create({
      data: {
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
  const updatedInventory = await prisma.inventory.update({
    where: { id: inventoryId },
    data: inventory,
  });
  return updatedInventory;
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
  return deletedInventory;
};

export const getInventory = async (inventoryId: bigint) => {
  const inventory = await prisma.inventory.findUnique({
    where: { id: inventoryId },
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
}) => {
  const filter = {} as any;
  if (props.inventoryTypeId != null) {
    filter.inventoryTypeId = props.inventoryTypeId;
  }
  if (props.inventoryGroupId != undefined) {
    filter.inventoryGroupId = props.inventoryGroupId;
  }
  const allInventory = await prisma.inventory.findMany({
    where: filter,
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
      inventoryStockIdRel: { select: { currentQuantity: true } },
      documentIdRel: { select: { url: true } },
    },
  });
  return allInventory;
};
