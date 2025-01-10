import { Request, Response } from "express";
import { Router } from "express";
import {
  createOrganizationService,
  deleteOrganizationService,
  getAllOrganizationService,
  getOrganizationService,
  patchOrganizationService,
  updateOrganizationService,
} from "../service/organization";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const organizationRouter = Router();

organizationRouter.post(
  "/create",
  body("organizationName").isString().trim(),
  body("address").isString().trim(),
  body("organizationStatus").isString().trim(),
  body("note").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const organization = await createOrganizationService(req.body);
      res.send(
        normalize(
          "Organization created successfully",
          "OK",
          DataType.object,
          organization,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

organizationRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("organizationName").isString().trim(),
  body("address").isString().trim(),
  body("organizationStatus").isString().trim(),
  body("note").isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const organization = await updateOrganizationService(id, req.body);
      res.send(
        normalize(
          "Organization updated successfully",
          "OK",
          DataType.object,
          organization,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

organizationRouter.patch(
  "/:id",
  param("id").isNumeric().trim(),
  body("op").isIn(["add", "remove", "replace"]),
  body("path").isString().trim(),
  body("value").optional().isString().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const organization = await patchOrganizationService(id, req.body);
      res.send(organization);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json(normalize(error.message, "ERROR", DataType.null, null));
      }
      res
        .status(500)
        .json(normalize("Internal server error", "ERROR", DataType.null, null));
    }
  },
);

organizationRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteOrganizationService(id);
      res
        .status(200)
        .json(
          normalize(
            "Organization deleted successfully.",
            "OK",
            DataType.null,
            null,
          ),
        );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

organizationRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const organization = await getOrganizationService(id);
      if (organization) {
        res.send(
          normalize(
            "Organization found successfully",
            "OK",
            DataType.object,
            organization,
          ),
        );
      } else {
        res
          .status(400)
          .json(
            normalize("Organization not found", "ERROR", DataType.null, null),
          );
      }
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

organizationRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const page = _req.query.page ? parseInt(_req.query.page as string, 10) : 1;
    const limit = _req.query.limit
      ? parseInt(_req.query.limit as string, 10)
      : 10;
    const search = _req.query.search ? String(_req.query.search) : undefined;
    const { organization, currentPage, totalPage } =
      await getAllOrganizationService({ page, limit, search });
    res.send(
      normalize("Organization found successfully", "OK", DataType.array, {
        organization: organization,
        currentPage,
        totalPage,
        search,
      }),
    );
  } catch (error) {
    res
      .status(400)
      .json(normalize("Internal server error", "ERROR", DataType.null, null));
  }
});
