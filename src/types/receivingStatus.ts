export interface ReceivingStatusCreateParams {
  id: number;
  receivingId: number;
  status: string;
  createdBy: number;
}

export interface ReceivingStatusUpdateParams {
  id: number;
  receivingId: number;
  status: string;
  updatedBy: number;
}
