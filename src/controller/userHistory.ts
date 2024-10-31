import { Request, Response } from "express";
import { Router } from "express";
import {
  getAllUserHistoryService,
  getUserHistoryService,
} from "../service/userHistory";

import { param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const userHistoryRouter = Router();

userHistoryRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const userHistory = await getUserHistoryService(id);
      if (userHistory) {
        res.send(
          normalize(
            "User History found successfully",
            "OK",
            DataType.object,
            userHistory,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize("User History not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

userHistoryRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const userHistory = await getAllUserHistoryService();
    res.send(
      normalize(
        "User History found successfully",
        "OK",
        DataType.array,
        userHistory,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
