import { Request, Response } from "express";
import { Router } from "express";
import {
  createInventoryGroupService,
  deleteInventoryGroupService,
  getAllInventoryGroupService,
  getInventoryGroupService,
  updateInventoryGroupService,
} from "../service/inventoryGroup";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const inventoryGroupRouter = Router();

inventoryGroupRouter.post(
  "/",
  body("inventoryGroupName").isString().trim(),
  body("description").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const inventoryGroup = await createInventoryGroupService(req.body);
      res.send(
        normalize(
          "Inventory Group created successfully",
          "OK",
          DataType.object,
          inventoryGroup,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryGroupRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("inventoryGroupName").isString().trim(),
  body("description").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventoryGroup = await updateInventoryGroupService(id, req.body);
      res.send(
        normalize(
          "Inventory Group updated successfully",
          "OK",
          DataType.object,
          inventoryGroup,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

inventoryGroupRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteInventoryGroupService(id);
      res.status(200).json({ message: "Inventory Group deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

inventoryGroupRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventoryGroup = await getInventoryGroupService(id);
      if (inventoryGroup) {
        res.send(
          normalize(
            "Inventory Group found successfully",
            "OK",
            DataType.object,
            inventoryGroup,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize(
              "Inventory Group not found",
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

inventoryGroupRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const inventoryGroup = await getAllInventoryGroupService();
    res.send(
      normalize(
        "Inventory Group found successfully",
        "OK",
        DataType.array,
        inventoryGroup,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
