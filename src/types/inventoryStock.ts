export interface InventoryStockCreateParams {
  id: number;
  inventoryId: number;
  quantity: number;
  createdBy: number;
}

export interface InventoryStockUpdateParams {
  id: number;
  inventoryId: number;
  quantity: number;
  updatedBy: number;
}
