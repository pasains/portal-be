import { getUser } from "../repository/user";
import {
  createUserHistory,
  getAllUserHistory,
  getUserHistory,
} from "../repository/userHistory";
import {
  UserHistoryCreateParams,
} from "../types/userHistory";

export const createUserHistoryService = async (
  userHistory: UserHistoryCreateParams,
) => {
  if (userHistory.userId) {
    const userExists = await getUser(userHistory.userId)
    if (!userExists) {
      throw new Error("Invalid User Id")
    }
  }
  const newUserHistory = await createUserHistory({...userHistory,});
  return newUserHistory;
};

export const getUserHistoryService = async (userHistoryId: bigint) => {
  const userHistory = await getUserHistory(userHistoryId);
  return userHistory;
};

export const getAllUserHistoryService = async () => {
  const allUserHistory = await getAllUserHistory();
  return allUserHistory;
};
