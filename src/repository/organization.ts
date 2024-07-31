import { PrismaClient, Organization } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrganization = async (organization: Organization) => {
  const newOrganization = await prisma.organization.create({
    data: organization,
  });
  return newOrganization;
};

export const updateOrganization = async (
  organizationId: number,
  organization: Organization,
) => {
  const updatedOrganization = await prisma.organization.update({
    where: { id: organizationId },
    data: organization,
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
