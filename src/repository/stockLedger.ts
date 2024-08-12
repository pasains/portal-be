import { PrismaClient } from "@prisma/client";
import {
  StockLedgerCreateParams,
  StockLedgerUpdateParams,
} from "../types/stockLedger";

const prisma = new PrismaClient();

export const createStockLedger = async (
  stockLedger: StockLedgerCreateParams,
) => {
  const newStockLedger = await prisma.stockLedger.create({
    data: {
      inventoryId: stockLedger?.inventoryId,
      quantity: stockLedger?.quantity,
      quantityAfterTransaction: stockLedger?.quantityAfterTransaction,
      voucherType: stockLedger?.voucherType,
      voucherName: stockLedger?.voucherName,
    },
  });
  return newStockLedger;
};

export const updateStockLedger = async (
  stockLedgerId: number,
  stockLedger: StockLedgerUpdateParams,
) => {
  const updatedStockLedger = await prisma.stockLedger.update({
    where: { id: stockLedgerId },
    data: {
      inventoryId: stockLedger?.inventoryId,
      quantity: stockLedger?.quantity,
      quantityAfterTransaction: stockLedger?.quantityAfterTransaction,
      voucherType: stockLedger?.voucherType,
      voucherName: stockLedger?.voucherName,
    },
  });
  return updatedStockLedger;
};
export const patchStockLedger = async (
  stockLedgerId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedStockLedger = await prisma.stockLedger.update({
    where: { id: stockLedgerId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedStockLedger;
};

export const deleteStockLedger = async (stockLedgerId: number) => {
  const deletedStockLedger = await prisma.stockLedger.delete({
    where: { id: stockLedgerId },
  });
  return deletedStockLedger;
};

export const getStockLedger = async (stockLedgerId: number) => {
  const stockLedger = await prisma.stockLedger.findUnique({
    where: { id: stockLedgerId },
  });
  return stockLedger;
};

export const getAllStockLedger = async () => {
  const allStockLedger = await prisma.stockLedger.findMany();
  return allStockLedger;
};
