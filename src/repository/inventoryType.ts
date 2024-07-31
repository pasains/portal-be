import { InventoryType, PrismaClient } from "@prisma/client";
import {
  InventoryTypeCreateParams,
  InventoryTypeUpdateParams,
} from "../types/inventoryType";

const prisma = new PrismaClient();

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

export const updateInventoryType = async (
  inventoryTypeId: number,
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

export const deleteInventoryType = async (inventoryTypeId: number) => {
  const deletedInventoryType = await prisma.inventoryType.delete({
    where: { id: inventoryTypeId },
  });
  return deletedInventoryType;
};

export const getInventoryType = async (inventoryTypeId: number) => {
  const inventoryType = await prisma.inventoryType.findUnique({
    where: { id: inventoryTypeId },
  });
  return inventoryType;
};

export const getAllInventoryType = async () => {
  const allInventoryType = await prisma.inventoryType.findMany();
  return allInventoryType;
};

export const checkInventoryTypeExists = async (
  inventoryTypeId: number,
): Promise<boolean> => {
  const count = await prisma.inventoryType.count({
    where: {
      id: inventoryTypeId,
    },
  });
  return count > 0;
};
