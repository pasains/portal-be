import {
  createInventoryGroup,
  deleteInventoryGroup,
  getAllInventoryGroup,
  getInventoryGroup,
  updateInventoryGroup,
} from "../repository/inventoryGroup";
import {
  InventoryGroupCreateParams,
  InventoryGroupUpdateParams,
} from "../types/inventoryGroup";

export const createInventoryGroupService = async (
  inventoryGroup: InventoryGroupCreateParams,
) => {
  const newInventoryGroup = await createInventoryGroup(inventoryGroup);
  return newInventoryGroup;
};

export const updateInventoryGroupService = async (
  inventoryGroupId: number,
  inventoryGroup: InventoryGroupUpdateParams,
) => {
  const updatedInventoryGroup = await updateInventoryGroup(inventoryGroupId, inventoryGroup);
  return updatedInventoryGroup;
};

export const deleteInventoryGroupService = async (inventoryGroupId: number) => {
  const deletedInventoryGroup = await deleteInventoryGroup(inventoryGroupId);
  return deletedInventoryGroup;
};

export const getInventoryGroupService = async (inventoryGroupId: number) => {
  const user = await getInventoryGroup(inventoryGroupId);
  return user;
};

export const getAllInventoryGroupService = async () => {
  const allInventoryGroup = await getAllInventoryGroup();
  return allInventoryGroup;
};
