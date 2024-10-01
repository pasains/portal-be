import { PrismaClient } from "@prisma/client";
import {
  BorrowingCreateParams,
  BorrowingUpdateParams,
} from "../types/borrowing";

const prisma = new PrismaClient();

export const createBorrowing = async (borrowing: BorrowingCreateParams) => {
  const [borrower, organization] = await prisma.$transaction(async (tx) => {
    // Check if the organization exists, and if not, create a new one
    const organization = await tx.organization.create({
      data: {
        organizationName: borrowing.organizationName,
        address: borrowing.address,
        organizationStatus: borrowing.organizationStatus,
        note: borrowing.note,
      },
    });
    // Check if the borrower exists, and if not, create a new one
    const borrower = await tx.borrower.create({
      data: {
        borrowerName: borrowing.borrowerName,
        identityCard: borrowing.identityCard,
        identityNumber: borrowing.identityNumber,
        phoneNumber: borrowing.phoneNumber,
        organizationName: borrowing.organizationName,
      },
    });

    return [borrower, organization];
  });

  // Create a new borrowing record and connect to existing borrower and organization
  try {
    const newBorrowing = await prisma.borrowing.create({
      data: {
        borrowingOrganizationIdRel: {
          connect: { id: organization.id },
        },
        borrowerIdRel: {
          connect: { id: borrower.id },
        },
        dueDate: borrowing.dueDate,
        specialInstruction: borrowing.specialInstruction,
      },
      include: {
        borrowingOrganizationIdRel: {
          select: {
            organizationName: true,
            address: true,
            note: true,
          },
        },
        borrowerIdRel: {
          select: {
            borrowerName: true,
            identityCard: true,
            identityNumber: true,
            phoneNumber: true,
          },
        },
      },
    });

    return newBorrowing;
  } catch (error) {
    console.log("Error create borrowing:", error);
    throw new Error(
      "Duplicate borrowing entry for same borrower and organization",
    );
  }
};

export const updateBorrowing = async (
  borrowingId: number,
  borrowing: BorrowingUpdateParams,
) => {
  const updatedBorrowing = await prisma.borrowing.update({
    where: { id: borrowingId },
    data: {
      borrowerId: borrowing.borrowerId,
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
