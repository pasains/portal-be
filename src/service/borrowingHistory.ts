import {
  createBorrowingHistory,
  getAllBorrowingHistory,
  getBorrowingHistory,
} from "../repository/borrowingHistory";
import { BorrowingHistoryCreateParams } from "../types/borrowingHistory";

export const createBorrowingHistoryService = async (
  borrowingHistory: BorrowingHistoryCreateParams,
) => {
  const newBorrowingHistory = await createBorrowingHistory(borrowingHistory);
  return newBorrowingHistory;
};

export const getBorrowingHistoryService = async (revId: bigint) => {
  const BorrowingHistoryStatus = await getBorrowingHistory(revId);
  return BorrowingHistoryStatus;
};

export const getAllBorrowingHistoryService = async () => {
  const allBorrowingHistory = await getAllBorrowingHistory();
  return allBorrowingHistory;
};
