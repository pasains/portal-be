import { Request, Response } from "express";
import { Router } from "express";

export const inventoryRouter = Router();

inventoryRouter.get("/test", (_req: Request, res: Response) => {
  res.send("INVENTORY TEST");
});
