import {
  createDocument,
  deleteDocument,
  getAllDocument,
  getDocument,
  updateDocument,
} from "../repository/document";

import {
  DocumentParams
} from "../types/document";

export const createDocumentService = async (
  document: DocumentParams,
) => {
  const newDocument = await createDocument(document);
  return newDocument;
};

export const updateDocumentService = async (
  documentId: bigint,
  document: DocumentParams,
) => {
  const updatedDocument = await updateDocument(
    documentId,
    document,
  );
  return updatedDocument;
};

export const deleteDocumentService = async (documentId: bigint) => {
  const deletedDocument = await deleteDocument(documentId);
  return deletedDocument;
};

export const getDocumentService = async (documentId: bigint) => {
  const document = await getDocument(documentId);
  return document;
};

export const getAllDocumentService = async () => {
  const allDocument = await getAllDocument();
  return allDocument;
};
