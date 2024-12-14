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
import { authenticationRouter } from "./controller/authentication";
import { authorizationMiddleware } from "./middleware/authorization";

export const app = express();

var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/api/authentication", authenticationRouter);
app.use("/api/inventory", authorizationMiddleware, inventoryRouter);
app.use("/api/inventoryhistory", authorizationMiddleware, inventoryHistoryRouter);
app.use("/api/inventorytype", authorizationMiddleware, inventoryTypeRouter);
app.use("/api/inventorygroup", authorizationMiddleware, inventoryGroupRouter);
app.use("/api/inventorystock", authorizationMiddleware, inventoryStockRouter);
app.use("/api/inventorystockhistory", authorizationMiddleware, inventoryStockHistoryRouter);
app.use("/api/user", authorizationMiddleware, userRouter);
app.use("/api/userhistory", authorizationMiddleware, userHistoryRouter);
app.use("/api/document", authorizationMiddleware, documentRouter);
app.use("/api/item", authorizationMiddleware, itemRouter);
app.use("/api/borrowing", authorizationMiddleware, borrowingRouter);
app.use("/api/borrowinghistory", authorizationMiddleware, borrowingHistoryRouter);
app.use("/api/borrower", authorizationMiddleware, borrowerRouter);
app.use("/api/organization", authorizationMiddleware, organizationRouter);
app.use("/api/message", authorizationMiddleware, messageRouter);
app.get("/api/healthz", (_req, res) => {
  res.send("OK");
});
