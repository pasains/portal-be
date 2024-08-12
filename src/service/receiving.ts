import {
  createReceiving,
  deleteReceiving,
  getAllReceiving,
  getReceiving,
  patchReceiving,
  updateReceiving,
} from "../repository/receiving";
import {
  ReceivingCreateParams,
  ReceivingUpdateParams,
} from "../types/receiving";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createReceivingService = async (item: ReceivingCreateParams) => {
  const newReceiving = await createReceiving(item);
  return newReceiving;
};

export const updateReceivingService = async (
  receivingId: number,
  item: ReceivingUpdateParams,
) => {
  const updatedReceiving = await updateReceiving(receivingId, item);
  return updatedReceiving;
};

export const patchReceivingService = async (
  receivingId: number,
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
    const patchedReceiving = await patchReceiving(receivingId, op, field, value);
    return patchedReceiving;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteReceivingService = async (receivingId: number) => {
  const deletedReceiving = await deleteReceiving(receivingId);
  return deletedReceiving;
};

export const getReceivingService = async (receivingId: number) => {
  const receiving = await getReceiving(receivingId);
  return receiving;
};

export const getAllReceivingService = async () => {
  const allReceiving = await getAllReceiving();
  return allReceiving;
};
