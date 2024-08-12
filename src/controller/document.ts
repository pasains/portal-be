import { Request, Response } from "express";
import { Router } from "express";
import {
  createDocumentService,
  deleteDocumentService,
  getAllDocumentService,
  getDocumentService,
  updateDocumentService,
} from "../service/document";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const documentRouter = Router();

documentRouter.post(
  "/",
  body("url").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const document = await createDocumentService(req.body);
      res.send(
        normalize(
          "Document created successfully",
          "OK",
          DataType.object,
          document,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

documentRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("url").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const document = await updateDocumentService(+id, req.body);
      res.send(
        normalize(
          "Document updated successfully",
          "OK",
          DataType.object,
          document,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

documentRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      await deleteDocumentService(+id);
      res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

documentRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const document = await getDocumentService(+id);
      if (document) {
        res.send(
          normalize(
            "Document found successfully",
            "OK",
            DataType.object,
            document,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize("Document not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

documentRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const document = await getAllDocumentService();
    res.send(
      normalize(
        "Document found successfully",
        "OK",
        DataType.array,
        document,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
