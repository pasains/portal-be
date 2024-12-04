import prisma from "../configuration/db";
import { BorrowerCreateParams, BorrowerUpdateParams } from "../types/borrower";

//Query prisma create Borrower
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

//Query for checking borrower name
export const checkBorrowerName = async (borrower: { borrowerName: string }) => {
  const newBorrower = await prisma.borrower.findFirst({
    where: {
      borrowerName: borrower?.borrowerName,
    },
  });
  return newBorrower;
};

//Query for update borrower
export const updateBorrower = async (
  borrowerId: bigint,
  borrower: BorrowerUpdateParams,
) => {
  const updatedBorrower = await prisma.borrower.update({
    where: { id: borrowerId },
    data: {
      id: borrower.id,
      borrowerName: borrower?.borrowerName,
      identityCard: borrower?.identityCard,
      identityNumber: borrower?.identityNumber,
      phoneNumber: borrower?.phoneNumber,
      borrowerOrganizationRel: {
        update: {
          data: {
            organizationName: borrower.organizationName,
            address: borrower.address,
            organizationStatus: borrower.organizationStatus,
            note: borrower.note,
          },
        },
      },
    },
  });
  return updatedBorrower;
};

//Query for patch borrower
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

//Query for delete borrower
export const deleteBorrower = async (borrowerId: bigint) => {
  const deletedBorrower = await prisma.borrower.delete({
    where: { id: borrowerId },
  });
  return deletedBorrower;
};

//Query for get borrower by Id
export const getBorrower = async (borrowerId: bigint) => {
  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId, deleted: false },
    include: {
      borrowerOrganizationRel: true,
    },
  });
  return borrower;
};

//Query for get borrowers
export const getAllBorrower = async (props: {
  //Query paramaters for get organization by Id
  orgId: bigint | null;
  //identityCard: string | null;
}) => {
  const filter = {} as any;
  if (props.orgId != null) {
    filter.organizationId = props.orgId;
  }
  //if (props.identityCard != null) {
  //  filter.identityCard = props.identityCard;
  //}

  const allBorrower = await prisma.borrower.findMany({
    where: { ...filter, deleted: false },
    include: {
      borrowerOrganizationRel: {
        select: {
          organizationName: true,
          address: true,
          organizationStatus: true,
          note: true,
        },
      },
    },
  });
  return allBorrower;
};
