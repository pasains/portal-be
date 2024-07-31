import { PrismaClient, Borrowing } from "@prisma/client";

const prisma = new PrismaClient();

export const createBorrowing = async (borrowing: Borrowing) => {
  const newBorrowing = await prisma.borrowing.create({
    data: borrowing,
  });
  return newBorrowing;
};

export const updateBorrowing = async (
  borrowingId: number,
  borrowing: Borrowing,
) => {
  const updatedBorrowing = await prisma.borrowing.update({
    where: { id: borrowingId },
    data: borrowing,
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
