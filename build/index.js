"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryList = void 0;
const express_1 = __importDefault(require("express"));
const inventory_1 = require("./routes/inventory");
const app = (0, express_1.default)();
const port = 3001;
exports.inventoryList = [
    { id: 1, name: "jumar", ref_id: "gfd34", desc: "contoh" },
    { id: 2, name: "karabiner", ref_id: "erw34", desc: "contoh" },
    { id: 3, name: "crawl", ref_id: "fdw12", desc: "contoh" },
];
app.use(inventory_1.router);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
