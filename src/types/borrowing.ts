import { Status } from "@prisma/client";

export interface BorrowingCreateParams {
  id: bigint;
  borrowerId: bigint;
  organizationId: bigint;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  dueDate: Date;
  status: Status;
  specialInstruction: string;
}

export interface BorrowingUpdateParams {
  id: bigint;
  borrowerId: bigint;
  organizationId: bigint;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  dueDate: Date;
  status: Status;
  specialInstruction: string;
  updatedBy: bigint;
}
