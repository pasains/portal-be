import { MessageCreateParams } from "@pasains/types/message";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMessage = async (message: MessageCreateParams) => {
  const newMessage = await prisma.message.create({
    data: {
      name: message.name,
      organization: message.organization,
      email: message.email,
      comment: message.comment,
    },
  });
  return newMessage;
};

export const updateMessage = async (
  messageId: bigint,
  message: MessageCreateParams,
) => {
  const updatedMessage = await prisma.message.update({
    where: { id: messageId },
    data: {
      name: message?.name,
      organization: message?.organization,
      email: message?.email,
      comment: message?.comment,
    },
  });
  return updatedMessage;
};

export const deleteMessage = async (messageId: bigint) => {
  const deletedMessage = await prisma.message.delete({
    where: { id: messageId },
  });
  return deletedMessage;
};

export const getMessage = async (messageId: bigint) => {
  const message = await prisma.borrower.findUnique({
    where: { id: messageId },
  });
  return message;
};

export const getAllMessage = async () => {
  const allMessage = await prisma.message.findMany();
  return allMessage;
};
