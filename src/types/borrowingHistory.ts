import { Status } from "@prisma/client";

export interface BorrowingHistoryCreateParams {
  revId: bigint;
  id: bigint;
  borrowerId: bigint;
  dueDate: Date;
  status: Status;
  specialInstruction: string;
}
