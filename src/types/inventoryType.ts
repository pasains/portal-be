export interface InventoryTypeCreateParams {
  id: bigint;
  inventoryTypeName: string;
  description: string;
  groupId?: bigint;
}

export interface InventoryTypeUpdateParams {
  id: bigint;
  inventoryTypeName: string;
  description: string;
  updatedAt: Date;
  updatedBy: number;
  groupId: bigint;
}
