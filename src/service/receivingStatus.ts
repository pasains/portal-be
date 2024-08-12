import { getReceiving } from "../repository/receiving";
import {
  createReceivingStatus,
  deleteReceivingStatus,
  getAllReceivingStatus,
  getReceivingStatus,
  updateReceivingStatus,
} from "../repository/receivingStatus";
import {
  ReceivingStatusCreateParams,
  ReceivingStatusUpdateParams,
} from "../types/receivingStatus";

export const createReceivingStatusService = async (
  receivingStatus: ReceivingStatusCreateParams,
) => {
  if (receivingStatus.receivingId) {
    const inventoryExists = await getReceiving(receivingStatus.receivingId)
    if (!inventoryExists) {
      throw new Error("Invalid Receiving Id")
    }
  }
  const newReceivingStatus = await createReceivingStatus({...receivingStatus,});
  return newReceivingStatus;
};

export const updateReceivingStatusService = async (
  receivingStatusId: number,
  receivingStatus: ReceivingStatusUpdateParams,
) => {
  if (receivingStatus.receivingId) {
    const inventoryExists = await getReceivingStatus(receivingStatus.receivingId)
    if (!inventoryExists) {
      throw new Error("Invalid Receiving Id")
    }
  }
  const updatedReceivingStatus = await updateReceivingStatus(receivingStatusId, receivingStatus);
  return updatedReceivingStatus;
};

export const deleteReceivingStatusService = async (receivingStatusId: number) => {
  const deletedReceivingStatus = await deleteReceivingStatus(receivingStatusId);
  return deletedReceivingStatus;
};

export const getReceivingStatusService = async (receivingStatusId: number) => {
  const receivingStatus = await getReceivingStatus(receivingStatusId);
  return receivingStatus;
};

export const getAllReceivingStatusService = async () => {
  const allReceivingStatus = await getAllReceivingStatus();
  return allReceivingStatus;
};
