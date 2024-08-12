import { PrismaClient } from "@prisma/client";
import {
  ReceivingCreateParams,
  ReceivingUpdateParams,
} from "../types/receiving";

const prisma = new PrismaClient();

export const createReceiving = async (receiving: ReceivingCreateParams) => {
  const newReceiving = await prisma.receiving.create({
    data: receiving,
  });
  return newReceiving;
};

export const updateReceiving = async (
  receivingId: number,
  receiving: ReceivingUpdateParams,
) => {
  const updatedReceiving = await prisma.receiving.update({
    where: { id: receivingId },
    data: receiving,
  });
  return updatedReceiving;
};
export const patchReceiving = async (
  receivingId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedReceiving = await prisma.receiving.update({
    where: { id: receivingId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedReceiving;
};

export const deleteReceiving = async (receivingId: number) => {
  const deletedReceiving = await prisma.receiving.delete({
    where: { id: receivingId },
  });
  return deletedReceiving;
};

export const getReceiving = async (receivingId: number) => {
  const receiving = await prisma.receiving.findUnique({
    where: { id: receivingId },
  });
  return receiving;
};

export const getAllReceiving = async () => {
  const allReceiving = await prisma.receiving.findMany();
  return allReceiving;
};
