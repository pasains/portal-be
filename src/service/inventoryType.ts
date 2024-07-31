import {
  createInventoryType,
  deleteInventoryType,
  getAllInventoryType,
  getInventoryType,
  updateInventoryType,
} from "../repository/inventoryType";
import { InventoryTypeCreateParams, InventoryTypeUpdateParams } from "../types/inventoryType";

export const createInventoryTypeService = async (inventoryType: InventoryTypeCreateParams ) => {
  const newInventoryType = await createInventoryType(inventoryType);
  return newInventoryType;
};
export const updateInventoryTypeService = async (
  inventoryTypeId: number,
  inventoryType: InventoryTypeUpdateParams,
) => {
  const updatedInventoryType = await updateInventoryType(inventoryTypeId, inventoryType);
  return updatedInventoryType;
};

export const deleteInventoryTypeService = async (inventoryTypeId: number) => {
  const deletedInventoryType = await deleteInventoryType(inventoryTypeId);
  return deletedInventoryType;
};

export const getInventoryTypeService = async (inventoryTypeId: number) => {
  const inventoryType = await getInventoryType(inventoryTypeId);
  return inventoryType;
};

export const getAllInventoryTypeService = async () => {
  const allInventoryType = await getAllInventoryType();
  return allInventoryType;
};
