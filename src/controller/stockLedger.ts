import { Request, Response } from "express";
import { Router } from "express";
import {
  createStockLedgerService,
  deleteStockLedgerService,
  getAllStockLedgerService,
  getStockLedgerService,
  updateStockLedgerService,
} from "../service/stockLedger";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const stockLedgerRouter = Router();

stockLedgerRouter.post(
  "/",
  body("stockLedgerId").optional().isNumeric(),
  body("quantity").isNumeric(),
  body("quantityAfterTransaction").isNumeric(),
  body("voucherType").isString().trim(),
  body("voucherName").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const stockLedger = await createStockLedgerService(req.body);
      res.send(
        normalize(
          "Stock Ledger created successfully",
          "OK",
          DataType.object,
          stockLedger,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

stockLedgerRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("stockLedgerId").optional().isNumeric(),
  body("quantity").isNumeric(),
  body("quantityAfterTransaction").isNumeric(),
  body("voucherType").isString().trim(),
  body("voucherName").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const stockLedger = await updateStockLedgerService(+id, req.body);
      res.send(
        normalize(
          "Stock Ledger updated successfully",
          "OK",
          DataType.object,
          stockLedger,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

stockLedgerRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      await deleteStockLedgerService(+id);
      res.status(200).json({ message: "Stock Ledger deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

stockLedgerRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const stockLedger = await getStockLedgerService(+id);
      if (stockLedger) {
        res.send(
          normalize(
            "Stock Ledger found successfully",
            "OK",
            DataType.object,
            stockLedger,
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

stockLedgerRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const stockLedger = await getAllStockLedgerService();
    res.send(
      normalize(
        "Stock Ledger found successfully",
        "OK",
        DataType.array,
        stockLedger,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
