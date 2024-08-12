export interface BorrowingCreateParams {
  id: number;
  borrowerId: number;
  borrowingStatusId: number;
  organizationId: number;
  dueDate: Date;
  specialInstruction: string;
  createdBy: number;
}

export interface BorrowingUpdateParams {
  id: number;
  borrowerId: number;
  borrowingStatusId: number;
  organizationId: number;
  dueDate: Date;
  specialInstruction: string;
  updatedBy: number;
}
