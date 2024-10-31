import { Request, Response } from "express";
import { Router } from "express";
import {
  createMessageService,
  deleteMessageService,
  getAllMessageService,
  getMessageService,
  updateMessageService,
} from "../service/message";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const messageRouter = Router();

messageRouter.post(
  "/create",
  body("name").isString().trim(),
  body("organization").isString().trim(),
  body("email").isEmail().trim(),
  body("comment").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const message = await createMessageService(req.body);
      res.send(
        normalize(
          "Message created successfully",
          "OK",
          DataType.object,
          message,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

messageRouter.put(
  "/:id",
  body("name").isString().trim(),
  body("organization").isString().trim(),
  body("email").isEmail().trim(),
  body("comment").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const message = await updateMessageService(id, req.body);
      res.send(
        normalize(
          "Message updated successfully",
          "OK",
          DataType.object,
          message,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

messageRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteMessageService(id);
      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
);

messageRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const message = await getMessageService(id);
      if (message) {
        res.send(
          normalize(
            "Message found successfully",
            "OK",
            DataType.object,
            message,
          ),
        );
      } else {
        res
          .status(400)
          .json(normalize("Message not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

messageRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const message = await getAllMessageService();
    res.send(
      normalize("Message found successfully", "OK", DataType.array, message),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
