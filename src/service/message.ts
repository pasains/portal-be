import {
  createMessage,
  deleteMessage,
  getAllMessage,
  getMessage,
  updateMessage,
} from "../repository/message";
import { MessageCreateParams } from "../types/message";

export const createMessageService = async (message: MessageCreateParams) => {
  const newMessage = await createMessage(message);
  return newMessage;
};

export const updateMessageService = async (
  messageId: bigint,
  message: MessageCreateParams,
) => {
  const updatedMessage = await updateMessage(messageId, message);
  return updatedMessage;
};

export const deleteMessageService = async (messageId: bigint) => {
  const deletedMessage = await deleteMessage(messageId);
  return deletedMessage;
};

export const getMessageService = async (messageId: bigint) => {
  const message = await getMessage(messageId);
  return message;
};

export const getAllMessageService = async () => {
  const allMessage = await getAllMessage();
  return allMessage;
};
