// handling all db related for inventory use case

import { PrismaClient } from "@prisma/client";
import {
  InventoryCreateParams,
  InventoryUpdateParams,
} from "../types/inventory";

const prisma = new PrismaClient();

export const createInventory = async (inventory: InventoryCreateParams) => {
  try {
    let inventoryType;
    if (inventory.inventoryTypeName) {
      inventoryType = await prisma.inventoryType.findUnique({
        where: { id: inventory.inventoryTypeId },
        select: {
          inventoryTypeName: true,
        },
      });
    } else {
      inventoryType = await prisma.inventoryType.create({
        data: {
          inventoryTypeName: inventory.inventoryTypeName,
          description: inventory.descriptionInventoryType,
        },
      });
    }
    const newInventory = await prisma.inventory.create({
      data: {
        inventoryName: inventory.inventoryName,
        refId: inventory.refId,
        description: inventory.description,
        isBorrowable: inventory.isBorrowable,
        inventoryTypeId: inventory!.inventoryTypeId,
        inventoryHistoryIdRel: {
          create: {
            condition: inventory.description,
            imageRel: {
              create: inventory.image
                ? {
                    url: inventory.image,
                  }
                : undefined,
            },
          },
        },
        inventoryStockIdRel: {
          create: {
            quantity: inventory.quantity,
          },
        },
      },
      include: {
        inventoryHistoryIdRel: true,
        inventoryStockIdRel: true,
      },
    });
    return newInventory;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create inventory");
  }
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
    include: {
      inventoryHistoryIdRel: true,
      inventoryTypeIdRel: true,
      inventoryStockIdRel: true,
    },
  });
  return inventory;
};

export const getAllInventory = async () => {
  const allInventory = await prisma.inventory.findMany({
    include: {
      inventoryTypeIdRel: { select: { id: true, inventoryTypeName: true } },
      inventoryStockIdRel: { select: { quantity: true } },
      inventoryHistoryIdRel: { select: { image: true } },
    },
  });
  return allInventory;
};
