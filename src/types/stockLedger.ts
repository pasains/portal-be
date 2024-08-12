export interface StockLedgerCreateParams {
  id: number;
  inventoryId: number;
  quantity: number;
  quantityAfterTransaction: number;
  voucherType: string;
  voucherName: number;
  createdBy: number;
}

export interface StockLedgerUpdateParams {
  id: number;
  inventoryId: number;
  quantity: number;
  quantityAfterTransaction: number;
  voucherType: string;
  voucherName: number;
  updatedBy: number;
}
