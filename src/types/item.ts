import { StatusItem } from "@prisma/client";

export interface ItemCreateParams {
  id: bigint;
  borrowingId: bigint;
  inventoryId: bigint;
  quantity: bigint;
  status: StatusItem;
  preCondition: string;
  postCondition: string;
}

export interface ItemUpdateParams {
  borrowingId: bigint;
  inventoryId: bigint;
  status: StatusItem;
  quantity: bigint;
  preCondition: string;
  postCondition: string;
  updatedBy: bigint;
}
