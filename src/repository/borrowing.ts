import prisma from "../configuration/db";
import {
  BorrowingCreateParams,
  BorrowingUpdateParams,
} from "../types/borrowing";

export const createBorrowing = async (borrowing: BorrowingCreateParams) => {
  console.log(`Organization Id`, borrowing?.organizationId == undefined);
  const newBorrowing = await prisma.$transaction(async (prisma) => {
    const createdBorrowing = await prisma.borrowing.create({
      data: {
        borrowerIdRel: {
          connectOrCreate: {
            where: {
              id: borrowing.borrowerId,
            },
            create: {
              borrowerName: borrowing.borrowerName,
              identityCard: borrowing.identityCard,
              identityNumber: borrowing.identityNumber,
              phoneNumber: borrowing.phoneNumber,
              borrowerOrganizationRel: {
                connectOrCreate: {
                  where: {
                    id: borrowing.organizationId,
                  },
                  create: {
                    organizationName: borrowing.organizationName,
                    address: borrowing.address,
                    organizationStatus: borrowing.organizationStatus,
                    note: borrowing.note,
                  },
                },
              },
            },
          },
        },
        itemBorrowingIdRel: {
          create: await Promise.all(
            borrowing.items.map(async (item) => {
              // find inventory stock record by inventory id
              const inventoryStock = await prisma.inventoryStock.findFirst({
                where: { inventoryId: item.inventoryId },
              });
              if (!inventoryStock) {
                throw new Error(
                  `Inventory stock not found for inventory Id: ${item.inventoryId}`,
                );
              }
              await prisma.inventoryStock.update({
                where: {
                  id: inventoryStock?.id,
                },
                data: { currentQuantity: { decrement: item.quantity } },
              });
              return {
                quantity: item.quantity,
                itemInventoryIdRel: {
                  connect: { id: item.inventoryId },
                },
              };
            }),
          ),
        },
        dueDate: borrowing.dueDate,
        specialInstruction: borrowing.specialInstruction,
      },
    });

    return createdBorrowing;
  });
  return newBorrowing;
};

export const updateBorrowing = async (
  borrowingId: bigint,
  borrowing: BorrowingUpdateParams,
) => {
  const updatedBorrowing = await prisma.borrowing.update({
    where: { id: borrowingId },
    data: {
      borrowerId: borrowing.borrowerId,
      dueDate: borrowing.dueDate,
      status: borrowing.status,
      specialInstruction: borrowing.specialInstruction,
    },
  });
  return updatedBorrowing;
};
export const patchBorrowing = async (
  borrowingId: bigint,
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

export const deleteBorrowing = async (borrowingId: bigint) => {
  const deletedBorrowing = await prisma.borrowing.delete({
    where: { id: borrowingId },
  });
  return deletedBorrowing;
};

export const getBorrowing = async (borrowingId: bigint) => {
  const borrowing = await prisma.borrowing.findUnique({
    where: { id: borrowingId, deleted: false },
    include: {
      borrowerIdRel: {
        include: {
          borrowerOrganizationRel: true,
        },
      },
    },
  });
  return borrowing;
};

export const getAllBorrowing = async (props: {
  page?: number;
  limit?: number;
}) => {
  const { page = 1, limit = 10 } = props;
  const allBorrowing = await prisma.borrowing.findMany({
    where: { deleted: false },
    include: {
      borrowerIdRel: {
        select: {
          borrowerName: true,
          identityNumber: true,
          identityCard: true,
          phoneNumber: true,
          borrowerOrganizationRel: {
            select: {
              organizationName: true,
              address: true,
            },
          },
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalBorrowing = await prisma.borrowing.count({
    where: { deleted: false },
  });
  return {
    borrowing: allBorrowing,
    currentPage: page,
    totalPage: Math.ceil(totalBorrowing / limit),
  };
};
