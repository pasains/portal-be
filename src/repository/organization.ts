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
      organizationName: organization.organizationName,
      address: organization.address,
      organizationStatus: organization?.organizationStatus,
      note: organization?.note,
    },
  });
  return newOrganization;
};

export const checkOrganizationName = async (organization: {
  organizationName: string;
}) => {
  const newOrganization = await prisma.organization.findFirst({
    where: {
      organizationName: organization.organizationName,
    },
  });
  return newOrganization;
};


export const updateOrganization = async (
  organizationId: bigint,
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
  organizationId: bigint,
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

export const deleteOrganization = async (organizationId: bigint) => {
  const deletedOrganization = await prisma.organization.delete({
    where: { id: organizationId },
  });
  return deletedOrganization;
};

export const getOrganization = async (organizationId: bigint) => {
  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
  });
  return organization;
};

export const getAllOrganization = async () => {
  const allOrganization = await prisma.organization.findMany();
  return allOrganization;
};