import { getInventory } from "../repository/inventory";
import {
  createInventoryStockHistory,
  getInventoryStockHistory,
  getAllInventoryStockHistory,
} from "../repository/inventoryStockHistory";
import { InventoryStockHistoryCreateParams } from "../types/inventoryStockHistory";

export const createInventoryStockHistoryService = async (
  inventoryStockHistory: InventoryStockHistoryCreateParams,
) => {
  if (inventoryStockHistory.id) {
    const inventoryExists = await getInventory(inventoryStockHistory.id);
    if (!inventoryExists) {
      throw new Error("Invalid Inventory Id");
    }
  }
  const newInventoryStockHistory = await createInventoryStockHistory({
    ...inventoryStockHistory,
  });
  return newInventoryStockHistory;
};

export const getInventoryStockHistoryService = async (revId: bigint) => {
  const inventoryStockHistory = await getInventoryStockHistory(revId);
  return inventoryStockHistory;
};

export const getAllInventoryStockHistoryService = async () => {
  const allInventoryStockHistory = await getAllInventoryStockHistory();
  return allInventoryStockHistory;
};
