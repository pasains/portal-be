export interface InventoryGroupCreateParams {
  id: number,
  inventoryGroupName: string;
  description: string;
  createdBy: number;
}

export interface InventoryGroupUpdateParams {
  id: number,
  inventoryGroupName: string;
  description: string;
  updatedBy: number;
}
