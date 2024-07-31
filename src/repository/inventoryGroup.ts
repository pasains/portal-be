import { InventoryGroup, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInventoryGroup = async (inventoryGroup: InventoryGroup) => {
  const newInventoryGroup = await prisma.inventoryGroup.create({
    data: inventoryGroup,
  });
  return newInventoryGroup;
};

export const updateInventoryGroup = async (
  inventoryGroupId: number,
  inventoryGroup: InventoryGroup,
) => {
  const updatedInventoryGroup = await prisma.inventoryGroup.update({
    where: { id: inventoryGroupId },
    data: inventoryGroup,
  });
  return updatedInventoryGroup;
};

export const deleteInventoryGroup = async (inventoryGroupId: number) => {
  const deletedInventoryGroup = await prisma.inventoryGroup.delete({
    where: { id: inventoryGroupId },
  });
  return deletedInventoryGroup;
};

export const getInventoryGroup = async (inventoryGroupId: number) => {
  const inventoryGroup = await prisma.inventoryGroup.findUnique({
    where: { id: inventoryGroupId },
  });
  return inventoryGroup;
};

export const getAllInventoryGroup = async () => {
  const allInventoryGroup = await prisma.inventoryGroup.findMany();
  return allInventoryGroup;
};
