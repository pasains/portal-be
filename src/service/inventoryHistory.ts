import { getInventory } from "../repository/inventory";
import {
  createInventoryHistory,
  deleteInventoryHistory,
  getAllInventoryHistory,
  patchInventoryHistory,
  getInventoryHistory,
  updateInventoryHistory,
} from "../repository/inventoryHistory";
import {
  InventoryHistoryCreateParams,
  InventoryHistoryUpdateParams,
} from "../types/inventoryHistory";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createInventoryHistoryService = async (
  inventoryHistory: InventoryHistoryCreateParams,
) => {
  if (
    !inventoryHistory.inventoryId ||
    typeof inventoryHistory.inventoryId !== "number"
  ) {
    throw new Error("Invalid inventory Id");
  }
  if (
    !inventoryHistory.image ||
    typeof inventoryHistory.image !== "string"
  ) {
    throw new Error("Invalid image url");
  }
  try {
    const newInventoryHistory = await createInventoryHistory(inventoryHistory);
    return newInventoryHistory;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const updateInventoryHistoryService = async (
  inventoryHistoryId: number,
  inventoryHistory: InventoryHistoryUpdateParams,
) => {
  if (inventoryHistory.inventoryId) {
    const inventoryExists = await getInventory(inventoryHistory.inventoryId);
    if (!inventoryExists) {
      throw new Error("Invalid Inventory Id");
    }
  }
  const updatedInventoryHistory = await updateInventoryHistory(
    inventoryHistoryId,
    inventoryHistory,
  );
  return updatedInventoryHistory;
};

export const patchInventoryHistoryService = async (
  inventoryHistoryId: number,
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
    const patchedInventoryHistory = await patchInventoryHistory(
      inventoryHistoryId,
      op,
      field,
      value,
    );
    return patchedInventoryHistory;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteInventoryHistoryService = async (
  inventoryHistoryId: number,
) => {
  const deletedInventoryHistory =
    await deleteInventoryHistory(inventoryHistoryId);
  return deletedInventoryHistory;
};

export const getInventoryHistoryService = async (
  inventoryHistoryId: number,
) => {
  const inventoryHistory = await getInventoryHistory(inventoryHistoryId);
  return inventoryHistory;
};

export const getAllInventoryHistoryService = async () => {
  const allInventoryHistory = await getAllInventoryHistory();
  return allInventoryHistory;
};
