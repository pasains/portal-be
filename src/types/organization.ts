export interface OrganizationCreateParams {
  id: bigint;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
}

export interface OrganizationUpdateParams {
  id: bigint;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  updatedBy: bigint;
}
