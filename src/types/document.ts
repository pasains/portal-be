export interface DocumentParams {
  id: bigint;
  url: string;
  inventoryId: bigint;
  deleted: boolean;
  createdBy: bigint | null;
  updatedBy: bigint | null;
  createdAt: Date;
  updatedAt: Date;
}
