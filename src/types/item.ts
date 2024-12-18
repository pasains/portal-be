import { Status, StatusItem } from "@prisma/client";

export interface ItemCreateParams {
  id: bigint;
  borrowingId: bigint;
  inventoryId: bigint;
  quantity: number;
  status: StatusItem;
  preCondition: string;
  postCondition: string;
}

export interface ItemBorrowingCreateParams {
  id: bigint;
  borrowingId: bigint;
  inventoryId: bigint[];
}

export interface ItemUpdateParams {
  id: bigint;
  borrowingId: bigint;
  inventoryName: string;
  refId: string;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  inventoryId: bigint;
  status: StatusItem;
  statusBorrowing: Status;
  quantity: number;
  preCondition: string;
  postCondition: string;
}

export interface ItemUpdateAllParams {
  items: {
    id: bigint;
    status: StatusItem;
    postCondition: string;
    quantity: number;
  }[];
}

export interface ItemResponse {
  id: bigint;
  inventoryId: bigint;
  borrowingId: bigint;
  inventoryName: string;
  status: StatusItem;
  quantity: number;
  preCondition: string;
  postCondition: string;
}

export interface ItemDetailResponse {
  id: bigint;
  borrowingId: bigint;
  inventoryId: bigint;
  inventoryName: string;
  refId: string;
  inventoryTypeId: bigint;
  inventoryTypeName: string;
  status: StatusItem;
  quantity: number;
  preCondition: string;
  postCondition: string;
  statusBorrowing: Status;
  createdAt: Date;
  updatedAt: Date;
  createdBy: bigint;
  updatedBy: bigint;
}

export function toItemResponse(data: any): ItemResponse {
  return {
    id: data.id,
    borrowingId: data.itemBorrowingIdRel?.id,
    inventoryId: data.itemInventoryIdRel?.id,
    inventoryName: data.itemInventoryIdRel.inventoryName,
    status: data.status,
    quantity: data.quantity,
    preCondition: data.itemInventoryIdRel.condition || null,
    postCondition: data.postCondition || null,
  };
}

export function toItemResponses(data: any[]): ItemDetailResponse[] {
  return data.map((item) => {
    return toItemDetailResponse(item);
  });
}

export function toItemDetailResponse(data: any): ItemDetailResponse {
  return {
    id: data.id,
    borrowingId: data.itemBorrowingIdRel.id,
    inventoryId: data.itemInventoryIdRel.id,
    inventoryName: data.itemInventoryIdRel.inventoryName,
    refId: data.itemInventoryIdRel.refId,
    inventoryTypeId: data.itemInventoryIdRel.inventoryTypeIdRel.inventoryTypeId,
    inventoryTypeName:
      data.itemInventoryIdRel.inventoryTypeIdRel.inventoryTypeName,
    status: data.status,
    quantity: data.quantity,
    preCondition: data.itemInventoryIdRel.condition,
    postCondition: data.postCondition,
    statusBorrowing: data.itemBorrowingIdRel.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  };
}
