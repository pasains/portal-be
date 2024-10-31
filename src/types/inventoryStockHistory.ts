export interface InventoryStockHistoryCreateParams {
  revId: bigint;
  id: bigint;
  inventoryId: bigint;
  currentQuantity: number;
  totalQuantity: number;
  createdBy: bigint;
}
