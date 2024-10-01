import {
  createBorrowing,
  deleteBorrowing,
  getAllBorrowing,
  getBorrowing,
  patchBorrowing,
  updateBorrowing,
} from "../repository/borrowing";
import {
  BorrowingCreateParams,
  BorrowingUpdateParams,
} from "../types/borrowing";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { createBorrower } from "../repository/borrower";
import { createOrganization } from "../repository/organization";

export const createBorrowingService = async (
  borrowing: BorrowingCreateParams,
) => {
  //const organization = await createOrganization({
  //  ...borrowing,
  //  organizationName: borrowing.organizationName,
  //  address: borrowing.address,
  //  organizationStatus: borrowing.organizationStatus,
  //  note: borrowing.note,
  //});
  //const borrower = await createBorrower({
  //  ...borrowing,
  //  organizationId: organization.id,
  //  borrowerName: borrowing.borrowerName,
  //  identityCard: borrowing.identityCard,
  //  identityNumber: borrowing.identityNumber,
  //  phoneNumber: borrowing.phoneNumber,
  //});
  const newBorrowing = await createBorrowing(borrowing);
  //...borrowing,
  //organizationName: organization.organizationName,
  //address: organization.address,
  //organizationStatus: organization.organizationStatus,
  //note: organization.note,
  //borrowerName: borrower.borrowerName,
  //identityCard: borrower.identityCard,
  //identityNumber: borrower.identityNumber,
  //phoneNumber: borrower.phoneNumber,
  //dueDate: borrowing.dueDate,
  //specialInstruction: borrowing.specialInstruction,
  return newBorrowing;
};

export const updateBorrowingService = async (
  borrowingId: number,
  borrowing: BorrowingUpdateParams,
) => {
  const updatedBorrowing = await updateBorrowing(borrowingId, borrowing);
  return updatedBorrowing;
};

export const patchBorrowingService = async (
  borrowingId: number,
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
    const patchedBorrowing = await patchBorrowing(
      borrowingId,
      op,
      field,
      value,
    );
    return patchedBorrowing;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteBorrowingService = async (borrowingId: number) => {
  const deletedBorrowing = await deleteBorrowing(borrowingId);
  return deletedBorrowing;
};

export const getBorrowingService = async (borrowingId: number) => {
  const borrowing = await getBorrowing(borrowingId);
  return borrowing;
};

export const getAllBorrowingService = async () => {
  const allBorrowing = await getAllBorrowing();
  return allBorrowing;
};
