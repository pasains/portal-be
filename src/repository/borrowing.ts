import { PrismaClient } from "@prisma/client";
import {
  BorrowingCreateParams,
  BorrowingUpdateParams,
} from "../types/borrowing";

const prisma = new PrismaClient();

export const createBorrowing = async (borrowing: BorrowingCreateParams) => {
  const newBorrowing = await prisma.borrowing.create({
    data: {
      borrowerId: borrowing.borrowerId,
      borrowingStatusId: borrowing.borrowingStatusId,
      organizationId: borrowing.organizationId,
      dueDate: borrowing.dueDate,
      specialInstruction: borrowing.specialInstruction,
    },
  });
  return newBorrowing;
};

export const updateBorrowing = async (
  borrowingId: number,
  borrowing: BorrowingUpdateParams,
) => {
  const updatedBorrowing = await prisma.borrowing.update({
    where: { id: borrowingId },
    data: {
      borrowerId: borrowing.borrowerId,
      borrowingStatusId: borrowing.borrowingStatusId,
      organizationId: borrowing.organizationId,
      dueDate: borrowing.dueDate,
      specialInstruction: borrowing.specialInstruction,
    },
  });
  return updatedBorrowing;
};
export const patchBorrowing = async (
  borrowingId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedBorrowing = await prisma.borrowing.update({
    where: { id: borrowingId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedBorrowing;
};

export const deleteBorrowing = async (borrowingId: number) => {
  const deletedBorrowing = await prisma.borrowing.delete({
    where: { id: borrowingId },
  });
  return deletedBorrowing;
};

export const getBorrowing = async (borrowingId: number) => {
  const borrowing = await prisma.borrowing.findUnique({
    where: { id: borrowingId },
  });
  return borrowing;
};

export const getAllBorrowing = async () => {
  const allBorrowing = await prisma.borrowing.findMany();
  return allBorrowing;
};
