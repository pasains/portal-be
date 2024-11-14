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

export interface BorrowerDetailResponse {
  id: bigint;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationId: bigint;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: bigint;
  updatedBy: bigint;
}

export function toBorrowerDetailResponse(data: any): BorrowerDetailResponse {
  return {
    id: data.id,
    borrowerName: data.borrowerName,
    identityCard: data.identityCard,
    identityNumber: data.identityNumber,
    phoneNumber: data.phoneNumber,
    organizationId: data.borrowerOrganizationRel.id,
    organizationName: data.borrowerOrganizationRel.organizationName,
    address: data.borrowerOrganizationRel.address,
    organizationStatus: data.borrowerOrganizationRel.organizationStatus,
    note: data.borrowerOrganizationRel.note,
    createdAt: data.createdAt,
    createdBy: data.createdBy,
    updatedAt: data.updatedAt,
    updatedBy: data.updatedBy,
  };
}
