import prisma from "../configuration/db";
import { InventoryStockHistoryCreateParams } from "../types/inventoryStockHistory";

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
    where: { revId: inventoryStockHistoryId, deleted: false },
  });
  return inventoryStockHistory;
};

export const getAllInventoryStockHistory = async () => {
  const allInventoryStockHistory = await prisma.inventoryStockHistory.findMany({
    where: { deleted: false },
  });
  return allInventoryStockHistory;
};
