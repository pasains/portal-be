"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory_router = void 0;
const __1 = require("..");
const express_1 = require("express");
exports.inventory_router = (0, express_1.Router)();
exports.inventory_router.get("/api/inventaris/", (req, res) => {
  const data = __1.dataInventory.map((inventory) => {
    return {
      id: inventory.id,
      slug: inventory.slug,
      name: inventory.name,
      nomor: inventory.nomor,
      description: inventory.description,
      picture: inventory.picture,
    };
  });
  res.json(data);
});
exports.inventory_router.get("/api/inventaris/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  res.json(__1.dataInventory.find((inventory) => inventory.id === parsedId));
});
