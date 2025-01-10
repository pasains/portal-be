import { Request, Response } from "express";
import { Router } from "express";
import {
  createInventoryService,
  deleteInventoryService,
  getAllInventoryService,
  getBorrowingByInventoryService,
  getInventoryService,
  patchInventoryService,
  updateInventoryService,
} from "../service/inventory";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";
import {
  toInventoryBorrowingResponses,
  toInventoryDetailResponse,
  toInventoryResponses,
} from "../types/inventory";

export const inventoryRouter = Router();

inventoryRouter.post(
  "/create",
  body("inventoryName").isString().trim(),
  body("refId").isString().trim(),
  body("description").isString().trim(),
  body("condition").isString().trim(),
  body("note").isString().trim(),
  body("isBorrowable").isBoolean(),
  body("url").isString(),
  body("currentQuantity").isNumeric(),
  body("inventoryTypeName").isString().trim(),
  body("descriptionInventoryType").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const inventory = await createInventoryService(req.body);
      res.send(
        normalize(
          "Inventory created successfully",
          "OK",
          DataType.object,
          inventory,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      console.log(error);
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("inventoryName").isString().trim(),
  body("refId").isString().trim(),
  body("description").isString().trim(),
  body("condition").isString().trim(),
  body("note").isString().trim(),
  body("isBorrowable").isBoolean(),
  body("inventoryTypeName").isString().trim(),
  body("descriptionInventoryType").isString().trim(),
  body("url").isString(),
  body("currentQuantity").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(`REQ_BODY_UPDATE_INVENTORY`, req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventory = await updateInventoryService(id, req.body);
      console.log(`UPDT INVT`, inventory);
      res.send(
        normalize(
          "Inventory updated successfully",
          "OK",
          DataType.object,
          inventory,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryRouter.patch(
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
      const inventory = await patchInventoryService(id, req.body);
      res.send(inventory);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal service error" });
    }
  },
);

inventoryRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteInventoryService(id);
      res
        .status(200)
        .json(
          normalize(
            "Inventory deleted successfully",
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

inventoryRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventory = await getInventoryService(id);
      if (inventory) {
        res.send(
          normalize(
            "Inventory Detail found successfully",
            "OK",
            DataType.object,
            toInventoryDetailResponse(inventory),
          ),
        );
      } else {
        res
          .status(404)
          .json(normalize("Inventory not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      console.log(`ERROR_`, error);
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryRouter.get("/", async (_req: Request, res: Response) => {
  try {
    let inventoryTypeId = null;
    let inventoryGroupId = undefined;
    const page = _req.query.page ? parseInt(_req.query.page as string, 10) : 1;
    const limit = _req.query.limit
      ? parseInt(_req.query.limit as string, 10)
      : 10;
    const search = _req.query.search ? String(_req.query.search) : undefined;
    // If the value of query is string and except number show all without filter
    if (
      // Query paramater = _req.query.inventoryTypeId (string)
      _req.query.inventoryTypeId &&
      // Function to checks if the given value is NaN (Not-a-Number)
      !Number.isNaN(+_req.query.inventoryTypeId)
    ) {
      // Change query string to Bigint
      inventoryTypeId = BigInt(_req.query.inventoryTypeId as string);
    }
    if (
      // Query paramater = _req.query.inventoryTypeId (string)
      _req.query.inventoryGroupId &&
      // Function to checks if the given value is NaN (Not-a-Number)
      !Number.isNaN(+_req.query.inventoryGroupId)
    ) {
      // Change query string to Bigint
      inventoryTypeId = BigInt(_req.query.inventoryGroupId as string);
    }
    const {
      inventory,
      currentPageInventory,
      totalPageInventory,
      borrowableInventory,
      currentPageBorrowableInventory,
      totalPageBorrowableInventory,
    } = await getAllInventoryService({
      inventoryTypeId,
      inventoryGroupId,
      page,
      limit,
      search,
    });
    res.send(
      normalize("Inventory found successfully.", "OK", DataType.array, {
        inventory: toInventoryResponses(inventory),
        borrowableInventory: toInventoryResponses(borrowableInventory),
        currentPageInventory,
        totalPageInventory,
        currentPageBorrowableInventory,
        totalPageBorrowableInventory,
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

inventoryRouter.get(
  "/history/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const inventoryId = BigInt(req.params.id);
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
      const { currentPage, totalPages, totalItems, data } =
        await getBorrowingByInventoryService({ inventoryId, page, limit });
      if (data) {
        res.send(
          normalize(
            "Borrowing history by inventory found successfully",
            "OK",
            DataType.object,
            {
              currentPage,
              totalPages,
              totalItems,
              data: toInventoryBorrowingResponses(data),
            },
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize(
              "Borrowing history by inventory not found",
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
