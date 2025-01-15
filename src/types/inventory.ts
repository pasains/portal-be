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
  inventoryGroupId: bigint;
  inventoryGroupName: string;
  descriptionInventoryGroup: string;
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
  inventoryGroupId: bigint;
  inventoryGroupName: string;
  descriptionInventoryGroup: string;
  currentQuantity: number;
  url: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: bigint;
}

// INVENTORY RESPONSE//
export interface InventoryResponse {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  inventoryGroupId: bigint;
  inventoryGroupName: string;
  currentQuantity: number;
  totalQuantity: number;
}

export function toInventoryResponse(data: any): InventoryResponse {
  return {
    id: data.id,
    inventoryName: data.inventoryName,
    refId: data.refId,
    description: data.description,
    isBorrowable: data.isBorrowable,
    inventoryTypeId: data.inventoryTypeIdRel.id,
    currentQuantity: data.inventoryStockIdRel?.[0]?.currentQuantity,
    totalQuantity: data.inventoryStockIdRel?.[0]?.totalQuantity,
    inventoryTypeName: data.inventoryTypeIdRel.inventoryTypeName,
    inventoryGroupId: data.inventoryGroupIdRel.id,
    inventoryGroupName: data.inventoryGroupIdRel.inventoryGroupName,
  };
}

export function toInventoryResponses(data: any[]): InventoryResponse[] {
  return data.map((item) => {
    return toInventoryResponse(item);
  });
}
// INVENTORY RESPONSE//

// INVENTORY DETAIL RESPONSE//
export interface InventoryDetailResponse {
  id: bigint;
  inventoryName: string;
  refId: string;
  description: string;
  note: string;
  isBorrowable: boolean;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  inventoryGroupId: bigint;
  inventoryGroupName: string;
  url: string;
  currentQuantity: bigint;
  totalQuantity: bigint;
  condition: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: bigint;
  updatedBy: bigint;
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
    inventoryGroupId: data.inventoryGroupIdRel.inventoryGroupId,
    inventoryGroupName: data.inventoryGroupIdRel.inventoryGroupName,
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
// INVENTORY DETAIL RESPONSE//

// INVENTORY BY BORROWING RESPONSE//
export interface InventoryBorrowingResponse {
  id: bigint;
  borrowerName: string;
  address: string;
  organizationName: string;
  status: string;
  createdAt: Date;
}

export function toInventoryBorrowingResponse(
  data: any,
): InventoryBorrowingResponse {
  return {
    id: data.id,
    borrowerName: data.borrowerIdRel.borrowerName,
    organizationName:
      data.borrowerIdRel.borrowerOrganizationRel.organizationName,
    address: data.borrowerIdRel.borrowerOrganizationRel.address,
    status: data.status,
    createdAt: data.createdAt,
  };
}

export function toInventoryBorrowingResponses(
  data: any[],
): InventoryBorrowingResponse[] {
  return data.map((item) => {
    return toInventoryBorrowingResponse(item);
  });
}
// INVENTORY BY BORROWING RESPONSE//
