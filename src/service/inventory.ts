// handling all business logic for inventory related

import { Inventory } from "@prisma/client";
import {
  createInventory,
  deleteInventory,
  getAllInventory,
  getInventory,
  updateInventory,
} from "../repository/inventory";

export const createInventoryService = async (inventory: Inventory) => {
  const newInventory = await createInventory(inventory);
  return newInventory;
};

export const updateInventoryService = async (inventory: Inventory) => {
  const updatedInventory = await updateInventory(inventory);
  return updatedInventory;
};

export const deleteInventoryService = async (inventoryId: number) => {
  const deletedInventory = await deleteInventory(inventoryId);
  return deletedInventory;
};

export const getInventoryService = async (inventoryId: number) => {
  const inventory = await getInventory(inventoryId);
  return inventory;
};

export const getAllInventoryService = async () => {
  const allInventory = await getAllInventory();
  return allInventory;
};
