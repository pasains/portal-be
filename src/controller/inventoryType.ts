import { Request, Response } from "express";
import { Router } from "express";
import {
  createInventoryTypeService,
  deleteInventoryTypeService,
  getAllInventoryTypeService,
  getInventoryTypeService,
  updateInventoryTypeService,
} from "../service/inventoryType";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const inventoryTypeRouter = Router();

inventoryTypeRouter.post(
  "/create",
  body("inventoryTypeName").isString().trim(),
  body("description").isString().trim(),
  body("groupId").optional().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const inventoryType = await createInventoryTypeService(req.body);
      res.send(
        normalize(
          "Inventory Type created successfully",
          "OK",
          DataType.object,
          inventoryType,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryTypeRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("inventoryTypeName").isString().trim(),
  body("description").isString().trim(),
  body("groupId").optional().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventoryType = await updateInventoryTypeService(id, req.body);
      res.send(
        normalize(
          "Inventory Type updated successfully",
          "OK",
          DataType.object,
          inventoryType,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryTypeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteInventoryTypeService(id);
      res.status(200).json({ message: "Inventory Type deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

inventoryTypeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventoryType = await getInventoryTypeService(id);
      if (inventoryType) {
        res.send(
          normalize(
            "Inventory Type found successfully",
            "OK",
            DataType.object,
            inventoryType,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize("Inventory Type not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryTypeRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const page = _req.query.page ? parseInt(_req.query.page as string, 10) : 1;
    const limit = _req.query.limit
      ? parseInt(_req.query.limit as string, 10)
      : 10;
    const { invetoryType, currentPage, totalPage } =
      await getAllInventoryTypeService({ page, limit });
    res.send(
      normalize("Inventory Type found successfully", "OK", DataType.array, {
        inventoryType: invetoryType,
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
