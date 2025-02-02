import {
  checkOrganizationName,
  createOrganization,
  getOrganization,
} from "../repository/organization";
import {
  createBorrower,
  deleteBorrower,
  getAllBorrower,
  getBorrower,
  patchBorrower,
  updateBorrower,
} from "../repository/borrower";
import { BorrowerCreateParams, BorrowerUpdateParams } from "../types/borrower";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createBorrowerService = async (borrower: BorrowerCreateParams) => {
  let organization;
  const exists = await checkOrganizationName({
    organizationName: borrower.organizationName,
  });
  if (exists) {
    organization = await getOrganization(borrower.organizationId);
  } else {
    organization = await createOrganization({
      id: borrower.organizationId,
      organizationName: borrower.organizationName,
      address: borrower.address,
      organizationStatus: borrower.organizationStatus,
      note: borrower.note,
    });
  }
  if (!organization || !organization.id) {
    throw new Error("Failed to retrieve or create a valid organization.");
  }
  try {
    const newBorrower = await createBorrower({
      ...borrower,
      organizationId: organization.id,
    });
    return newBorrower;
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error.");
  }
};

export const updateBorrowerService = async (
  borrowerId: bigint,
  borrower: BorrowerUpdateParams,
) => {
  const updatedBorrower = await updateBorrower(borrowerId, borrower);
  return updatedBorrower;
};

export const patchBorrowerService = async (
  borrowerId: bigint,
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

export const deleteBorrowerService = async (borrowerId: bigint) => {
  const deletedBorrower = await deleteBorrower(borrowerId);
  return deletedBorrower;
};

export const getBorrowerService = async (borrowerId: bigint) => {
  const borrower = await getBorrower(borrowerId);
  return borrower;
};

export const getAllBorrowerService = async (props: {
  orgId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allBorrower = await getAllBorrower({
    orgId: props.orgId,
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  return allBorrower;
};
