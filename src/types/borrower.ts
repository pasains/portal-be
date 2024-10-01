export interface BorrowerCreateParams {
  id: number;
  borrowerName: string;
  organizationName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  createdBy: number;
}

export interface BorrowerUpdateParams {
  id: number;
  organizationName: string;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  updatedBy: number;
}
