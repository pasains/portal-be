import { PrismaClient } from "@prisma/client";
import {
  InventoryHistoryCreateParams,
  InventoryHistoryUpdateParams,
} from "../types/inventoryHistory";

const prisma = new PrismaClient();

export const createInventoryHistory = async (
  inventoryHistory: InventoryHistoryCreateParams,
) => {
  const newInventoryHistory = await prisma.inventoryHistory.create({
    data: {
      inventoryId: inventoryHistory?.inventoryId,
      condition: inventoryHistory?.condition,
      image: inventoryHistory?.image,
    },
  });
  return newInventoryHistory;
};

export const updateInventoryHistory = async (
  inventoryHistoryId: number,
  inventoryHistory: InventoryHistoryUpdateParams,
) => {
  const updatedInventoryHistory = await prisma.inventoryHistory.update({
    where: { id: inventoryHistoryId },
    data: {
      inventoryId: inventoryHistory?.inventoryId,
      condition: inventoryHistory?.condition,
      image: inventoryHistory?.image,
    },
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
    include: { imageRel: true },
  });
  return inventoryHistory;
};

export const getAllInventoryHistory = async () => {
  const allInventoryHistory = await prisma.inventoryHistory.findMany({});
  return allInventoryHistory;
};
