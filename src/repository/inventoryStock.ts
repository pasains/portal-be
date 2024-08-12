import { PrismaClient } from "@prisma/client";
import {
  InventoryStockCreateParams,
  InventoryStockUpdateParams,
} from "../types/inventoryStock";

const prisma = new PrismaClient();

export const createInventoryStock = async (
  inventoryStock: InventoryStockCreateParams,
) => {
  const newInventoryStock = await prisma.inventoryStock.create({
    data: {
      inventoryId: inventoryStock?.inventoryId,
      quantity: inventoryStock?.quantity,
    },
  });
  return newInventoryStock;
};

export const updateInventoryStock = async (
  inventoryStockId: number,
  inventoryStock: InventoryStockUpdateParams,
) => {
  const updatedInventoryStock = await prisma.inventoryStock.update({
    where: { id: inventoryStockId },
    data: {
      inventoryId: inventoryStock?.inventoryId,
      quantity: inventoryStock?.quantity,
    },
  });
  return updatedInventoryStock;
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
