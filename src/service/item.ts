import {
  createItem,
  deleteItem,
  getAllItem,
  getItem,
  patchItem,
  updateItem,
} from "../repository/item";
import { ItemCreateParams, ItemUpdateParams } from "../types/item";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createItemService = async (item: ItemCreateParams) => {
  const newItem = await createItem(item);
  return newItem;
};

export const updateItemService = async (
  itemId: bigint,
  item: ItemUpdateParams,
) => {
  const updatedItem = await updateItem(itemId, item);
  return updatedItem;
};

export const patchItemService = async (
  itemId: bigint,
  operation: {
    op: string;
    path: string;
    value: string;
  },
) => {
  const { op, path, value } = operation;
  const field = path.split("/").pop();
  if (field === undefined) {
    throw new Error("Invalid field");
  }
  try {
    const patchedItem = await patchItem(itemId, op, field, value);
    return patchedItem;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteItemService = async (itemId: bigint) => {
  const deletedItem = await deleteItem(itemId);
  return deletedItem;
};

export const getItemService = async (itemId: bigint) => {
  const item = await getItem(itemId);
  return item;
};

export const getAllItemService = async (props: {
  borrowingId: bigint | null;
}) => {
  const allItem = await getAllItem({ borrowingId: props.borrowingId });
  return allItem;
};
