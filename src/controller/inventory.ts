import { Router } from "express";
import { Express, Request, Response } from "express";
/*
export const inventory_router = Router();
inventory_router.get("/api/inventaris", (req: Request, res: Response) => {
  let { size, page } = req.query;
  if (!size) {
    size = "12";
  }
  if (!page) {
    page = "1";
  }

  const data = dataInventory.map((inventory) => {
    return {
      id: inventory.id,
      slug: inventory.slug,
      name: inventory.name,
      nomor: inventory.nomor,
      description: inventory.description,
      picture: inventory.picture,
    };
  });

  const result = data.slice(
    (parseInt(page as string) - 1) * parseInt(size as string),
    (parseInt(page as string) - 1) * parseInt(size as string) +
      parseInt(size as string),
  );
  res.json(result);
});
inventory_router.get("/api/inventaris/:id", (req, res) => {
  // mbok validasi id ki kudune ongko
  const parsedId = parseInt(req.params.id);
  res.json(dataInventory.find((inventory) => inventory.id === parsedId));
});
**/
