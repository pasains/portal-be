export interface InventoryTypeCreateParams {
  id: bigint;
  inventoryTypeName: string;
  description: string;
}

export interface InventoryTypeUpdateParams {
  id: bigint;
  inventoryTypeName: string;
  description: string;
  updatedAt: Date;
  updatedBy: number;
}
