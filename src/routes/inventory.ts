import { dataInventory } from "..";
import { Router } from "express";
import { Express, Request, Response } from "express";

export const inventory_router = Router();
inventory_router.get("/api/inventaris/", (req: Request, res: Response) => {
const data = dataInventory.map((inventory) => {
  return { id: inventory.id, slug: inventory.slug, name: inventory.name, nomor: inventory.nomor, description: inventory.description, picture: inventory.picture}
});
res.json(data);
});

inventory_router.get("/api/inventaris/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  res.json(dataInventory.find((inventory) => inventory.id === parsedId));
});

