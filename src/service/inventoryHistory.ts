import { getInventory } from "../repository/inventory";
import {
  createInventoryHistory,
  deleteInventoryHistory,
  getAllInventoryHistory,
  getInventoryHistory,
  updateInventoryHistory,
} from "../repository/inventoryHistory";
import {
  InventoryHistoryCreateParams,
  InventoryHistoryUpdateParams,
} from "../types/inventoryHistory";

export const createInventoryHistoryService = async (
  inventoryHistory: InventoryHistoryCreateParams,
) => {
  if (inventoryHistory.inventoryId) {
    const inventoryExists = await getInventory(inventoryHistory.inventoryId)
    if (!inventoryExists) {
      throw new Error("Invalid Inventory Id")
    }
  }
  const newInventoryHistory = await createInventoryHistory({...inventoryHistory,});
  return newInventoryHistory;
};

export const updateInventoryHistoryService = async (
  inventoryHistoryId: number,
  inventoryHistory: InventoryHistoryUpdateParams,
) => {
  if (inventoryHistory.inventoryId) {
    const inventoryExists = await getInventory(inventoryHistory.inventoryId)
    if (!inventoryExists) {
      throw new Error("Invalid Inventory Id")
    }
  }
  const updatedInventoryHistory = await updateInventoryHistory(inventoryHistoryId, inventoryHistory);
  return updatedInventoryHistory;
};

export const deleteInventoryHistoryService = async (inventoryHistoryId: number) => {
  const deletedInventoryHistory = await deleteInventoryHistory(inventoryHistoryId);
  return deletedInventoryHistory;
};

export const getInventoryHistoryService = async (inventoryHistoryId: number) => {
  const inventoryHistory = await getInventoryHistory(inventoryHistoryId);
  return inventoryHistory;
};

export const getAllInventoryHistoryService = async () => {
  const allInventoryHistory = await getAllInventoryHistory();
  return allInventoryHistory;
};
