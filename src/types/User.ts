import { Role } from "@prisma/client";

export interface UserCreateParams {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profile: string;
  position: string;
  role: Role;
  isActive: boolean;
  createdBy: number;
}

export interface UserUpdateParams {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profile: string;
  position: string;
  role: Role;
  isActive: boolean;
  updatedAt: Date;
  updatedBy: number;
}
