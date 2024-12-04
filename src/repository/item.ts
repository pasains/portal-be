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
  const updatedItem = await prisma.item.update({
    where: { id: itemId, deleted: false },
    data: {
      id: item.id,
      quantity: item?.quantity,
      status: item?.status,
      preCondition: item?.preCondition,
      itemInventoryIdRel: {
        update: {
          data: {
            inventoryName: item?.inventoryName,
            refId: item?.refId,
            condition: item?.postCondition?.trim()
              ? item.postCondition
              : existingItem?.itemInventoryIdRel.condition,
            inventoryTypeIdRel: {
              update: {
                data: {
                  inventoryTypeName: item?.inventoryTypeName,
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
  return updatedItem;
};

export const updateStatusBorrowing = async (borrowingId: bigint) => {
  const checkData = await prisma.item.count({ where: { status: "OUT" } });
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

export const getAllItem = async (props: { borrowingId: bigint | null }) => {
  const filter = {} as any;
  if (props.borrowingId != null) {
    filter.borrowingId = props.borrowingId;
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
  });
  return allItem;
};
