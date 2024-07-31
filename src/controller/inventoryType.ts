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
  "/",
  body("inventoryTypeName").isString().trim(),
  body("description").isString().trim(),
  body("groupId").optional().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const inventory = await createInventoryTypeService(req.body);
      res.send(
        normalize(
          "Inventory Type created successfully",
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

inventoryTypeRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("inventoryTypeName").isString().trim(),
  body("description").isString().trim(),
  body("groupId").optional().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const inventory = await updateInventoryTypeService(+id, req.body);
      res.send(
        normalize(
          "Inventory Type updated successfully",
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

inventoryTypeRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      await deleteInventoryTypeService(+id);
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
    const id = req.params.id;
    try {
      const inventory = await getInventoryTypeService(+id);
      if (inventory) {
        res.send(
          normalize(
            "Inventory Type found successfully",
            "OK",
            DataType.object,
            inventory,
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
    const inventory = await getAllInventoryTypeService();
    res.send(
      normalize(
        "Inventory Type found successfully",
        "OK",
        DataType.array,
        inventory,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
