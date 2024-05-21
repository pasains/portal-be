import { Express, Request, Response } from "express";
import { contentData } from "..";
import { Router } from "express";

export const post_router = Router();
post_router.get("/api/post/", (req: Request, res: Response) => {
const data = contentData.map((item) => {
  return { id: item.id, slug: item.slug, title: item.title, location: item.location, content: item.content, description: item.description, picture: item.picture}
});
res.json(data);
});

post_router.get("/api/post/:page", (req: Request, res: Response) => {
  const page = req.params.page;
  const data = contentData.find((item) => item.slug === page);
res.json(data);
});