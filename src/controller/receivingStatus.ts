import { Request, Response } from "express";
import { Router } from "express";
import {
  createReceivingStatusService,
  deleteReceivingStatusService,
  getAllReceivingStatusService,
  getReceivingStatusService,
  updateReceivingStatusService,
} from "../service/receivingStatus";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const receivingStatusRouter = Router();

receivingStatusRouter.post(
  "/",
  body("receivingId").optional().isNumeric(),
  body("status").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const receivingStatus = await createReceivingStatusService(req.body);
      res.send(
        normalize(
          "Receiving Status created successfully",
          "OK",
          DataType.object,
          receivingStatus,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

receivingStatusRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("receivingId").optional().isNumeric(),
  body("status").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const receivingStatus = await updateReceivingStatusService(+id, req.body);
      res.send(
        normalize(
          "Receiving Status updated successfully",
          "OK",
          DataType.object,
          receivingStatus,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

receivingStatusRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      await deleteReceivingStatusService(+id);
      res.status(200).json({ message: "Receiving Status deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

receivingStatusRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const receivingStatus = await getReceivingStatusService(+id);
      if (receivingStatus) {
        res.send(
          normalize(
            "Receiving Status found successfully",
            "OK",
            DataType.object,
            receivingStatus,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize("Receiving Status not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

receivingStatusRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const receivingStatus = await getAllReceivingStatusService();
    res.send(
      normalize(
        "Receiving Status found successfully",
        "OK",
        DataType.array,
        receivingStatus,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
