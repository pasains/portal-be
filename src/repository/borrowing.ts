import prisma from "../configuration/db";
import {
  BorrowingCreateParams,
  BorrowingUpdateParams,
} from "../types/borrowing";

export const createBorrowing = async (borrowing: BorrowingCreateParams) => {
  const formatInvoiceNumber = (id: bigint): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const uniqueId = String(id).padStart(6, "0"); // Pad with leading zeros
    return `INV-${year}${month}${day}-${uniqueId}`;
  };
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
                    id: borrowing?.organizationId,
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
              // Validate the requested quantity
              if (item.quantity > inventoryStock.currentQuantity) {
                throw new Error(
                  `Requested quantity (${item.quantity}) exceeds available stock (${inventoryStock.currentQuantity}) for inventory Id: ${item.inventoryId}`,
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
    const invoiceNumber = formatInvoiceNumber(createdBorrowing.id);
    // Update the borrowing record with the generated invoice number
    const updatedBorrowing = await prisma.borrowing.update({
      where: { id: createdBorrowing.id },
      data: { invoiceNumber },
    });

    return updatedBorrowing;
  });
  return newBorrowing;
};

export const updateBorrowing = async (
  borrowingId: bigint,
  borrowing: BorrowingUpdateParams,
) => {
  const newUpdatedborrowing = await prisma.$transaction(async (prisma) => {
    const currentBorrowing = await prisma.borrowing.findUnique({
      where: { id: borrowingId },
      include: {
        borrowerIdRel: {
          include: {
            borrowerOrganizationRel: true,
          },
        },
        itemBorrowingIdRel: {
          include: {
            itemInventoryIdRel: true,
          },
        },
      },
    });
    if (!currentBorrowing) {
      throw new Error("Borrowing not found.");
    }
    const updatedBorrowing = await prisma.borrowing.update({
      where: { id: borrowingId },
      data: {
        borrowerId: borrowing.borrowerId,
        dueDate: borrowing.dueDate,
        status: borrowing.status,
        specialInstruction: borrowing.specialInstruction,
      },
    });

    await prisma.borrowingHistory.create({
      data: {
        id: currentBorrowing.id,
        dueDate: currentBorrowing.dueDate,
        status: currentBorrowing.status,
        specialInstruction: currentBorrowing.specialInstruction,
        borrowerId: currentBorrowing.borrowerId,
        createdAt: currentBorrowing.createdAt,
        updatedAt: new Date(),
      },
    });
    return updatedBorrowing;
  });
  return newUpdatedborrowing;
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
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.search) {
    filter.borrowerIdRel = {
      borrowerName: {
        contains: props.search,
        mode: "insensitive",
      },
    };
  }
  const allBorrowing = await prisma.borrowing.findMany({
    where: { ...filter, deleted: false },
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
    orderBy: { createdAt: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalBorrowing = await prisma.borrowing.count({
    where: { ...filter, deleted: false },
  });
  return {
    borrowing: allBorrowing,
    currentPage: page,
    totalPage: Math.ceil(totalBorrowing / limit),
  };
};
