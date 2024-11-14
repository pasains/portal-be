import prisma from "../configuration/db";
import { UserHistoryCreateParams } from "../types/userHistory";

export const createUserHistory = async (
  userHistory: UserHistoryCreateParams,
) => {
  const newUserHistory = await prisma.userHistory.create({
    data: {
      userId: userHistory?.userId,
      newData: userHistory?.newData,
      oldData: userHistory?.oldData,
    },
  });
  return newUserHistory;
};

export const getUserHistory = async (userHistoryId: bigint) => {
  const userHistory = await prisma.userHistory.findUnique({
    where: { id: userHistoryId, deleted: false },
  });
  return userHistory;
};

export const getAllUserHistory = async () => {
  const allUserHistory = await prisma.userHistory.findMany({
    where: { deleted: false },
  });
  return allUserHistory;
};
