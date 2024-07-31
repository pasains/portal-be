import { InventoryStock, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInventoryStock = async (inventoryStock: InventoryStock) => {
  const newInventoryStock = await prisma.inventoryStock.create({
    data: inventoryStock,
  });
  return newInventoryStock;
};

export const updateInventoryStock = async (
  inventoryStockId: number,
  inventoryStock: InventoryStock,
) => {
  const updatedInventoryStock = await prisma.inventoryStock.update({
    where: { id: inventoryStockId },
    data: inventoryStock,
  });
  return updatedInventoryStock;
};

export const patchInventoryStock = async (
  inventoryStockId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedInventoryStock = await prisma.inventoryStock.update({
    where: { id: inventoryStockId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedInventoryStock;
};

export const deleteInventoryStock = async (inventoryStockId: number) => {
  const deletedInventoryStock = await prisma.inventoryStock.delete({
    where: { id: inventoryStockId },
  });
  return deletedInventoryStock;
};

export const getInventoryStock = async (inventoryStockId: number) => {
  const inventoryStock = await prisma.inventoryStock.findUnique({
    where: { id: inventoryStockId },
  });
  return inventoryStock;
};

export const getAllInventoryStock = async () => {
  const allInventoryStock = await prisma.inventoryStock.findMany();
  return allInventoryStock;
};
