import { Request, Response } from "express";
import { Router } from "express";
import {
  createItemService,
  deleteItemService,
  getAllItemService,
  getItemService,
  patchItemService,
  updateAllItemService,
  updateItemService,
} from "../service/item";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";
import { toItemDetailResponse, toItemResponses } from "../types/item";

export const itemRouter = Router();
const StatusInput = ["IN", "OUT"];
const StatusInputBorrowing = ["DONE", "PENDING"];

itemRouter.post(
  "/create",
  body("borrowingId").optional().isNumeric(),
  body("inventoryId").optional().isNumeric(),
  body("quantity").isNumeric(),
  body("status").isString().trim(),
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
  "/updateall/:borrowingId",
  body("items").isArray(),
  body("items.*.id").isNumeric(),
  body("items.*.status").isString().trim(),
  body("items.*.postCondition").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const borrowingId = BigInt(req.params.borrowingId);
    try {
      const item = await updateAllItemService(borrowingId, req.body);
      res.send(
        normalize("Item updated successfully", "OK", DataType.object, item),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

itemRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("quantity").isNumeric(),
  body("status").isString().isIn(StatusInput),
  body("preCondition").isString().trim(),
  body("inventoryName").isString().trim(),
  body("refId").isString().trim(),
  body("postCondition").isString().trim(),
  body("inventoryTypeName").isString().trim(),
  body("statusBorrowing").isString().isIn(StatusInputBorrowing),
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
          normalize(
            "Item found successfully",
            "OK",
            DataType.object,
            toItemDetailResponse(item),
          ),
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
    let borrowingId = null;
    const page = _req.query.page ? parseInt(_req.query.page as string, 10) : 1;
    const limit = _req.query.limit
      ? parseInt(_req.query.limit as string, 10)
      : 10;
    const search = _req.query.search ? String(_req.query.search) : undefined;
    if (_req.query.borrowingId && !Number.isNaN(_req.query.borrowingId)) {
      borrowingId = BigInt(_req.query.borrowingId as string);
    }
    const { items, currentPage, totalPage } = await getAllItemService({
      borrowingId,
      page,
      limit,
      search
    });

    res.send(
      normalize("Item found successfully", "OK", DataType.array, {
        item: toItemResponses(items),
        currentPage,
        totalPage,
      }),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
