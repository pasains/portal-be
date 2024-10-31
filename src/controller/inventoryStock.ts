import { Request, Response } from "express";
import { Router } from "express";
import {
  createInventoryStockService,
  deleteInventoryStockService,
  getAllInventoryStockService,
  getInventoryStockService,
  updateInventoryStockService,
} from "../service/inventoryStock";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const inventoryStockRouter = Router();

inventoryStockRouter.post(
  "/",
  body("quantity").isNumeric(),
  body("inventoryId").optional().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const inventoryStock = await createInventoryStockService(req.body);
      res.send(
        normalize(
          "Inventory Stock created successfully",
          "OK",
          DataType.object,
          inventoryStock,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryStockRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("quantity").isNumeric(),
  body("inventoryId").optional().isNumeric(),
  body("groupId").optional().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventoryStock = await updateInventoryStockService(id, req.body);
      res.send(
        normalize(
          "Inventory Stock updated successfully",
          "OK",
          DataType.object,
          inventoryStock,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryStockRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteInventoryStockService(id);
      res.status(200).json({ message: "Inventory Stock deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

inventoryStockRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventoryStock = await getInventoryStockService(id);
      if (inventoryStock) {
        res.send(
          normalize(
            "Inventory Stock found successfully",
            "OK",
            DataType.object,
            inventoryStock,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize("Inventory Stock not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryStockRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const inventoryStock = await getAllInventoryStockService();
    res.send(
      normalize(
        "Inventory Stock found successfully",
        "OK",
        DataType.array,
        inventoryStock,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
