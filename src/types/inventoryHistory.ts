export interface InventoryHistoryCreateParams {
  inventoryId: number;
  condition: string;
  image?: any;
}

export interface InventoryHistoryUpdateParams {
  id: number;
  inventoryId: number;
  condition: string;
  image: string;
  updatedBy: number;
}

export interface InventoryHistoryResponse {
  id: bigint;
  inventoryId: number;
  condition: string;
  image: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
