import { cursorTo } from "readline";
import prisma from "../configuration/db";
import {
  OrganizationCreateParams,
  OrganizationUpdateParams,
} from "../types/organization";

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
    where: { id: organizationId, deleted: false },
  });
  return organization;
};

export const getAllOrganization = async (props: {
  page?: number;
  limit?: number;
}) => {
  const { page = 1, limit = 10 } = props;
  const allOrganization = await prisma.organization.findMany({
    where: { deleted: false },
    orderBy: { organizationName: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalOrganization = await prisma.organization.count({
    where: { deleted: false },
  });
  return {
    organization: allOrganization,
    currentPage: page,
    totalPage: Math.ceil(totalOrganization / limit),
  };
};
