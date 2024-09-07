import express from "express";

import bodyParser from "body-parser";
import { inventoryRouter } from "./controller/inventory";
import { userRouter } from "./controller/user";
import { inventoryTypeRouter } from "./controller/inventoryType";
import { inventoryGroupRouter } from "./controller/inventoryGroup";
import { inventoryStockRouter } from "./controller/inventoryStock";
import { inventoryHistoryRouter } from "./controller/inventoryHistory";
import { stockLedgerRouter } from "./controller/stockLedger";
import { userHistoryRouter } from "./controller/userHistory";
import { receivingRouter } from "./controller/receiving";
import { receivingStatusRouter } from "./controller/receivingStatus";
import { documentRouter } from "./controller/document";
import { itemRouter } from "./controller/item";
import { borrowingRouter } from "./controller/borrowing";
import { borrowingStatusRouter } from "./controller/borrowingStatus";
import { borrowerRouter } from "./controller/borrower";
import { organizationRouter } from "./controller/organization";

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
app.use("/api/inventorygroup", inventoryGroupRouter);
app.use("/api/inventorystock", inventoryStockRouter);
app.use("/api/inventoryhistory", inventoryHistoryRouter);
app.use("/api/stockledger", stockLedgerRouter);
app.use("/api/user", userRouter);
app.use("/api/userhistory", userHistoryRouter)
app.use("/api/receiving", receivingRouter)
app.use("/api/receivingStatus", receivingStatusRouter)
app.use("/api/document", documentRouter)
app.use("/api/item", itemRouter)
app.use("/api/borrowing", borrowingRouter)
app.use("/api/borrowingstatus", borrowingStatusRouter)
app.use("/api/borrower", borrowerRouter)
app.use("/api/organization", organizationRouter)
app.get("/api/healthz", (_req, res) => {
  res.send("OK");
});
