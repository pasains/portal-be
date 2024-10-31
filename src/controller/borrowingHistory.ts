import { Request, Response } from "express";
import { Router } from "express";
import {
  createBorrowingHistoryService,
  getBorrowingHistoryService,
  getAllBorrowingHistoryService,
} from "../service/borrowingHistory";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const borrowingHistoryRouter = Router();

borrowingHistoryRouter.post(
  "/",
  body("id").isNumeric(),
  body("organizationName").isString().trim(),
  body("address").isString().trim(),
  body("organizationStatus").isString().trim(),
  body("note").isString().trim(),
  body("borrowerName").isString().trim(),
  body("identityCard").isString().trim(),
  body("identityNumber").isString().trim(),
  body("phoneNumber").isMobilePhone("id-ID", { strictMode: true }),
  body("dueDate").isDate().withMessage("valid date YYYY-MM-DD").toDate(),
  body("specialInstruction").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const borrowingHistory = await createBorrowingHistoryService(req.body);
      res.send(
        normalize(
          "Borrowing Status created successfully",
          "OK",
          DataType.object,
          borrowingHistory,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

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
