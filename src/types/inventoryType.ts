export interface InventoryTypeCreateParams {
  id: bigint;
  inventoryTypeName: string;
  description: string;
  createdBy: number;
}

export interface InventoryTypeUpdateParams {
  id : bigint;
  inventoryTypeName: string;
  description: string;
  updatedAt: Date;
  updatedBy: number;
}
