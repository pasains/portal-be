import { Request, Response } from "express";
import { Router } from "express";
import {
  createReceivingService,
  deleteReceivingService,
  getAllReceivingService,
  getReceivingService,
  updateReceivingService,
} from "../service/receiving";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const receivingRouter = Router();

receivingRouter.post(
  "/create",
  body("userId").optional().isNumeric(),
  body("notes").isString().trim(),
  body("status").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const receiving = await createReceivingService(req.body);
      res.send(
        normalize(
          "Receiving created successfully",
          "OK",
          DataType.object,
          receiving,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

receivingRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("userId").optional().isNumeric(),
  body("notes").isString(),
  body("status").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const receiving = await updateReceivingService(+id, req.body);
      res.send(
        normalize(
          "Receiving updated successfully",
          "OK",
          DataType.object,
          receiving,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

receivingRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      await deleteReceivingService(+id);
      res.status(200).json({ message: "Receiving deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

receivingRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const receiving = await getReceivingService(+id);
      if (receiving) {
        res.send(
          normalize(
            "Receiving found successfully",
            "OK",
            DataType.object,
            receiving,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize("Receiving not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

receivingRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const receiving = await getAllReceivingService();
    res.send(
      normalize(
        "Receiving found successfully",
        "OK",
        DataType.array,
        receiving,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
