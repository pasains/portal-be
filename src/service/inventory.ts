// handling all business logic for inventory related
import {
  checkInventoryTypeExists,
  createInventory,
  deleteInventory,
  getAllInventory,
  getInventory,
  patchInventory,
  updateInventory,
} from "../repository/inventory";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import {
  InventoryCreateParams,
  InventoryUpdateParams,
} from "../types/Inventory";
import { InventoryType } from "@prisma/client";

export const createInventoryService = async (
  inventory: InventoryCreateParams,
) => {
  if (
    !inventory.inventoryTypeId ||
    typeof inventory.inventoryTypeId !== "number"
  )
    throw new Error("Invalid inventory Type Id");
  {
  }
  const exists = await checkInventoryTypeExists(inventory.inventoryTypeId);
  if (!exists) {
    throw new Error("Invalid inventoryTypeId: Does not exists");
  }
  try {
    const newInventory = await createInventory(inventory);
    return newInventory;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const updateInventoryService = async (
  inventoryId: number,
  inventory: InventoryUpdateParams,
) => {
  const updatedInventory = await updateInventory(inventoryId, inventory);
  return updatedInventory;
};

export const patchInventoryService = async (
  inventoryId: number,
  operation: {
    op: string;
    path: string;
    value: string;
  },
) => {
  const { op, path, value } = operation;
  const field = path.split("/").pop();
  if (field === undefined) {
    throw new Error("Invalid field");
  }
  try {
    const patchedInventory = await patchInventory(
      inventoryId,
      op,
      field,
      value,
    );
    return patchedInventory;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteInventoryService = async (inventoryId: number) => {
  const deletedInventory = await deleteInventory(inventoryId);
  return deletedInventory;
};

export const getInventoryService = async (inventoryId: number) => {
  const inventory = await getInventory(inventoryId);
  return inventory;
};

export const getAllInventoryService = async () => {
  const allInventory = await getAllInventory();
  return allInventory;
};
