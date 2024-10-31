export interface InventoryHistoryCreateParams {
  revId: bigint;
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  condition: string;
  note: string;
  url: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  descriptionInventoryType: string;
  currentQuantity: number;
  totalQuantity: number;
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
