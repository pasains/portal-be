import { PrismaClient } from "@prisma/client";
import { ItemCreateParams, ItemUpdateParams } from "../types/item";

const prisma = new PrismaClient();

export const createItem = async (item: ItemCreateParams) => {
  const newItem = await prisma.item.create({
    data: {
      borrowingId: item?.borrowingId,
      receivingId: item?.receivingId,
      inventoryId: item?.inventoryId,
      quantity: item?.quantity,
      preCondition: item?.preCondition,
      postCondition: item?.postCondition,
    },
  });
  return newItem;
};

export const updateItem = async (itemId: number, item: ItemUpdateParams) => {
  const updatedItem = await prisma.item.update({
    where: { id: itemId },
    data: {
      borrowingId: item?.borrowingId,
      receivingId: item?.receivingId,
      inventoryId: item?.inventoryId,
      quantity: item?.quantity,
      preCondition: item?.preCondition,
      postCondition: item?.postCondition,
    },
  });
  return updatedItem;
};

export const patchItem = async (
  itemId: number,
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

export const deleteItem = async (itemId: number) => {
  const deletedItem = await prisma.item.delete({
    where: { id: itemId },
  });
  return deletedItem;
};

export const getItem = async (itemId: number) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });
  return item;
};

export const getAllItem = async () => {
  const allItem = await prisma.item.findMany();
  return allItem;
};
