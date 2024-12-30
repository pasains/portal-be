import prisma from "../configuration/db";

export const getInventoryHistory = async (inventoryhistoryId: bigint) => {
  const inventoryHistory = await prisma.inventoryHistory.findUnique({
    where: { revId: inventoryhistoryId, deleted: false },
  });
  return inventoryHistory;
};

export const getAllInventoryHistory = async () => {
  const allInventoryHistory = await prisma.inventoryHistory.findMany({
    where: { deleted: false },
  });
  return allInventoryHistory;
};
