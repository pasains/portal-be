import { User } from "@prisma/client";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../repository/user";

export const createUserService = async (user: User) => {
  const newUser = await createUser(user);
  return newUser;
};

export const updateUserService = async (user: User) => {
  const updatedUser = await updateUser(user);
  return updatedUser;
};

export const deleteUserService = async (userId: number) => {
  const deletedUser = await deleteUser(userId);
  return deletedUser;
};

export const getUserService = async (userId: number) => {
  const user = await getUser(userId);
  return user;
};

export const getAllUserService = async () => {
  const allUser = await getAllUser();
  return allUser;
};
