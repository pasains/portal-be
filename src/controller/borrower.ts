import { Request, Response } from "express";
import { Router } from "express";
import {
  createBorrowerService,
  deleteBorrowerService,
  patchBorrowerService,
  getAllBorrowerService,
  getBorrowerService,
  updateBorrowerService,
} from "../service/borrower";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";
import { toBorrowerDetailResponse } from "../types/borrower";

export const borrowerRouter = Router();

borrowerRouter.post(
  "/create",
  body("borrowerName").isString().trim(),
  body("organizationName").isString().trim(),
  body("address").isString().trim(),
  body("organizationStatus").isString().trim(),
  body("note").isString().trim(),
  body("identityNumber").isString().trim(),
  body("identityCard").isString().trim(),
  body("phoneNumber").isMobilePhone("id-ID", { strictMode: true }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const borrower = await createBorrowerService(req.body);
      res.send(
        normalize(
          "Borrower created successfully",
          "OK",
          DataType.object,
          borrower,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

borrowerRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("borrowerName").isString().trim(),
  body("identityNumber").isString().trim(),
  body("identityCard").isString().trim(),
  body("phoneNumber").isMobilePhone("id-ID", { strictMode: true }),
  body("organizationName").isString().trim(),
  body("address").isString().trim(),
  body("organizationStatus").isString().trim(),
  body("note").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const borrower = await updateBorrowerService(id, req.body);
      res.send(
        normalize(
          "Borrower updated successfully",
          "OK",
          DataType.object,
          borrower,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

borrowerRouter.patch(
  "/:id",
  param("id").isNumeric().trim(),
  body("op").isIn(["add", "remove", "replace"]), // spec validation
  body("path").isString().trim(), // spec validation
  body("value").optional().isString().trim(), // spec validation
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const borrower = await patchBorrowerService(id, req.body);
      res.send(borrower);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json(normalize(error.message, "ERROR", DataType.null, null));
      }
      res
        .status(500)
        .json(normalize("Internal server error", "ERROR", DataType.null, null));
    }
  },
);

borrowerRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteBorrowerService(id);
      res.status(200).json({ message: "Borrower deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

borrowerRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const borrower = await getBorrowerService(id);
      if (borrower) {
        res.send(
          normalize(
            "Borrower found successfully",
            "OK",
            DataType.object,
            toBorrowerDetailResponse(borrower),
          ),
        );
      } else {
        res
          .status(400)
          .json(normalize("Borrower not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

borrowerRouter.get("/", async (_req: Request, res: Response) => {
  try {
    let orgId = null;
    const page = _req.query.page ? parseInt(_req.query.page as string, 10) : 1;
    const limit = _req.query.limit
      ? parseInt(_req.query.limit as string, 10)
      : 10;
    if (_req.query.orgId && Number.isNaN(+_req.query.orgId)) {
      res
        .status(400)
        .json(
          normalize(
            "Organization Id is not valid",
            "ERROR",
            DataType.null,
            null,
          ),
        );
      return;
    }
    if (_req.query.orgId && !Number.isNaN(+_req.query.orgId)) {
      orgId = BigInt(_req.query.orgId as string);
    }
    const { borrower, currentPage, totalPage } = await getAllBorrowerService({
      orgId,
      page,
      limit,
    });
    res.send(
      normalize("Borrower found successfully", "OK", DataType.array, {
        borrower: borrower,
        currentPage,
        totalPage,
      }),
    );
  } catch (error) {
    console.log(`Error`, error);
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
