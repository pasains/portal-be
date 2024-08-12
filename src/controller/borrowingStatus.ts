import { Request, Response } from "express";
import { Router } from "express";
import {
  createBorrowingStatusService,
  deleteBorrowingStatusService,
  getAllBorrowingStatusService,
  getBorrowingStatusService,
  patchBorrowingStatusService,
  updateBorrowingStatusService,
} from "../service/borrowingStatus";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const borrowingStatusRouter = Router();

borrowingStatusRouter.post(
  "/",
  body("itemId").optional().isNumeric(),
  body("inventoryId").optional().isNumeric(),
  body("status").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const borrowingStatus = await createBorrowingStatusService(req.body);
      res.send(
        normalize(
          "Borrowing Status created successfully",
          "OK",
          DataType.object,
          borrowingStatus,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

borrowingStatusRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("itemId").optional().isNumeric(),
  body("inventoryId").optional().isNumeric(),
  body("status").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const borrowingStatus = await updateBorrowingStatusService(+id, req.body);
      res.send(
        normalize(
          "Borrowing Status updated successfully",
          "OK",
          DataType.object,
          borrowingStatus,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

borrowingStatusRouter.patch(
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
    const id = req.params.id;
    try {
      const borrowingStatus = await patchBorrowingStatusService(+id, req.body);
      res.send(borrowingStatus);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal service error" });
    }
  },
);

borrowingStatusRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      await deleteBorrowingStatusService(+id);
      res.status(200).json({ message: "Borrowing Status deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

borrowingStatusRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const borrowingStatus = await getBorrowingStatusService(+id);
      if (borrowingStatus) {
        res.send(
          normalize(
            "Borrowing Status found successfully",
            "OK",
            DataType.object,
            borrowingStatus,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize("Borrowing Status not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

borrowingStatusRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const borrowingStatus = await getAllBorrowingStatusService();
    res.send(
      normalize(
        "Borrowing Status found successfully",
        "OK",
        DataType.array,
        borrowingStatus,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
