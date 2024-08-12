import { PrismaClient } from "@prisma/client";
import { UserHistoryCreateParams } from "../types/userHistory";

const prisma = new PrismaClient();

export const createUserHistory = async (
  userHistory: UserHistoryCreateParams,
) => {
  const newUserHistory = await prisma.userHistory.create({
    data: {
      userId: userHistory?.userId,
      newData: userHistory?.newDataJSON,
      oldData: userHistory?.oldDataJSON,
    },
  });
  return newUserHistory;
};

export const getUserHistory = async (userHistoryId: number) => {
  const userHistory = await prisma.userHistory.findUnique({
    where: { id: userHistoryId },
  });
  return userHistory;
};

export const getAllUserHistory = async () => {
  const allUserHistory = await prisma.userHistory.findMany();
  return allUserHistory;
};
