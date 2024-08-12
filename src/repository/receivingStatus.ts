import { PrismaClient } from "@prisma/client";
import {
  ReceivingStatusCreateParams,
  ReceivingStatusUpdateParams,
} from "../types/receivingStatus";

const prisma = new PrismaClient();

export const createReceivingStatus = async (
  receivingStatus: ReceivingStatusCreateParams,
) => {
  const newReceivingStatus = await prisma.receivingStatus.create({
    data: {
      receivingId: receivingStatus?.receivingId,
      status: receivingStatus?.status,
    },
  });
  return newReceivingStatus;
};

export const updateReceivingStatus = async (
  receivingStatusId: number,
  receivingStatus: ReceivingStatusUpdateParams,
) => {
  const updatedReceivingStatus = await prisma.receivingStatus.update({
    where: { id: receivingStatusId },
    data: {
      receivingId: receivingStatus?.receivingId,
      status: receivingStatus?.status,
    },
  });
  return updatedReceivingStatus;
};
export const patchReceivingStatus = async (
  receivingStatusId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedReceivingStatus = await prisma.receivingStatus.update({
    where: { id: receivingStatusId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedReceivingStatus;
};

export const deleteReceivingStatus = async (receivingStatusId: number) => {
  const deletedReceivingStatus = await prisma.receivingStatus.delete({
    where: { id: receivingStatusId },
  });
  return deletedReceivingStatus;
};

export const getReceivingStatus = async (receivingStatusId: number) => {
  const receivingStatus = await prisma.receivingStatus.findUnique({
    where: { id: receivingStatusId },
  });
  return receivingStatus;
};

export const getAllReceivingStatus = async () => {
  const allReceivingStatus = await prisma.receivingStatus.findMany();
  return allReceivingStatus;
};
