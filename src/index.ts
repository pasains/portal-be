import express, { query, request, response } from "express";
import { router } from "./routes/inventory";

const app = express();
const port = 3001;

export const inventoryList = [
  { id: 1, name: "jumar", ref_id: "gfd34", desc: "contoh" },
  { id: 2, name: "karabiner", ref_id: "erw34", desc: "contoh" },
  { id: 3, name: "crawl", ref_id: "fdw12", desc: "contoh" },
];
app.use(router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});