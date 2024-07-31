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

export const inventoryTypeRouter = Router();

inventoryTypeRouter.post(
  "/",
  body("inventoryTypeName").isString().trim(),
  body("description").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const inventory = await createInventoryTypeService(req.body);
      res.send(inventory);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
);

inventoryTypeRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("inventoryTypeName").isString().trim(),
  body("description").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const inventory = await updateInventoryTypeService(+id, req.body);
      res.send(inventory);
    } catch (error) {
      res.status(400).json({ message: error });
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
        res.send(inventory);
      } else {
        res.status(400).json({ message: "Inventory Type not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
);

inventoryTypeRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const inventory = await getAllInventoryTypeService();
    res.send(inventory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
