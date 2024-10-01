export interface BorrowingCreateParams {
  id: number;
  borrowerId?: bigint;
  organizationId?: bigint;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  dueDate: Date;
  specialInstruction: string;
  createdBy: number;
}

export interface BorrowingUpdateParams {
  id: number;
  borrowerId: number;
  organizationId: number;
  dueDate: Date;
  specialInstruction: string;
  updatedBy: number;
}
