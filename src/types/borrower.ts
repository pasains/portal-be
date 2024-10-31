export interface BorrowerCreateParams {
  id: bigint;
  borrowerName: string;
  organizationId: bigint;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
}

export interface BorrowerUpdateParams {
  id: bigint;
  borrowerName: string;
  organizationId: bigint;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  updatedBy: bigint;
}
