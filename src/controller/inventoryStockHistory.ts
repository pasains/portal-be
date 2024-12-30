import { Request, Response } from "express";
import { Router } from "express";
import {
  getInventoryStockHistoryService,
  getAllInventoryStockHistoryService,
} from "../service/inventoryStockHistory";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const inventoryStockHistoryRouter = Router();

inventoryStockHistoryRouter.get(
  "/:revId",
  param("revId").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventoryStockHistory = await getInventoryStockHistoryService(id);
      if (inventoryStockHistory) {
        res.send(
          normalize(
            "Stock Ledger found successfully",
            "OK",
            DataType.object,
            inventoryStockHistory,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize("Stock Ledger not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryStockHistoryRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const inventoryStockHistory = await getAllInventoryStockHistoryService();
    res.send(
      normalize(
        "Stock Ledger found successfully",
        "OK",
        DataType.array,
        inventoryStockHistory,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
