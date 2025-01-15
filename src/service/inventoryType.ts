import { getInventoryGroup } from "../repository/inventoryGroup";
import {
  createInventoryType,
  deleteInventoryType,
  getAllInventoryType,
  getInventoryType,
  updateInventoryType,
} from "../repository/inventoryType";
import {
  InventoryTypeCreateParams,
  InventoryTypeUpdateParams,
} from "../types/inventoryType";

export const createInventoryTypeService = async (
  inventoryType: InventoryTypeCreateParams,
) => {
  const newInventoryType = await createInventoryType(inventoryType);
  return newInventoryType;
};

export const updateInventoryTypeService = async (
  inventoryTypeId: bigint,
  inventoryType: InventoryTypeUpdateParams,
) => {
  const updatedInventoryType = await updateInventoryType(
    inventoryTypeId,
    inventoryType,
  );
  return updatedInventoryType;
};

export const deleteInventoryTypeService = async (inventoryTypeId: bigint) => {
  const deletedInventoryType = await deleteInventoryType(inventoryTypeId);
  return deletedInventoryType;
};

export const getInventoryTypeService = async (inventoryTypeId: bigint) => {
  const inventoryType = await getInventoryType(inventoryTypeId);
  return inventoryType;
};

export const getAllInventoryTypeService = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allInventoryType = await getAllInventoryType({
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  return allInventoryType;
};
