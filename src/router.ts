import express from "express";

import { inventoryRouter } from "./controller/inventory";
import { userRouter } from "./controller/user";
import { inventoryTypeRouter } from "./controller/inventoryType";
import bodyParser from "body-parser";

export const app = express();

var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/api/inventory", inventoryRouter);
app.use("/api/inventorytype", inventoryTypeRouter);
app.use("/api/user", userRouter);
app.get("/api/healthz", (_req, res) => {
  res.send("OK");
});
