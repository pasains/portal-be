import { InventoryType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInventoryType = async ( inventoryType: InventoryType) => {
  const newInventoryType = await prisma.inventoryType.create({
    data: inventoryType,
  });
  return newInventoryType;
};

export const updateInventoryType = async (
  inventoryTypeId: number,
  inventoryType: InventoryType,
) => {
  const updatedInventoryType = await prisma.inventoryType.update({
    where: { id: inventoryTypeId },
    data: inventoryType,
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
