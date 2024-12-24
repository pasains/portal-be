import { throws } from "assert";
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
  inventoryGroupId: bigint,
  inventoryGroup: InventoryGroupUpdateParams,
) => {
  const updatedInventoryGroup = await updateInventoryGroup(
    inventoryGroupId,
    inventoryGroup,
  );
  return updatedInventoryGroup;
};

export const deleteInventoryGroupService = async (inventoryGroupId: bigint) => {
  const deletedInventoryGroup = await deleteInventoryGroup(inventoryGroupId);
  return deletedInventoryGroup;
};

export const getInventoryGroupService = async (
  inventoryGroupId: bigint | bigint,
) => {
  const user = await getInventoryGroup(inventoryGroupId);
  return user;
};

export const getAllInventoryGroupService = async (props: {
  page?: number;
  limit?: number;
}) => {
  const allInventoryGroup = await getAllInventoryGroup({
    page: props.page,
    limit: props.limit,
  });
  return allInventoryGroup;
};
