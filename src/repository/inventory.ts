// handling all db related for inventory use case

import { PrismaClient } from "@prisma/client";
import {
  InventoryCreateParams,
  InventoryUpdateParams,
} from "../types/inventory";

const prisma = new PrismaClient();

export const createInventory = async (inventory: InventoryCreateParams) => {
  const newInventory = await prisma.inventory.create({
    data: inventory,
  });
  return newInventory;
};

export const updateInventory = async (
  inventoryId: number,
  inventory: InventoryUpdateParams,
) => {
  const updatedInventory = await prisma.inventory.update({
    where: { id: inventoryId },
    data: inventory,
  });
  return updatedInventory;
};
export const patchInventory = async (
  inventoryId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedInventory = await prisma.inventory.update({
    where: { id: inventoryId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedInventory;
};

export const deleteInventory = async (inventoryId: number) => {
  const deletedInventory = await prisma.inventory.delete({
    where: { id: inventoryId },
  });
  return deletedInventory;
};

export const getInventory = async (inventoryId: number) => {
  const inventory = await prisma.inventory.findUnique({
    where: { id: inventoryId },
  });
  return inventory;
};

export const getAllInventory = async () => {
  const allInventory = await prisma.inventory.findMany();
  return allInventory;
};
