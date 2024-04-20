"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const __1 = require("..");
exports.router = (0, express_1.Router)();
exports.router.get("/api/inventory/detail", (req, res) => {
    res.send(__1.inventoryList);
});
exports.router.get("/api/inventory/:id/detail", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    res.send(__1.inventoryList.find((inventory) => inventory.id === parsedId));
});
exports.router.get("/api/inventory", (req, res) => {
    const newInventory = __1.inventoryList.map((inventory) => {
        const { id, name } = inventory;
        return { id, name };
    });
    res.send(newInventory);
});
