import { PrismaClient } from "@prisma/client";
import { BorrowerCreateParams, BorrowerUpdateParams } from "../types/borrower";

const prisma = new PrismaClient();

export const createBorrower = async (borrower: BorrowerCreateParams) => {
  const newBorrower = await prisma.borrower.create({
    data: {
      borrowerName: borrower.borrowerName,
      identityCard: borrower.identityCard,
      identityNumber: borrower.identityNumber,
      phoneNumber: borrower.phoneNumber,
      borrowerOrganizationRel: {
        connectOrCreate: {
          where: {
            id: borrower.organizationId,
          },
          create: {
            organizationName: borrower.organizationName,
            address: borrower.address,
            organizationStatus: borrower.organizationStatus,
            note: borrower.note,
          },
        },
      },
    },
  });
  return newBorrower;
};

export const checkBorrowerName = async (borrower: { borrowerName: string }) => {
  const newBorrower = await prisma.borrower.findFirst({
    where: {
      borrowerName: borrower?.borrowerName,
    },
  });
  return newBorrower;
};

export const updateBorrower = async (
  borrowerId: bigint,
  borrower: BorrowerUpdateParams,
) => {
  const updatedBorrower = await prisma.borrower.update({
    where: { id: borrowerId },
    data: {
      borrowerName: borrower?.borrowerName,
      identityCard: borrower?.identityCard,
      identityNumber: borrower?.identityNumber,
      phoneNumber: borrower?.phoneNumber,
    },
  });
  return updatedBorrower;
};
export const patchBorrower = async (
  borrowerId: bigint,
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

export const deleteBorrower = async (borrowerId: bigint) => {
  const deletedBorrower = await prisma.borrower.delete({
    where: { id: borrowerId },
  });
  return deletedBorrower;
};

export const getBorrower = async (borrowerId: bigint) => {
  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId },
  });
  return borrower;
};

export const getAllBorrower = async () => {
  const allBorrower = await prisma.borrower.findMany();
  return allBorrower;
};
