export interface InventoryHistoryCreateParams {
  revId: bigint;
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  condition: string;
  note: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  createdAt: Date;
  createdBy: bigint;
  updatedAt: Date;
  updatedBy: bigint;
}

export interface InventoryHistoryResponse {
  id: bigint;
  inventoryId: bigint;
  condition: string;
  image: string;
  createdAt: Date;
  createdBy: bigint;
  updatedAt: Date;
  updatedBy: bigint;
}
