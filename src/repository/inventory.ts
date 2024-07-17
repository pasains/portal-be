// handling all db related for inventory use case

import { PrismaClient } from "@prisma/client";
import { Inventory } from "@prisma/client";

const prisma = new PrismaClient();

export const createInventory = async (inventory: Inventory) => {
  const newInventory = await prisma.inventory.create({
    data: inventory,
  });
  return newInventory;
};

export const updateInventory = async (inventory: Inventory) => {
  const updatedInventory = await prisma.inventory.update({
    where: { id: inventory.id },
    data: inventory,
  });
  return updatedInventory;
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
