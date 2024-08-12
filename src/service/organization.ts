import {
  createOrganization,
  deleteOrganization,
  getAllOrganization,
  getOrganization,
  patchOrganization,
  updateOrganization,
} from "../repository/organization";
import {
  OrganizationCreateParams,
  OrganizationUpdateParams,
} from "../types/organization";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createOrganizationService = async (organization: OrganizationCreateParams) => {
  const newOrganization = await createOrganization(organization);
  return newOrganization;
};

export const updateOrganizationService = async (
  organizationId: number,
  organization: OrganizationUpdateParams,
) => {
  const updatedOrganization = await updateOrganization(organizationId, organization);
  return updatedOrganization;
};

export const patchOrganizationService = async (
  organizationId: number,
  operation: {
    op: string;
    path: string;
    value: string;
  },
) => {
  const { op, path, value } = operation;
  const field = path.split("/").pop();
  if (field === undefined) {
    throw new Error("Invalid field");
  }
  try {
    const patchedOrganization = await patchOrganization(organizationId, op, field, value);
    return patchedOrganization;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteOrganizationService = async (organizationId: number) => {
  const deletedOrganization = await deleteOrganization(organizationId);
  return deletedOrganization;
};

export const getOrganizationService = async (organizationId: number) => {
  const organization = await getOrganization(organizationId)
  return organization;
};

export const getAllOrganizationService = async () => {
  const allOrganization = await getAllOrganization();
  return allOrganization;
};
