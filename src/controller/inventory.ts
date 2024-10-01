import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import {
  createInventoryService,
  deleteInventoryService,
  getAllInventoryService,
  getInventoryService,
  patchInventoryService,
  updateInventoryService,
} from "../service/inventory";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";
import {
  toInventoryDetailResponse,
  toInventoryResponses,
} from "../types/inventory";

export const inventoryRouter = Router();

inventoryRouter.post(
  "/create",
  body("inventoryName").isString().trim(),
  body("refId").isString().trim(),
  body("description").isString().trim(),
  body("isBorrowable").isBoolean(),
  body("inventoryTypeId").isNumeric(),
  body("image").isString().trim(),
  body("quantity").isNumeric(),
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
  body("isBorrowable").isBoolean(),
  body("inventoryTypeId").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const inventory = await updateInventoryService(+id, req.body);
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
    const id = req.params.id;
    try {
      const inventory = await patchInventoryService(+id, req.body);
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
    const id = req.params.id;
    try {
      await deleteInventoryService(+id);
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
    const id = req.params.id;
    try {
      const inventory = await getInventoryService(+id);
      if (inventory) {
        res.send(
          normalize(
            "Inventory found successfully",
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
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const inventory = await getAllInventoryService();
    res.send(
      normalize(
        "Inventory list found successfully",
        "OK",
        DataType.array,
        toInventoryResponses(inventory),
      ),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});
