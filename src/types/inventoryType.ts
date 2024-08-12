export interface InventoryTypeCreateParams {
  id: number;
  inventoryTypeName: string;
  description: string;
  createdBy: number;
  groupId: number;
}

export interface InventoryTypeUpdateParams {
  id : number;
  inventoryTypeName: string;
  description: string;
  updatedAt: Date;
  updatedBy: number;
  groupId: number;
}
