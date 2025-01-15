import prisma from "../configuration/db";
import {
  InventoryGroupCreateParams,
  InventoryGroupUpdateParams,
} from "../types/inventoryGroup";

export const createInventoryGroup = async (
  inventoryGroup: InventoryGroupCreateParams,
) => {
  const newInventoryGroup = await prisma.inventoryGroup.create({
    data: {
      inventoryGroupName: inventoryGroup.inventoryGroupName,
      description: inventoryGroup.description,
    },
  });
  return newInventoryGroup;
};

export const updateInventoryGroup = async (
  inventoryGroupId: bigint,
  inventoryGroup: InventoryGroupUpdateParams,
) => {
  const updatedInventoryGroup = await prisma.inventoryGroup.update({
    where: { id: inventoryGroupId },
    data: {
      inventoryGroupName: inventoryGroup?.inventoryGroupName,
      description: inventoryGroup?.description,
    },
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

export const getAllInventoryGroup = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.search) {
    filter.inventoryGroupName = { contains: props.search, mode: "insensitive" };
  }
  const allInventoryGroup = await prisma.inventoryGroup.findMany({
    where: { ...filter, deleted: false },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalInventoryGroup = await prisma.inventoryGroup.count({
    where: { ...filter, deleted: false },
  });
  return {
    inventoryGroup: allInventoryGroup,
    currentPage: page,
    totalPage: Math.ceil(totalInventoryGroup / limit),
  };
};

export const checkInventoryGroupName = async (inventoryGroup: {
  inventoryGroupName: string;
}) => {
  const newInventoryGroup = await prisma.inventoryGroup.findFirst({
    where: {
      inventoryGroupName: inventoryGroup.inventoryGroupName,
    },
  });
  return newInventoryGroup;
};

export const checkInventoryGroupExists = async (
  inventoryGroupId: bigint,
): Promise<boolean> => {
  const count = await prisma.inventoryGroup.count({
    where: {
      id: inventoryGroupId,
      deleted: false,
    },
  });
  return count > 0;
};
