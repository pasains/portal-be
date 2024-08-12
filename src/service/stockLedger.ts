import { getInventory } from "../repository/inventory";
import {
  createStockLedger,
  deleteStockLedger,
  getAllStockLedger,
  getStockLedger,
  patchStockLedger,
  updateStockLedger,
} from "../repository/stockLedger";
import {
  StockLedgerCreateParams,
  StockLedgerUpdateParams,
} from "../types/stockLedger";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createStockLedgerService = async (
  stockLedger: StockLedgerCreateParams,
) => {
  if (stockLedger.inventoryId) {
    const inventoryExists = await getInventory(stockLedger.inventoryId)
    if (!inventoryExists) {
      throw new Error("Invalid Inventory Id")
    }
  }
  const newStockLedger = await createStockLedger({...stockLedger,});
  return newStockLedger;
};

export const updateStockLedgerService = async (
  stockLedgerId: number,
  stockLedger: StockLedgerUpdateParams,
) => {
  if (stockLedger.inventoryId) {
    const inventoryExists = await getInventory(stockLedger.inventoryId)
    if (!inventoryExists) {
      throw new Error("Invalid Inventory Id")
    }
  }
  const updatedStockLedger = await updateStockLedger(stockLedgerId, stockLedger);
  return updatedStockLedger;
};

export const patchedStockLedger = async (
  stockLedgerId: number,
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
    const patchedStockLedger = await patchStockLedger(
      stockLedgerId,
      op,
      field,
      value,
    );
    return patchedStockLedger;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};


export const deleteStockLedgerService = async (stockLedgerId: number) => {
  const deletedStockLedger = await deleteStockLedger(stockLedgerId);
  return deletedStockLedger;
};

export const getStockLedgerService = async (stockLedgerId: number) => {
  const stockLedger = await getStockLedger(stockLedgerId);
  return stockLedger;
};

export const getAllStockLedgerService = async () => {
  const allStockLedger = await getAllStockLedger();
  return allStockLedger;
};
