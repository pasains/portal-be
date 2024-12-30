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
  const newUpdatedInventoryStock = await prisma.$transaction(async (prisma) => {
    const currentInventoryStock = await prisma.inventoryStock.findUnique({
      where: { id: inventoryStockId },
      include: { inventoryStockIdRel: true },
    });
    if (!currentInventoryStock) {
      throw new Error("Inventory stock not found.");
    }
    const updatedInventoryStock = await prisma.inventoryStock.update({
      where: { id: inventoryStockId },
      data: {
        inventoryId: inventoryStock?.inventoryId,
        currentQuantity: inventoryStock?.currentQuantity,
        totalQuantity: inventoryStock?.totalQuantity,
      },
    });
    await prisma.inventoryStockHistory.create({
      data: {
        id: currentInventoryStock.id,
        inventoryId: currentInventoryStock.inventoryId,
        totalQuantity: currentInventoryStock.totalQuantity,
        currentQuantity: currentInventoryStock.currentQuantity,
        createdAt: currentInventoryStock.createdAt,
        updatedAt: new Date(),
      },
    });
    return updatedInventoryStock;
  });
  return newUpdatedInventoryStock;
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
