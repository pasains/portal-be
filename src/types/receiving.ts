export interface ReceivingCreateParams {
  id: number;
  userId: number;
  notes: string;
  status: string;
  createdBy: number;
}

export interface ReceivingUpdateParams {
  id: number;
  userId: number;
  notes: string;
  status: string;
  updatedBy: number;
}
