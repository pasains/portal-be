import { dataInventory } from "..";
import { Router } from "express";
import { Express, Request, Response } from "express";

export const router = Router();
router.get("/api/inventaris/name", (req: Request, res: Response) => {
const data = dataInventory.map((inventory) => {
  return { id: inventory.id, slug: inventory.slug, name: inventory.name, nomor: inventory.nomor, description: inventory.description, picture: inventory.picture}
});
res.json(data);
});

router.get("/api/inventaris/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  res.json(dataInventory.find((inventory) => inventory.id === parsedId));
});

