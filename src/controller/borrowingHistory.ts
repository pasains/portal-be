import { Request, Response } from "express";
import { Router } from "express";
import {
  getBorrowingHistoryService,
  getAllBorrowingHistoryService,
} from "../service/borrowingHistory";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const borrowingHistoryRouter = Router();

borrowingHistoryRouter.get(
  "/:revId",
  param("revId").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const borrowingHistory = await getBorrowingHistoryService(id);
      if (borrowingHistory) {
        res.send(
          normalize(
            "Borrowing Status found successfully",
            "OK",
            DataType.object,
            borrowingHistory,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize(
              "Borrowing Status not found",
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

borrowingHistoryRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const borrowingHistory = await getAllBorrowingHistoryService();
    res.send(
      normalize(
        "Borrowing Status found successfully",
        "OK",
        DataType.array,
        borrowingHistory,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
