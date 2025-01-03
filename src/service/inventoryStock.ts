import { getInventory } from "../repository/inventory";
import {
  deleteInventoryStock,
  getAllInventoryStock,
  getInventoryStock,
  updateInventoryStock,
} from "../repository/inventoryStock";
import {
  InventoryStockUpdateParams,
} from "../types/inventoryStock";


export const updateInventoryStockService = async (
  inventoryStockId: bigint,
  inventoryStock: InventoryStockUpdateParams,
) => {
  if (inventoryStock.inventoryId) {
    const inventoryExists = await getInventory(inventoryStock.inventoryId)
    if (!inventoryExists) {
      throw new Error("Invalid Inventory Id")
    }
  }
  const updatedInventoryStock = await updateInventoryStock(inventoryStockId, inventoryStock);
  return updatedInventoryStock;
};

export const deleteInventoryStockService = async (inventoryStockId: bigint) => {
  const deletedInventoryStock = await deleteInventoryStock(inventoryStockId);
  return deletedInventoryStock;
};

export const getInventoryStockService = async (inventoryStockId: bigint) => {
  const inventoryStock = await getInventoryStock(inventoryStockId);
  return inventoryStock;
};

export const getAllInventoryStockService = async () => {
  const allInventoryStock = await getAllInventoryStock();
  return allInventoryStock;
};
