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
  currentQuantity: number | undefined;
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
  note: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  url: string;
  currentQuantity: number;
  totalQuantity: number;
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
    note: data.note,
    url: data.url,
    condition: data.condition,
    currentQuantity: data.currentQuantity,
    totalQuantity: data.totalQuantity,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  };
}
