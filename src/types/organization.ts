export interface OrganizationCreateParams {
  id: number;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  createdBy: number;
}

export interface OrganizationUpdateParams {
  id: number;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  updatedBy: number;
}
