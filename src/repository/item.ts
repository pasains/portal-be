import { ItemCreateParams, ItemUpdateParams } from "../types/item";
import prisma from "../configuration/db";

export const createItem = async (item: ItemCreateParams) => {
  const newItem = await prisma.item.create({
    data: {
      borrowingId: item?.borrowingId,
      quantity: item.quantity,
      status: item.status,
      inventoryId: item.inventoryId,
    },
  });
  return newItem;
};

export const updateItem = async (
  itemId: bigint,
  item: Partial<ItemUpdateParams>,
) => {
  const existingItem = await prisma.item.findUnique({
    where: { id: itemId, deleted: false },
    include: { itemInventoryIdRel: true },
  });
  if (!existingItem) {
    throw new Error(`Item with id ${itemId} not found.`);
  }
  const inventoryId = await prisma.inventoryStock.findFirst({
    where: { inventoryId: existingItem.itemInventoryIdRel?.id },
  });

  if (!inventoryId) {
    throw new Error(`Inventory not associated with the item id: ${itemId}`);
  }

  const updatedItem = await prisma.$transaction(async (prisma) => {
    const newItem = await prisma.item.update({
      where: { id: itemId, deleted: false },
      data: {
        id: item.id,
        status: item?.status,
        preCondition: item?.preCondition,
        itemInventoryIdRel: {
          update: {
            data: {
              condition: item?.postCondition?.trim()
                ? item.postCondition
                : existingItem?.itemInventoryIdRel?.condition,
              inventoryStockIdRel: {
                update: {
                  where: { id: inventoryId.id },
                  data: {
                    currentQuantity:
                      item.status === "IN"
                        ? {
                            increment: item.quantity,
                          }
                        : item.status === "OUT"
                          ? { decrement: item.quantity }
                          : undefined,
                  },
                },
              },
            },
          },
        },
        itemBorrowingIdRel: {
          update: {
            data: {
              status: item?.statusBorrowing,
            },
          },
        },
      },
    });
    return newItem;
  });
  return updatedItem;
};

export const updateStatusBorrowing = async (borrowingId: bigint) => {
  console.log(`updateStatusBorrowing called with borrowingId: ${borrowingId}`);

  const checkData = await prisma.item.count({
    where: { status: "OUT", borrowingId },
  });
  console.log(`Check Data`, checkData);
  if (checkData > 0) {
    await prisma.borrowing.update({
      where: { id: borrowingId },
      data: {
        status: "PENDING",
      },
    });
  } else {
    await prisma.borrowing.update({
      where: { id: borrowingId },
      data: {
        status: "DONE",
      },
    });
  }
};

export const patchItem = async (
  itemId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedItem = await prisma.item.update({
    where: { id: itemId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedItem;
};

export const deleteItem = async (itemId: bigint) => {
  const deletedItem = await prisma.item.delete({
    where: { id: itemId },
  });
  return deletedItem;
};

export const getItem = async (itemId: bigint) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId, deleted: false },
    include: {
      itemBorrowingIdRel: {
        select: { status: true },
      },
      itemInventoryIdRel: {
        include: {
          inventoryTypeIdRel: { select: { inventoryTypeName: true } },
        },
      },
    },
  });
  return item;
};

export const getAllItem = async (props: {
  borrowingId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.borrowingId != null) {
    filter.borrowingId = props.borrowingId;
  }
  if (props.search) {
    filter.itemInventoryIdRel = {
      inventoryName: {
        contains: props.search,
        mode: "insensitive",
      },
    };
  }
  const allItem = await prisma.item.findMany({
    where: { ...filter, deleted: false },
    include: {
      itemInventoryIdRel: {
        include: {
          inventoryTypeIdRel: true,
        },
      },
      itemBorrowingIdRel: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalItem = await prisma.item.count({
    where: { ...filter, deleted: false },
  });
  return {
    items: allItem,
    currentPage: page,
    totalPage: Math.ceil(totalItem / limit),
  };
};
