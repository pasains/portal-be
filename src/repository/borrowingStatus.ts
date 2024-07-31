import { PrismaClient, BorrowingStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const createBorrowingStatus = async (
  borrowingStatus: BorrowingStatus,
) => {
  const newBorrowingStatus = await prisma.borrowingStatus.create({
    data: borrowingStatus,
  });
  return newBorrowingStatus;
};

export const updateBorrowingStatus = async (
  borrowingStatusId: number,
  borrowingStatus: BorrowingStatus,
) => {
  const updatedBorrowingStatus = await prisma.borrowingStatus.update({
    where: { id: borrowingStatusId },
    data: borrowingStatus,
  });
  return updatedBorrowingStatus;
};
export const patchBorrowingStatus = async (
  borrowingStatusId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedBorrowingStatus = await prisma.borrowingStatus.update({
    where: { id: borrowingStatusId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedBorrowingStatus;
};

export const deleteBorrowingStatus = async (borrowingStatusId: number) => {
  const deletedBorrowingStatus = await prisma.borrowingStatus.delete({
    where: { id: borrowingStatusId },
  });
  return deletedBorrowingStatus;
};

export const getBorrowingStatus = async (borrowingStatusId: number) => {
  const borrowingStatus = await prisma.borrowingStatus.findUnique({
    where: { id: borrowingStatusId },
  });
  return borrowingStatus;
};

export const getAllBorrowingStatus = async () => {
  const allBorrowingStatus = await prisma.borrowingStatus.findMany();
  return allBorrowingStatus;
};
