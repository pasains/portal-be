import { Express, Request, Response } from "express";
import { contentData } from "..";
import { Router } from "express";

export const routers = Router();
routers.get("/api/post/title", (req: Request, res: Response) => {
const data = contentData.map((item) => {
  return { id: item.id, slug: item.slug, title: item.title, location: item.location, content: item.content, picture: item.picture}
});
res.json(data);
});

routers.get("/api/post/:page", (req: Request, res: Response) => {
  const page = req.params.page;
  const data = contentData.find((item) => item.slug === page);
res.json(data);
});