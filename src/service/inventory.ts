// handling all business logic for inventory related
import {
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
} from "../types/inventory";
import {
  checkInventoryTypeName,
  createInventoryType,
  getInventoryType,
} from "../repository/inventoryType";

export const createInventoryService = async (
  inventory: InventoryCreateParams,
) => {
  let inventoryType;
  const exists = await checkInventoryTypeName({
    inventoryTypeName: inventory.inventoryTypeName,
  });
  if (exists) {
    inventoryType = await getInventoryType(inventory.inventoryTypeId);
  } else {
    inventoryType = await createInventoryType({
      id: inventory.inventoryTypeId,
      inventoryTypeName: inventory.inventoryTypeName,
      description: inventory.descriptionInventoryType,
    });
  }
  if (!inventoryType || !inventoryType.id) {
    throw new Error("Failed to retrieve or create a valid inventory type");
  }
  try {
    const newInventory = await createInventory({
      ...inventory,
      inventoryTypeId: inventoryType.id,
    });
    return newInventory;
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const updateInventoryService = async (
  inventoryId: bigint,
  inventory: InventoryUpdateParams,
) => {
  const updatedInventory = await updateInventory(inventoryId, inventory);
  return updatedInventory;
};

export const patchInventoryService = async (
  inventoryId: bigint,
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

export const deleteInventoryService = async (inventoryId: bigint) => {
  const deletedInventory = await deleteInventory(inventoryId);
  console.log(`DELETE_INVENTORY`);
  return deletedInventory;
};

export const getInventoryService = async (inventoryId: bigint) => {
  const inventory = await getInventory(inventoryId);
  console.log(`PORTAL_BE_INVENTORY`, inventory);
  return inventory;
};

export const getAllInventoryService = async (props: {
  inventoryTypeId: bigint | null;
  inventoryGroupId: bigint | undefined;
}) => {
  const allInventory = await getAllInventory({
    inventoryTypeId: props.inventoryTypeId,
    inventoryGroupId: props.inventoryGroupId,
  });
  return allInventory;
};
