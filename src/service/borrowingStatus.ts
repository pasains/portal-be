import {
  createBorrowingStatus,
  deleteBorrowingStatus,
  getAllBorrowingStatus,
  getBorrowingStatus,
  patchBorrowingStatus,
  updateBorrowingStatus,
} from "../repository/borrowingStatus";
import {
  BorrowingStatusCreateParams,
  BorrowingStatusUpdateParams,
} from "../types/borrowingStatus";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createBorrowingStatusService = async (borrowingStatus: BorrowingStatusCreateParams) => {
  const newBorrowingStatus = await createBorrowingStatus(borrowingStatus);
  return newBorrowingStatus;
};

export const updateBorrowingStatusService = async (
  borrowingStatusId: number,
  borrowingStatus: BorrowingStatusUpdateParams,
) => {
  const updatedBorrowingStatus = await updateBorrowingStatus(borrowingStatusId, borrowingStatus);
  return updatedBorrowingStatus;
};

export const patchBorrowingStatusService = async (
  borrowingStatusId: number,
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
    const patchedBorrowingStatus = await patchBorrowingStatus(borrowingStatusId, op, field, value);
    return patchedBorrowingStatus;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteBorrowingStatusService = async (borrowingStatusId: number) => {
  const deletedBorrowingStatus = await deleteBorrowingStatus(borrowingStatusId);
  return deletedBorrowingStatus;
};

export const getBorrowingStatusService = async (borrowingStatusId: number) => {
  const BorrowingStatusStatus = await getBorrowingStatus(borrowingStatusId);
  return BorrowingStatusStatus;
};

export const getAllBorrowingStatusService = async () => {
  const allBorrowingStatus = await getAllBorrowingStatus();
  return allBorrowingStatus;
};
