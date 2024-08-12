import { PrismaClient } from "@prisma/client";
import {
  OrganizationCreateParams,
  OrganizationUpdateParams,
} from "../types/organization";

const prisma = new PrismaClient();

export const createOrganization = async (
  organization: OrganizationCreateParams,
) => {
  const newOrganization = await prisma.organization.create({
    data: {
      organizationName: organization?.organizationName,
      address: organization?.address,
      organizationStatus: organization?.organizationStatus,
      note: organization?.note,
    },
  });
  return newOrganization;
};

export const updateOrganization = async (
  organizationId: number,
  organization: OrganizationUpdateParams,
) => {
  const updatedOrganization = await prisma.organization.update({
    where: { id: organizationId },
    data: {
      organizationName: organization?.organizationName,
      address: organization?.address,
      organizationStatus: organization?.organizationStatus,
      note: organization?.note,
    },
  });
  return updatedOrganization;
};
export const patchOrganization = async (
  organizationId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedOrganization = await prisma.organization.update({
    where: { id: organizationId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedOrganization;
};

export const deleteOrganization = async (organizationId: number) => {
  const deletedOrganization = await prisma.organization.delete({
    where: { id: organizationId },
  });
  return deletedOrganization;
};

export const getOrganization = async (organizationId: number) => {
  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
  });
  return organization;
};

export const getAllOrganization = async () => {
  const allOrganization = await prisma.organization.findMany();
  return allOrganization;
};
