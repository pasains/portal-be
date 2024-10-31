export interface DocumentParams {
  id: bigint;
  url: string;
  inventoryId: bigint;
  createdBy: bigint | null;
  updatedBy: bigint | null;
  createdAt: Date;
  updatedAt: Date;
}
