export interface BorrowingStatusCreateParams {
  id: number;
  itemId: number;
  inventoryId: number;
  status: string;
  createdBy: number;
}

export interface BorrowingStatusUpdateParams {
  id: number;
  itemId: number;
  inventoryId: number;
  status: string;
  updatedBy: number;
}
