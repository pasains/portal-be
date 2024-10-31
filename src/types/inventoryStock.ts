export interface InventoryStockCreateParams {
  id: bigint;
  inventoryId: bigint;
  currentQuantity: number;
  totalQuantity: number;
  createdBy: bigint;
}

export interface InventoryStockUpdateParams {
  id: bigint;
  inventoryId: bigint;
  currentQuantity: number;
  totalQuantity: number;
  updatedBy: bigint;
}
