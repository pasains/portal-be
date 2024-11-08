import { Request, Response } from "express";
import { Router } from "express";
import {
  createInventoryHistoryService,
  getAllInventoryHistoryService,
  getInventoryHistoryService,
} from "../service/inventoryHistory";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const inventoryHistoryRouter = Router();

inventoryHistoryRouter.post(
  "/",
  body("id").isNumeric(),
  body("inventoryName").isString().trim(),
  body("refId").isString().trim(),
  body("description").isString().trim(),
  body("condition").isString().trim(),
  body("note").isString().trim(),
  body("isBorrowable").isBoolean(),
  body("url").isURL().isArray(),
  body("currentQuantity").isNumeric(),
  body("totalQuantity").isNumeric(),
  body("inventoryTypeName").isString().trim(),
  body("descriptionInventoryType").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const inventoryHistory = await createInventoryHistoryService(req.body);
      res.send(
        normalize(
          "Inventory History created successfully",
          "OK",
          DataType.object,
          inventoryHistory,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryHistoryRouter.get(
  "/:revId",
  param("revId").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventoryHistory = await getInventoryHistoryService(id);
      if (inventoryHistory) {
        res.send(
          normalize(
            "Inventory History found successfully",
            "OK",
            DataType.object,
            inventoryHistory,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize(
              "Inventory History not found",
              "ERROR",
              DataType.null,
              null,
            ),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryHistoryRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const inventoryHistory = await getAllInventoryHistoryService();
    res.send(
      normalize(
        "Inventory History found successfully",
        "OK",
        DataType.array,
        inventoryHistory,
      ),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});
