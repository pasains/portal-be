import {
  createInventoryHistory,
  getAllInventoryHistory,
  getInventoryHistory,
} from "../repository/inventoryHistory";
import { InventoryHistoryCreateParams } from "../types/inventoryHistory";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createInventoryHistoryService = async (
  inventoryHistory: InventoryHistoryCreateParams,
) => {
  if (!inventoryHistory.id || typeof inventoryHistory.id !== "bigint") {
    throw new Error("Invalid inventory Id");
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

export const getInventoryHistoryService = async (revId: bigint) => {
  const inventoryHistory = await getInventoryHistory(revId);
  return inventoryHistory;
};

export const getAllInventoryHistoryService = async () => {
  const allInventoryHistory = await getAllInventoryHistory();
  return allInventoryHistory;
};
