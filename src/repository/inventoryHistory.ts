import prisma from "../configuration/db";
import { InventoryHistoryCreateParams } from "../types/inventoryHistory";

export const createInventoryHistory = async (
  inventoryHistory: InventoryHistoryCreateParams,
) => {
  const newInventoryHistory = await prisma.inventoryHistory.create({
    data: {
      id: inventoryHistory.id,
      inventoryName: inventoryHistory.inventoryName,
      refId: inventoryHistory.refId,
      description: inventoryHistory.description,
      condition: inventoryHistory.condition,
      note: inventoryHistory.note,
      isBorrowable: inventoryHistory.isBorrowable,
      inventoryTypeId: inventoryHistory.inventoryTypeId,
    },
  });
  return newInventoryHistory;
};

export const getInventoryHistory = async (inventoryhistoryId: bigint) => {
  const inventoryHistory = await prisma.inventoryHistory.findUnique({
    where: { revId: inventoryhistoryId, deleted: false },
  });
  return inventoryHistory;
};

export const getAllInventoryHistory = async () => {
  const allInventoryHistory = await prisma.inventoryHistory.findMany({
    where: { deleted: false },
  });
  return allInventoryHistory;
};
