import {
  getAllInventoryHistory,
  getInventoryHistory,
} from "../repository/inventoryHistory";

export const getInventoryHistoryService = async (revId: bigint) => {
  const inventoryHistory = await getInventoryHistory(revId);
  return inventoryHistory;
};

export const getAllInventoryHistoryService = async () => {
  const allInventoryHistory = await getAllInventoryHistory();
  return allInventoryHistory;
};
