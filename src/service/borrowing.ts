import {
  checkOrganizationName,
  getOrganization,
} from "../repository/organization";
import { checkBorrowerName, getBorrower } from "../repository/borrower";
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
    console.log(
      `Organization Id Service`,
      borrowing?.organizationId == undefined,
    );
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
  const formatInvoiceNumber = (id: bigint): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const uniqueId = String(id).padStart(6, "0"); // Pad with leading zeros
    return `INV-${year}${month}${day}-${uniqueId}`;
  };
  const invoiceNumber = formatInvoiceNumber(borrowingId);
  console.log(`INV NUMBER`, invoiceNumber);

  return { ...borrowing, invoiceNumber };
};

export const getAllBorrowingService = async (props: {
  page?: number;
  limit?: number;
}) => {
  const allBorrowing = await getAllBorrowing({
    page: props.page,
    limit: props.limit,
  });
  return allBorrowing;
};
