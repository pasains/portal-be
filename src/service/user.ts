import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  patchUser,
  updateUser,
} from "../repository/user";
import { UserCreateParams, UserUpdateParams } from "../types/user";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createUserService = async (data: UserCreateParams) => {
  const createdUser = await createUser(data);
  return createdUser;
};

export const updateUserService = async (
  userId: bigint,
  data: UserUpdateParams,
) => {
  const updatedUser = await updateUser(userId, data);
  return updatedUser;
};

export const patchUserService = async (
  userId: bigint,
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

export const deleteUserService = async (userId: bigint) => {
  const deletedUser = await deleteUser(userId);
  return deletedUser;
};

export const getUserService = async (userId: bigint) => {
  const user = await getUser(userId);
  return user;
};

export const getAllUserService = async () => {
  const allUser = await getAllUser();
  return allUser;
};
