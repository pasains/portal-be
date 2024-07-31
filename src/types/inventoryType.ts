export interface InventoryTypeCreateParams {
  id: bigint;
  inventoryTypeName: string;
  description: string;
  createdBy: number;
  groupId: number;
}

export interface InventoryTypeUpdateParams {
  id : bigint;
  inventoryTypeName: string;
  description: string;
  updatedAt: Date;
  updatedBy: number;
  groupId: number;
}
