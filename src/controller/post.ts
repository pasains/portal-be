import { Request, Response } from "express";
import { Router } from "express";
import {
  createPostService,
  deletePostService,
  getAllPostService,
  getPostService,
  updatePostService,
} from "../service/post";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const postRouter = Router();

postRouter.post(
  "/create",
  body("title").isString().trim(),
  body("type").isString().trim(),
  body("headerPhoto").isString().trim(),
  body("place").isString().trim(),
  body("writer").isString().trim(),
  body("date").isString().trim(),
  body("generation").isString().trim(),
  body("firstParagraph").isString().trim(),
  body("secondParagraph").isString().trim(),
  body("thirdParagraph").isString().trim(),
  body("fourthParagraph").isString().trim(),
  body("firstImage").isString().trim().optional(),
  body("secondImage").isString().trim().optional(),
  body("thirdImage").isString().trim().optional(),
  body("captionFirstImage").isString().trim().optional(),
  body("captionSecondImage").isString().trim().optional(),
  body("captionThirdImage").isString().trim().optional(),
  body("photoCollage").isArray(),
  body("photoCollage.*").isString(),
  body("captionPhotoCollage").isString().trim(),
  body("quote").isString().trim(),
  body("nameQuote").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await createPostService(req.body);
      res.send(
        normalize("Post created successfully", "OK", DataType.object, post),
      );
    } catch (error) {
      const post = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(post, "ERROR", DataType.null, null));
    }
  },
);

postRouter.put(
  "/update/:id",
  body("title").isString().trim(),
  body("type").isString().trim(),
  body("headerPhoto").isString().trim(),
  body("place").isString().trim(),
  body("writer").isString().trim(),
  body("date").isString().trim(),
  body("generation").isString().trim(),
  body("firstParagraph").isString().trim(),
  body("secondParagraph").isString().trim(),
  body("thirdParagraph").isString().trim(),
  body("fourthParagraph").isString().trim(),
  body("firstImage").isString().trim().optional(),
  body("secondImage").isString().trim().optional(),
  body("thirdImage").isString().trim().optional(),
  body("captionFirstImage").isString().trim().optional(),
  body("captionSecondImage").isString().trim().optional(),
  body("captionThirdImage").isString().trim().optional(),
  body("photoCollage").isArray(),
  body("photoCollage.*").isString(),
  body("captionPhotoCollage").isString().trim(),
  body("quote").isString().trim(),
  body("nameQuote").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const post = await updatePostService(id, req.body);
      res.send(
        normalize("Post updated successfully", "OK", DataType.object, post),
      );
    } catch (error) {
      const post = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(post, "ERROR", DataType.null, null));
    }
  },
);

postRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deletePostService(id);
      res.status(200).json({ post: "Post deleted successfully" });
    } catch (error) {
      return res.status(400).json({ post: error });
    }
  },
);

postRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const post = await getPostService(id);
      if (post) {
        res.send(
          normalize("Post found successfully", "OK", DataType.object, post),
        );
      } else {
        res
          .status(400)
          .json(normalize("Post not found", "ERROR", DataType.null, null));
      }
    } catch (error) {
      const post = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(post, "ERROR", DataType.null, null));
    }
  },
);

postRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const page = _req.query.page ? parseInt(_req.query.page as string, 10) : 1;
    const limit = _req.query.limit
      ? parseInt(_req.query.limit as string, 10)
      : 10;
    const search = _req.query.search ? String(_req.query.search) : undefined;
    const { post, currentPage, totalPage } = await getAllPostService({
      page,
      limit,
      search,
    });
    res.send(
      normalize("Post found successfully", "OK", DataType.array, {
        post: post,
        currentPage,
        totalPage,
        search
      }),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
