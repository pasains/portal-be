import { Request, Response } from "express";
import { Router } from "express";
import {
  createBorrowingService,
  deleteBorrowingService,
  getAllBorrowingService,
  getBorrowingService,
  patchBorrowingService,
  updateBorrowingService,
} from "../service/borrowing";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const borrowingRouter = Router();

borrowingRouter.post(
  "/",
  body("borrowerId").optional().isNumeric(),
  body("borrowingStatusId").optional().isNumeric(),
  body("organizationId").optional().isNumeric(),
  body("dueDate")
    .isISO8601()
    .withMessage(
      "Please provide a complete ISO-8601 date-time string with timezone (e.g., 2024-08-10T12:34:56.789Z)",
    ),
  body("specialInstruction").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const borrowing = await createBorrowingService(req.body);
      res.send(
        normalize(
          "Borrowing created successfully",
          "OK",
          DataType.object,
          borrowing,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

borrowingRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("borrowerId").optional().isNumeric(),
  body("borrowingStatusId").optional().isNumeric(),
  body("organizationId").optional().isNumeric(),
  body("dueDate")
    .isISO8601()
    .withMessage(
      "Please provide a complete ISO-8601 date-time string with timezone (e.g., 2024-08-10T12:34:56.789Z)",
    ),
  body("specialInstruction").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const borrowing = await updateBorrowingService(+id, req.body);
      res.send(
        normalize(
          "Borrowing updated successfully",
          "OK",
          DataType.object,
          borrowing,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

borrowingRouter.patch(
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
      const borrowing = await patchBorrowingService(+id, req.body);
      res.send(borrowing);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal service error" });
    }
  },
);

borrowingRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      await deleteBorrowingService(+id);
      res.status(200).json({ message: "Borrowing deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

borrowingRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const borrowing = await getBorrowingService(+id);
      if (borrowing) {
        res.send(
          normalize(
            "Borrowing found successfully",
            "OK",
            DataType.object,
            borrowing,
          ),
        );
      } else {
        res
          .status(400)
          .json(normalize("Borrowing not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

borrowingRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const borrowing = await getAllBorrowingService();
    res.send(
      normalize(
        "Borrowing found successfully",
        "OK",
        DataType.array,
        borrowing,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
