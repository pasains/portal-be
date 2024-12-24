import { StatusItem } from "@prisma/client";

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
  status: StatusItem;
  preCondition: string;
}

export interface InventoryResponse {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  currentQuantity: number;
}

export interface InventoryDetailResponse {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  note: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  url: string;
  currentQuantity: bigint;
  totalQuantity: bigint;
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
    currentQuantity: data.inventoryStockIdRel?.currentQuantity,
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
    note: data.note,
    condition: data.condition,
    currentQuantity: data.inventoryStockIdRel?.[0]?.currentQuantity,
    totalQuantity: data.inventoryStockIdRel?.[0]?.currentQuantity,
    url: data.documentIdRel?.[0]?.url || null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  };
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
  url: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: bigint;
}
