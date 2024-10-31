import {
  checkOrganizationName,
  createOrganization,
  getOrganization,
} from "../repository/organization";
import {
  checkBorrowerName,
  createBorrower,
  getBorrower,
} from "../repository/borrower";
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

export const createBorrowingService = async (
  borrowing: BorrowingCreateParams,
) => {
  let organization;
  let borrower;
  const existsBorrower = await checkBorrowerName({
    borrowerName: borrowing.borrowerName,
  });
  if (existsBorrower) {
    borrower = await getBorrower(borrowing.borrowerId);
  }
  if (existsBorrower?.organizationId == borrowing.organizationId) {
    organization = await getOrganization(borrowing.organizationId);
  }
  const existsOrganization = await checkOrganizationName({
    organizationName: borrowing.organizationName,
  });
  if (existsOrganization) {
    organization = await getOrganization(borrowing.organizationId);
  }
  try {
    const newBorrowing = await createBorrowing({
      ...borrowing,
    });
    return newBorrowing;
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const updateBorrowingService = async (
  borrowingId: bigint,
  borrowing: BorrowingUpdateParams,
) => {
  const updatedBorrowing = await updateBorrowing(borrowingId, borrowing);
  return updatedBorrowing;
};

export const patchBorrowingService = async (
  borrowingId: bigint,
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

export const deleteBorrowingService = async (borrowingId: bigint) => {
  const deletedBorrowing = await deleteBorrowing(borrowingId);
  return deletedBorrowing;
};

export const getBorrowingService = async (borrowingId: bigint) => {
  const borrowing = await getBorrowing(borrowingId);
  return borrowing;
};

export const getAllBorrowingService = async () => {
  const allBorrowing = await getAllBorrowing();
  return allBorrowing;
};
