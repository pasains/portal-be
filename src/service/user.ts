import { User } from "@prisma/client";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  patchUser,
  updateUser,
} from "../repository/user";
import { UserCreateParams, UserUpdateParams } from "../types/User";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createUserService = async (data: UserCreateParams) => {
  const newUser = await createUser(data);
  return newUser;
};

export const updateUserService = async (
  userId: number,
  data: UserUpdateParams,
) => {
  const updatedUser = await updateUser(userId, data);
  return updatedUser;
};

export const patchUserService = async (
  userId: number,
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
    const patchedUser = await patchUser(userId, op, field, value);
    return patchedUser;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
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
