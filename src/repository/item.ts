import { ItemCreateParams, ItemUpdateParams } from "../types/item";
import prisma from "../configuration/db";

export const createItem = async (item: ItemCreateParams) => {
  const newItem = await prisma.item.create({
    data: {
      borrowingId: item?.borrowingId,
      inventoryId: item?.inventoryId,
      quantity: item?.quantity,
      status: item?.status,
      preCondition: item?.preCondition,
      postCondition: item?.postCondition,
    },
  });
  return newItem;
};

export const updateItem = async (itemId: bigint, item: ItemUpdateParams) => {
  const updatedItem = await prisma.item.update({
    where: { id: itemId },
    data: {
      borrowingId: item?.borrowingId,
      inventoryId: item?.inventoryId,
      quantity: item?.quantity,
      status: item?.status,
      preCondition: item?.preCondition,
      postCondition: item?.postCondition,
    },
  });
  return updatedItem;
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
    where: { id: itemId, deleted:false },
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
  });
  return allItem;
};
