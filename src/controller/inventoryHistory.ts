import { Request, Response } from "express";
import { Router } from "express";
import {
  createInventoryHistoryService,
  deleteInventoryHistoryService,
  getAllInventoryHistoryService,
  getInventoryHistoryService,
  updateInventoryHistoryService,
} from "../service/inventoryHistory";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const inventoryHistoryRouter = Router();

inventoryHistoryRouter.post(
  "/",
  body("inventoryId").optional().isNumeric(),
  body("condition").isString().trim(),
  body("image").isString().trim(),
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

inventoryHistoryRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("inventoryId").optional().isNumeric(),
  body("condition").isString().trim(),
  body("image").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const inventoryHistory = await updateInventoryHistoryService(
        +id,
        req.body,
      );
      res.send(
        normalize(
          "Inventory History updated successfully",
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

inventoryHistoryRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      await deleteInventoryHistoryService(+id);
      res
        .status(200)
        .json({ message: "Inventory History deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

inventoryHistoryRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const inventoryHistory = await getInventoryHistoryService(+id);
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
