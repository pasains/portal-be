import {
  createBorrower,
  deleteBorrower,
  getAllBorrower,
  getBorrower,
  patchBorrower,
  updateBorrower,
} from "../repository/borrower";
import {
  BorrowerCreateParams,
  BorrowerUpdateParams,
} from "../types/borrower";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createBorrowerService = async (borrower: BorrowerCreateParams) => {
  const newBorrower = await createBorrower(borrower);
  return newBorrower;
};

export const updateBorrowerService = async (
  borrowerId: number,
  borrower: BorrowerUpdateParams,
) => {
  const updatedBorrower = await updateBorrower(borrowerId, borrower);
  return updatedBorrower;
};

export const patchBorrowerService = async (
  borrowerId: number,
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
    const patchedBorrower = await patchBorrower(borrowerId, op, field, value);
    return patchedBorrower;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteBorrowerService = async (borrowerId: number) => {
  const deletedBorrower = await deleteBorrower(borrowerId);
  return deletedBorrower;
};

export const getBorrowerService = async (borrowerId: number) => {
  const borrower = await getBorrower(borrowerId);
  return borrower;
};

export const getAllBorrowerService = async () => {
  const allBorrower = await getAllBorrower();
  return allBorrower;
};
