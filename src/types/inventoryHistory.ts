export interface InventoryHistoryCreateParams {
  id: number;
  inventoryId: number;
  condition: string;
  image: string;
  createdBy: number;
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

