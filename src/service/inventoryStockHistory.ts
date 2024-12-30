import {
  getInventoryStockHistory,
  getAllInventoryStockHistory,
} from "../repository/inventoryStockHistory";

export const getInventoryStockHistoryService = async (revId: bigint) => {
  const inventoryStockHistory = await getInventoryStockHistory(revId);
  return inventoryStockHistory;
};

export const getAllInventoryStockHistoryService = async () => {
  const allInventoryStockHistory = await getAllInventoryStockHistory();
  return allInventoryStockHistory;
};
