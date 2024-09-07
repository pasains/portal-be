export interface InventoryCreateParams {
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeId: number;
}

export interface InventoryUpdateParams {
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeId: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface InventoryResponse {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeName: string;
}

export interface InventoryDetailResponse {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeName: string;
  image: string;
  quantity: number;
  condition: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export function toInventoryResponse(data: any): InventoryResponse {
  return {
    id: data.id,
    inventoryName: data.inventoryName,
    refId: data.refId,
    description: data.description,
    isBorrowable: data.isBorrowable,
    inventoryTypeName: data.inventoryTypeIdRel.inventoryTypeName,
  };
}

export function toInventoryResponses(data: any[]): InventoryResponse[] {
  return data.map((item) => {
    return toInventoryResponse(item);
  });
}

export function toInventoryDetailResponse(data: any): InventoryDetailResponse {
  return {
    id: data.id,
    inventoryName: data.inventoryName,
    refId: data.refId,
    description: data.description,
    isBorrowable: data.isBorrowable,
    inventoryTypeName: data.inventoryTypeIdRel.inventoryTypeName,
    image: data.inventoryHistoryIdRel.map((images: any) => images.image),
    condition: data.inventoryHistoryIdRel.map(
      (conditions: any) => conditions.condition,
    ),
    quantity: data.inventoryStockIdRel.map(
      (quantities: any) => quantities.quantity,
    ),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  };
}

export function toInventoryDetailResponses(data: any): InventoryDetailResponse {
  return toInventoryDetailResponses(data);
}
