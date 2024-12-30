import {
  getAllBorrowingHistory,
  getBorrowingHistory,
} from "../repository/borrowingHistory";

export const getBorrowingHistoryService = async (revId: bigint) => {
  const BorrowingHistoryStatus = await getBorrowingHistory(revId);
  return BorrowingHistoryStatus;
};

export const getAllBorrowingHistoryService = async () => {
  const allBorrowingHistory = await getAllBorrowingHistory();
  return allBorrowingHistory;
};
