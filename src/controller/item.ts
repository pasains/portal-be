import { Request, Response } from "express";
import { Router } from "express";
import {
  createItemService,
  deleteItemService,
  getAllItemService,
  getItemService,
  patchItemService,
  updateItemService,
} from "../service/item";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const itemRouter = Router();

itemRouter.post(
  "/",
  body("borrowingId").optional().isNumeric(),
  body("receivingId").optional().isNumeric(),
  body("inventoryId").optional().isNumeric(),
  body("quantity").isNumeric(),
  body("preCondition").isString().trim(),
  body("postCondition").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const item = await createItemService(req.body);
      res.send(
        normalize("Item created successfully", "OK", DataType.object, item),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

itemRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("borrowingId").optional().isNumeric(),
  body("receivingId").optional().isNumeric(),
  body("inventoryId").optional().isNumeric(),
  body("quantity").isNumeric(),
  body("preCondition").isString().trim(),
  body("postCondition").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const item = await updateItemService(id, req.body);
      res.send(
        normalize("Item updated successfully", "OK", DataType.object, item),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

itemRouter.patch(
  "/:id",
  param("id").isNumeric().trim(),
  body("op").isIn(["add", "remove", "replace"]),
  body("path").isString().trim(),
  body("value").optional().isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const item = await patchItemService(id, req.body);
      res.send(item);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal service error" });
    }
  },
);

itemRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteItemService(id);
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

itemRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const item = await getItemService(id);
      if (item) {
        res.send(
          normalize("Item found successfully", "OK", DataType.object, item),
        );
      } else {
        res
          .status(400)
          .json(normalize("Item not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

itemRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const item = await getAllItemService();
    res.send(normalize("Item found successfully", "OK", DataType.array, item));
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
