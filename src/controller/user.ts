import { Request, Response } from "express";
import { Router } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getUserService,
  patchUserService,
  updateUserService,
} from "../service/user";
import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const userRouter = Router();

userRouter.post(
  "/",
  body("userName").isString().trim(), // spec validation
  body("firstName").isString().trim(), // spec validation
  body("lastName").isString().trim(), // spec validation
  body("email").isEmail().trim(), // spec validation
  body("password").isStrongPassword({
    minLength: 12,
    minUppercase: 1,
    minSymbols: 1,
  }), // spec validation
  body("phoneNumber").isMobilePhone("id-ID", { strictMode: true }), // spec validation
  body("address").isString().trim(), // spec validation
  body("profile").isString().trim(), // spec validation
  body("position").isString().trim(), // spec validation
  body("role").optional().isIn(["ADMIN", "USER"]), // spec validation
  body("isActive").isBoolean(), // spec validation
  async (req: Request, res: Response) => {
    // aja lali async
    // process validation
    const errors = validationResult(req);

    // if validation fails, then return error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // using try catch block
    // because we will handle the error from prisma;
    try {
      const user = await createUserService(req.body);
      // if successful, then return the user
      res.send(
        normalize("User created successfully", "OK", DataType.object, user),
      );
    } catch (error) {
      // if error, then return error
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

userRouter.put(
  "/:id",
  param("id").isNumeric().trim(),
  body("userName").isString().trim(), // spec validation
  body("firstName").isString().trim(), // spec validation
  body("lastName").isString().trim(), // spec validation
  body("email").isEmail().trim(), // spec validation
  body("phoneNumber").isMobilePhone("id-ID", { strictMode: true }), // spec validation
  body("address").isString().trim(), // spec validation
  body("profile").isString().trim(), // spec validation
  body("position").isString().trim(), // spec validation
  body("role").isIn(["ADMIN", "USER"]), // spec validation
  body("isActive").isBoolean(), // spec validation
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const user = await updateUserService(+id, req.body);
      res.send(
        normalize("User updated successfully", "OK", DataType.object, user),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

userRouter.patch(
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
    const id = req.params.id;
    try {
      const user = await patchUserService(+id, req.body);
      res.send(user);
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

userRouter.delete(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      await deleteUserService(+id);
      res
        .status(200)
        .json(
          normalize("User deleted successfully", "OK", DataType.null, null),
        );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

userRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
      const user = await getUserService(+id);
      if (user) {
        res.send(
          normalize("User found successfully", "OK", DataType.object, user),
        );
      } else {
        res
          .status(404)
          .json(normalize("User not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

userRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const user = await getAllUserService();
    res.send(
      normalize("User list found successfully", "OK", DataType.array, user),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});
