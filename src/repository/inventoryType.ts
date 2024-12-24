import prisma from "../configuration/db";
import {
  InventoryTypeCreateParams,
  InventoryTypeUpdateParams,
} from "../types/inventoryType";

export const createInventoryType = async (
  inventoryType: InventoryTypeCreateParams,
) => {
  const group = inventoryType?.groupId
    ? { connect: { id: inventoryType?.groupId } }
    : undefined;
  const newInventoryType = await prisma.inventoryType.create({
    data: {
      inventoryTypeName: inventoryType?.inventoryTypeName,
      description: inventoryType?.description,
      group,
    },
  });
  return newInventoryType;
};

export const checkInventoryTypeName = async (inventoryType: {
  inventoryTypeName: string;
}) => {
  const newInventoryType = await prisma.inventoryType.findFirst({
    where: {
      inventoryTypeName: inventoryType.inventoryTypeName,
    },
  });
  return newInventoryType;
};

export const updateInventoryType = async (
  inventoryTypeId: bigint,
  inventoryType: InventoryTypeUpdateParams,
) => {
  const group = inventoryType?.groupId
    ? { connect: { id: inventoryType?.groupId } }
    : undefined;
  const updatedInventoryType = await prisma.inventoryType.update({
    where: { id: inventoryTypeId },
    data: {
      inventoryTypeName: inventoryType?.inventoryTypeName,
      description: inventoryType?.description,
      group,
    },
  });
  return updatedInventoryType;
};

export const deleteInventoryType = async (inventoryTypeId: bigint) => {
  const deletedInventoryType = await prisma.inventoryType.delete({
    where: { id: inventoryTypeId },
  });
  return deletedInventoryType;
};

export const getInventoryType = async (inventoryTypeId: bigint | bigint) => {
  const inventoryType = await prisma.inventoryType.findUnique({
    where: { id: inventoryTypeId, deleted: false },
  });
  return inventoryType;
};

export const getAllInventoryType = async (props: {
  page?: number;
  limit?: number;
}) => {
  const { page = 1, limit = 10 } = props;
  const allInventoryType = await prisma.inventoryType.findMany({
    where: { deleted: false },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalInventoryType = await prisma.inventoryType.count({
    where: { deleted: false },
  });
  return {
    invetoryType: allInventoryType,
    currentPage: page,
    totalPage: Math.ceil(totalInventoryType / limit),
  };
};

export const checkInventoryTypeExists = async (
  inventoryTypeId: bigint,
): Promise<boolean> => {
  const count = await prisma.inventoryType.count({
    where: {
      id: inventoryTypeId,
      deleted: false,
    },
  });
  return count > 0;
};

export const connectInventoryTypeToGroup = async (
  inventoryTypeId: bigint,
  inventoryGroupId: bigint,
) => {
  const updatedInventoryType = await prisma.inventoryType.update({
    where: { id: inventoryTypeId, deleted: false },
    data: {
      group: { connect: { id: inventoryGroupId } },
    },
  });
  return updatedInventoryType;
};
