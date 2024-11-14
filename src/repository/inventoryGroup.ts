import prisma from "../configuration/db";
import {
  InventoryGroupCreateParams,
  InventoryGroupUpdateParams,
} from "../types/inventoryGroup";

export const createInventoryGroup = async (
  inventoryGroup: InventoryGroupCreateParams,
) => {
  const newInventoryGroup = await prisma.inventoryGroup.create({
    data: inventoryGroup,
  });
  return newInventoryGroup;
};

export const updateInventoryGroup = async (
  inventoryGroupId: bigint,
  inventoryGroup: InventoryGroupUpdateParams,
) => {
  const updatedInventoryGroup = await prisma.inventoryGroup.update({
    where: { id: inventoryGroupId },
    data: inventoryGroup,
  });
  return updatedInventoryGroup;
};

export const deleteInventoryGroup = async (inventoryGroupId: bigint) => {
  const deletedInventoryGroup = await prisma.inventoryGroup.delete({
    where: { id: inventoryGroupId },
  });
  return deletedInventoryGroup;
};

export const getInventoryGroup = async (inventoryGroupId: bigint | bigint) => {
  const inventoryGroup = await prisma.inventoryGroup.findUnique({
    where: { id: inventoryGroupId, deleted: false },
  });
  return inventoryGroup;
};

export const getAllInventoryGroup = async () => {
  const allInventoryGroup = await prisma.inventoryGroup.findMany({
    where: { deleted: false },
  });
  return allInventoryGroup;
};

export const connectInventoryGroupToInventoryType = async (
  inventoryGroupId: bigint,
  inventoryTypeId: bigint,
) => {
  const updatedInventoryGroup = await prisma.inventoryGroup.update({
    where: { id: inventoryGroupId },
    data: {
      type: { connect: { id: inventoryTypeId } },
    },
  });
  return updatedInventoryGroup;
};
