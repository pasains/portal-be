export interface InventoryHistoryCreateParams {
  id: number,
  inventoryId: number;
  condition: string;
  image: string;
  createdBy: number;
}

export interface InventoryHistoryUpdateParams {
  id: number,
  inventoryId: number;
  condition: string;
  image: string;
  updatedBy: number;
}
