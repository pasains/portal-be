import prisma from "../configuration/db";
import {
  InventoryStockCreateParams,
  InventoryStockUpdateParams,
} from "../types/inventoryStock";

export const createInventoryStock = async (
  inventoryStock: InventoryStockCreateParams,
) => {
  const newInventoryStock = await prisma.inventoryStock.create({
    data: {
      inventoryId: inventoryStock?.inventoryId,
      currentQuantity: inventoryStock?.currentQuantity,
      totalQuantity: inventoryStock?.totalQuantity,
    },
  });
  return newInventoryStock;
};

export const updateInventoryStock = async (
  inventoryStockId: bigint,
  inventoryStock: InventoryStockUpdateParams,
) => {
  const updatedInventoryStock = await prisma.inventoryStock.update({
    where: { id: inventoryStockId },
    data: {
      inventoryId: inventoryStock?.inventoryId,
      currentQuantity: inventoryStock?.currentQuantity,
      totalQuantity: inventoryStock?.totalQuantity,
    },
  });
  return updatedInventoryStock;
};

export const deleteInventoryStock = async (inventoryStockId: bigint) => {
  const deletedInventoryStock = await prisma.inventoryStock.delete({
    where: { id: inventoryStockId },
  });
  return deletedInventoryStock;
};

export const getInventoryStock = async (inventoryStockId: bigint) => {
  const inventoryStock = await prisma.inventoryStock.findUnique({
    where: { id: inventoryStockId, deleted: false },
  });
  return inventoryStock;
};

export const getAllInventoryStock = async () => {
  const allInventoryStock = await prisma.inventoryStock.findMany({
    where: { deleted: false },
  });
  return allInventoryStock;
};
