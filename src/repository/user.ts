import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (user: User) => {
  const newUser = await prisma.user.create({
    data: user,
  });
  return newUser;
};

export const updateUser = async (user: User) => {
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: user,
  });
  return updatedUser;
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
