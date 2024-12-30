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
import {
  toBorrowingDetailResponse,
  toBorrowingResponses,
} from "../types/borrowing";

export const borrowingRouter = Router();

borrowingRouter.post(
  "/create",
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
  body("items").isArray().withMessage("Items must be non-empty array"),
  body("items.*.inventoryId").isNumeric(),
  body("items.*.quantity").isNumeric(),
  async (req: Request, res: Response) => {
    console.log(`REQ_BODY`, req.body);
    if (req.body?.organizationId == undefined) {
      req.body.organizationId = 0;
    }
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
  "/update/:id",
  param("id").isNumeric().trim(),
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
    const id = BigInt(req.params.id);
    try {
      const borrowing = await updateBorrowingService(id, req.body);
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
    const id = BigInt(req.params.id);
    try {
      const borrowing = await patchBorrowingService(id, req.body);
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
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteBorrowingService(id);
      res
        .status(200)
        .json(
          normalize(
            "Borrowing deleted successfully.",
            "OK",
            DataType.null,
            null,
          ),
        );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
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
    const id = BigInt(req.params.id);
    try {
      const borrowing = await getBorrowingService(id);
      if (borrowing) {
        res.send(
          normalize(
            "Borrowing found successfully",
            "OK",
            DataType.object,
            toBorrowingDetailResponse(borrowing),
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
    const page = _req.query.page ? parseInt(_req.query.page as string, 10) : 1;
    const limit = _req.query.limit
      ? parseInt(_req.query.limit as string, 10)
      : 10;
    const { borrowing, currentPage, totalPage } = await getAllBorrowingService({
      page,
      limit,
    });
    res.send(
      normalize("Borrowing found successfully", "OK", DataType.array, {
        borrowing: toBorrowingResponses(borrowing),
        currentPage,
        totalPage,
      }),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
