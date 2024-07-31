import { Document, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDocument = async (document: Document) => {
  const newDocument = await prisma.document.create({
    data: document,
  });
  return newDocument;
};

export const updateDocument = async (
  documentId: number,
  document: Document,
) => {
  const updatedDocument = await prisma.document.update({
    where: { id: documentId },
    data: document,
  });
  return updatedDocument;
};

export const deleteDocument = async (documentId: number) => {
  const deletedDocument = await prisma.document.delete({
    where: { id: documentId },
  });
  return deletedDocument;
};

export const getDocument = async (documentId: number) => {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  });
  return document;
};

export const getAllDocument = async () => {
  const allDocument = await prisma.document.findMany();
  return allDocument;
};
