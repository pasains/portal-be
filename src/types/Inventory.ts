export interface InventoryCreateParams {
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeId: number;
  createdBy: number;
}

export interface InventoryUpdateParams {
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeId: number;
  updatedAt: Date;
  updatedBy: number;
}
