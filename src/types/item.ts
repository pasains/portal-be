export interface ItemCreateParams {
  itemId: number;
  borrowingId: number;
  receivingId: number;
  inventoryId: number;
  quantity: number;
  preCondition: string;
  postCondition: string;
  createdBy: number;
}

export interface ItemUpdateParams {
  itemId: number;
  borrowingId: number;
  receivingId: number;
  inventoryId: number;
  quantity: number;
  preCondition: string;
  postCondition: string;
  updatedBy: number;
}
