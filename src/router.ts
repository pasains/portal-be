import express from "express";

import bodyParser from "body-parser";
import { inventoryRouter } from "./controller/inventory";
import { userRouter } from "./controller/user";
import { inventoryTypeRouter } from "./controller/inventoryType";
import { inventoryGroupRouter } from "./controller/inventoryGroup";
import { inventoryStockRouter } from "./controller/inventoryStock";
import { inventoryStockHistoryRouter } from "./controller/inventoryStockHistory";
import { inventoryHistoryRouter } from "./controller/inventoryHistory";
import { userHistoryRouter } from "./controller/userHistory";
import { documentRouter } from "./controller/document";
import { itemRouter } from "./controller/item";
import { borrowingRouter } from "./controller/borrowing";
import { borrowingHistoryRouter } from "./controller/borrowingHistory";
import { borrowerRouter } from "./controller/borrower";
import { organizationRouter } from "./controller/organization";
import { messageRouter } from "./controller/message";

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
app.use("/api/inventoryhistory", inventoryHistoryRouter);
app.use("/api/inventorytype", inventoryTypeRouter);
app.use("/api/inventorygroup", inventoryGroupRouter);
app.use("/api/inventorystock", inventoryStockRouter);
app.use("/api/inventorystockhistory", inventoryStockHistoryRouter);
app.use("/api/user", userRouter);
app.use("/api/userhistory", userHistoryRouter);
app.use("/api/document", documentRouter);
app.use("/api/item", itemRouter);
app.use("/api/borrowing", borrowingRouter);
app.use("/api/borrowinghistory", borrowingHistoryRouter);
app.use("/api/borrower", borrowerRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/message", messageRouter);
app.get("/api/healthz", (_req, res) => {
  res.send("OK");
});
