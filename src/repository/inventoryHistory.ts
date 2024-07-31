import { InventoryHistory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInventoryHistory = async (
  inventoryHistory: InventoryHistory,
) => {
  const newInventoryHistory = await prisma.inventoryHistory.create({
    data: inventoryHistory,
  });
  return newInventoryHistory;
};

export const updateInventoryHistory = async (
  inventoryHistoryId: number,
  inventoryHistory: InventoryHistory,
) => {
  const updatedInventoryHistory = await prisma.inventoryHistory.update({
    where: { id: inventoryHistoryId },
    data: inventoryHistory,
  });
  return updatedInventoryHistory;
};

export const patchInventoryHistory = async (
  inventoryHistoryId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedInventoryHistory = await prisma.inventoryHistory.update({
    where: { id: inventoryHistoryId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedInventoryHistory;
};

export const deleteInventoryHistory = async (inventoryHistoryId: number) => {
  const deletedInventoryHistory = await prisma.inventoryHistory.delete({
    where: { id: inventoryHistoryId },
  });
  return deletedInventoryHistory;
};

export const getInventoryHistory = async (inventoryHistoryId: number) => {
  const inventoryHistory = await prisma.inventoryHistory.findUnique({
    where: { id: inventoryHistoryId },
  });
  return inventoryHistory;
};

export const getAllInventoryHistory = async () => {
  const allInventoryHistory = await prisma.inventoryHistory.findMany();
  return allInventoryHistory;
};
