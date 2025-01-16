import { Status, StatusItem } from "@prisma/client";

export interface BorrowingCreateParams {
  id: bigint;
  dueDate: Date;
  borrowingStatus: Status;
  specialInstruction: string;
  borrowerId: bigint;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationId: bigint;
  organizationName: string;
  address: string;
  organizationStatus: string;
  invoiceNumber?: string;
  note: string;
  items: {
    quantity: number;
    status: StatusItem;
    inventoryId: bigint;
  }[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: bigint;
  updatedBy: bigint;
}

export interface BorrowingUpdateParams {
  id: bigint;
  borrowerId: bigint;
  organizationId: bigint;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  dueDate: Date;
  status: Status;
  specialInstruction: string;
  updatedBy: bigint;
}

//BORROWING PARAMS//
export interface BorrowingResponse {
  id: bigint;
  borrowerId: bigint;
  organizationId: bigint;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  invoiceNumber: string;
  phoneNumber: string;
  organizationName: string;
  address: string;
  dueDate: Date;
  status: Status;
  specialInstruction: string;
}

export function toBorrowingResponse(data: any): BorrowingResponse {
  return {
    id: data.id,
    borrowerId: data.borrowerId,
    borrowerName: data.borrowerIdRel.borrowerName,
    identityCard: data.borrowerIdRel.identityCard,
    identityNumber: data.borrowerIdRel.identityNumber,
    phoneNumber: data.borrowerIdRel.phoneNumber,
    organizationId: data.borrowerIdRel.organizationId,
    invoiceNumber: data?.invoiceNumber,
    organizationName:
      data.borrowerIdRel.borrowerOrganizationRel.organizationName,
    address: data.borrowerIdRel.borrowerOrganizationRel.address,
    dueDate: data.dueDate,
    status: data.status,
    specialInstruction: data.specialInstruction,
  };
}

export function toBorrowingResponses(data: any[]): BorrowingResponse[] {
  return data.map((item) => {
    return toBorrowingResponse(item);
  });
}
//BORROWING PARAMS//

//BORROWING DETAIL PARAMS//
export interface BorrowingDetailResponse {
  id: bigint;
  invoiceNumber: string;
  dueDate: undefined;
  status: Status;
  specialInstruction: string;
  borrowerId: bigint;
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
export function toBorrowingDetailResponse(data: any): BorrowingDetailResponse {
  return {
    id: data.id,
    dueDate: data.dueDate,
    status: data.status,
    specialInstruction: data.specialInstruction,
    borrowerId: data.borrowerIdRel.id,
    borrowerName: data.borrowerIdRel.borrowerName,
    identityCard: data.borrowerIdRel.identityCard,
    identityNumber: data.borrowerIdRel.identityNumber,
    phoneNumber: data.borrowerIdRel.phoneNumber,
    organizationId: data.borrowerIdRel.borrowerOrganizationRel.id,
    organizationName:
      data.borrowerIdRel.borrowerOrganizationRel.organizationName,
    address: data.borrowerIdRel.borrowerOrganizationRel.address,
    organizationStatus:
      data.borrowerIdRel.borrowerOrganizationRel.organizationStatus,
    note: data.borrowerIdRel.borrowerOrganizationRel.note,
    invoiceNumber: data?.invoiceNumber,
    createdAt: data.createdAt,
    createdBy: data.createdBy,
    updatedAt: data.updatedAt,
    updatedBy: data.updatedBy,
  };
}
//BORROWING DETAIL PARAMS//
