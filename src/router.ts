import express from "express";

import { inventoryRouter } from "./controller/inventory";

export const app = express();

var cors = require("cors");
app.use(cors());

app.use("/api/inventory", inventoryRouter);
