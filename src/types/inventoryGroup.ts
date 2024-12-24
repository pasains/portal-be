export interface InventoryGroupCreateParams {
  id: bigint;
  inventoryGroupName: string;
  description: string;
  createdBy: bigint;
}

export interface InventoryGroupUpdateParams {
  id: bigint;
  inventoryGroupName: string;
  description: string;
  updateAt: Date;
  updatedBy: bigint;
}
