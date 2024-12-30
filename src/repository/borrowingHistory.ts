import prisma from "../configuration/db";

export const getBorrowingHistory = async (inventoryId: bigint) => {
  const borrowingHistory = await prisma.inventory.findUnique({
    where: { id: inventoryId, deleted: false },
    include: {
      itemInventoryIdRel: {
        include: {
          itemBorrowingIdRel: true,
        },
      },
    },
  });
  return borrowingHistory;
};

export const getAllBorrowingHistory = async () => {
  const getAllBorrowingHistory = await prisma.borrowingHistory.findMany({
    where: { deleted: false },
  });
  return getAllBorrowingHistory;
};
