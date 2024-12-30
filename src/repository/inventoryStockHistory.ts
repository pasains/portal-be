import prisma from "../configuration/db";

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
