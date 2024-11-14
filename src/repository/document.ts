import { Document } from "@prisma/client";
import prisma from "../configuration/db";

export const createDocument = async (document: Document) => {
  const newDocument = await prisma.document.create({
    data: document,
  });
  return newDocument;
};

export const updateDocument = async (
  documentId: bigint,
  document: Document,
) => {
  const updatedDocument = await prisma.document.update({
    where: { id: documentId },
    data: document,
  });
  return updatedDocument;
};

export const deleteDocument = async (documentId: bigint) => {
  const deletedDocument = await prisma.document.delete({
    where: { id: documentId },
  });
  return deletedDocument;
};

export const getDocument = async (documentId: bigint) => {
  const document = await prisma.document.findUnique({
    where: { id: documentId, deleted: false },
  });
  return document;
};

export const getAllDocument = async () => {
  const allDocument = await prisma.document.findMany({
    where: { deleted: false },
  });
  return allDocument;
};
