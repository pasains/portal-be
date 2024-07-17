import { Request, Response } from "express";
import { Router } from "express";

export const inventoryRouter = Router();

inventoryRouter.get("/test", (_req: Request, res: Response) => {
  res.send("INVENTORY TEST");
});

inventoryRouter.post("/create", (req: Request, res: Response) => {
  res.send("INVENTORY CREATE");
});

inventoryRouter.post("/update", (req: Request, res: Response) => {
  res.send("INVENTORY UPDATE");
});

inventoryRouter.post("/delete", (req: Request, res: Response) => {
  res.send("INVENTORY DELETE");
});
