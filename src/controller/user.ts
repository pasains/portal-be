import { Request, Response } from "express";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/test", (_req: Request, res: Response) => {
  res.send("USER TEST");
});

userRouter.post("/create", (req: Request, res: Response) => {
  res.send("USER CREATE");
});

userRouter.post("/update", (req: Request, res: Response) => {
  res.send("USER UPDATE");
});

userRouter.post("/delete", (req: Request, res: Response) => {
  res.send("USER DELETE");
});
