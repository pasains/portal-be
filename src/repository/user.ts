import { PrismaClient } from "@prisma/client";
import { UserCreateParams, UserUpdateParams } from "../types/user";

const prisma = new PrismaClient();

export const createUser = async (data: UserCreateParams) => {
  const newUser = await prisma.user.create({
    data: data,
  });
  return newUser;
};

export const updateUser = async (userId: number, data: UserUpdateParams) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: data,
  });
  return updatedUser;
};

export const patchUser = async (
  userId: number,
  op: string,
  field: string,
  value: string,
) => {
  const patchedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      [field]: op === "add" || op === "replace" ? value : null,
    },
  });
  return patchedUser;
};

export const deleteUser = async (userId: number) => {
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });
  return deletedUser;
};

export const getUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
};

export const getAllUser = async () => {
  const allUser = await prisma.user.findMany();
  return allUser;
};
