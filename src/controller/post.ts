import { Express, Request, Response } from "express";
import { contentData } from "..";
import { Router } from "express";

export const post_router = Router();
post_router.get("/api/post", (req: Request, res: Response) => {
  let { size, page } = req.query;
  if (!size) {
    size = "12";
  }
  if (!page) {
    page = "1";
  }

  const data = contentData.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      location: item.location,
      content: item.content,
      description: item.description,
      picture: item.picture,
    };
  });

  const result = data.slice(
    (parseInt(page as string) - 1) * parseInt(size as string),
    (parseInt(page as string) - 1) * parseInt(size as string) +
      parseInt(size as string),
  );
  res.json(result);
});

post_router.get("/api/post/:page", (req: Request, res: Response) => {
  const page = req.params.page;
  const data = contentData.find((item) => item.slug === page);
  res.json(data);
});
