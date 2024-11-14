import prisma from "../configuration/db";
import { BorrowingHistoryCreateParams } from "../types/borrowingHistory";

export const createBorrowingHistory = async (
  borrowingHistory: BorrowingHistoryCreateParams,
) => {
  const newBorrowingHistory = await prisma.$transaction(async (prisma) => {
    const createdBorrowingHistory = await prisma.borrowingHistory.create({
      data: {
        id: borrowingHistory.id,
        borrowerId: borrowingHistory.borrowerId,
        status: borrowingHistory.status,
        dueDate: borrowingHistory.dueDate,
        specialInstruction: borrowingHistory.specialInstruction,
      },
    });

    return createdBorrowingHistory;
  });
  return newBorrowingHistory;
};

export const getBorrowingHistory = async (borrowingHistoryId: bigint) => {
  const borrowingHistory = await prisma.borrowingHistory.findUnique({
    where: { revId: borrowingHistoryId, deleted: false },
  });
  return borrowingHistory;
};

export const getAllBorrowingHistory = async () => {
  const getAllBorrowingHistory = await prisma.borrowingHistory.findMany({
    where: { deleted: false },
  });
  return getAllBorrowingHistory;
};
