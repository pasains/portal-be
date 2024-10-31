export interface InventoryCreateParams {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  condition: string;
  note: string;
  url: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  descriptionInventoryType: string;
  currentQuantity: number;
  totalQuantity: number;
}

export interface InventoryUpdateParams {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  condition: string;
  note: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  descriptionInventoryType: string;
  currentQuantity: number;
  totalQuantity: number;
  updatedAt: Date;
  updatedBy: bigint;
}

export interface InventoryResponse {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
}

export interface InventoryDetailResponse {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  image: string;
  quantity: number;
  condition: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: bigint;
  updatedBy: bigint;
}

export function toInventoryResponse(data: any): InventoryResponse {
  return {
    id: data.id,
    inventoryName: data.inventoryName,
    refId: data.refId,
    description: data.description,
    isBorrowable: data.isBorrowable,
    inventoryTypeId: data.inventoryTypeIdRel.id,
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
    inventoryTypeId: data.inventoryTypeIdRel.id,
    inventoryTypeName: data.inventoryTypeIdRel.inventoryTypeName,
    //image: data.inventoryHistoryIdRel.map((images: any) => images.image),
    //condition: data.inventoryHistoryIdRel.map(
    //  (conditions: any) => conditions.condition,
    //),
    //quantity: data.inventoryStockIdRel.map(
    //  (quantities: any) => quantities.quantity,
    //),
    image: data.image,
    condition: data.condition,
    quantity: data.quantity,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  };
}

export function toInventoryDetailResponses(data: any): InventoryDetailResponse {
  return toInventoryDetailResponses(data);
}
