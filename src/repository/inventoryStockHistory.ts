import { PrismaClient } from "@prisma/client";
import { InventoryStockHistoryCreateParams } from "../types/inventoryStockHistory";

const prisma = new PrismaClient();

export const createInventoryStockHistory = async (
  inventoryStockHistory: InventoryStockHistoryCreateParams,
) => {
  const newInventoryStockHistory = await prisma.inventoryStockHistory.create({
    data: {
      id: inventoryStockHistory?.id,
      inventoryId: inventoryStockHistory?.inventoryId,
      currentQuantity: inventoryStockHistory?.currentQuantity,
      totalQuantity: inventoryStockHistory?.totalQuantity,
    },
  });
  return newInventoryStockHistory;
};

export const getInventoryStockHistory = async (
  inventoryStockHistoryId: bigint,
) => {
  const inventoryStockHistory = await prisma.inventoryStockHistory.findUnique({
    where: { revId: inventoryStockHistoryId },
  });
  return inventoryStockHistory;
};

export const getAllInventoryStockHistory = async () => {
  const allInventoryStockHistory =
    await prisma.inventoryStockHistory.findMany();
  return allInventoryStockHistory;
};
