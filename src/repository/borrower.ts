import { PrismaClient } from "@prisma/client";
import { BorrowerCreateParams, BorrowerUpdateParams } from "../types/borrower";

const prisma = new PrismaClient();

export const createBorrower = async (borrower: BorrowerCreateParams) => {
  const newBorrower = await prisma.borrower.create({
    data: {
      borrowerName: borrower?.borrowerName,
      organizationName: borrower?.organizationName,
      identityCard: borrower?.identityCard,
      identityNumber: borrower?.identityNumber,
      phoneNumber: borrower?.phoneNumber,
    },
  });
  return newBorrower;
};

export const updateBorrower = async (
  borrowerId: number,
  borrower: BorrowerUpdateParams,
) => {
  const updatedBorrower = await prisma.borrower.update({
    where: { id: borrowerId },
    data: {
      borrowerName: borrower?.borrowerName,
      organizationName: borrower?.organizationName,
      identityCard: borrower?.identityCard,
      identityNumber: borrower?.identityNumber,
      phoneNumber: borrower?.phoneNumber,
    },
  });
  return updatedBorrower;
};
export const patchBorrower = async (
  borrowerId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedBorrower = await prisma.borrower.update({
    where: { id: borrowerId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedBorrower;
};

export const deleteBorrower = async (borrowerId: number) => {
  const deletedBorrower = await prisma.borrower.delete({
    where: { id: borrowerId },
  });
  return deletedBorrower;
};

export const getBorrower = async (borrowerId: number) => {
  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId },
  });
  return borrower;
};

export const getAllBorrower = async () => {
  const allBorrower = await prisma.borrower.findMany();
  return allBorrower;
};
