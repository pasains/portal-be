import { Router } from "express";
import { inventoryList } from "..";

export const router = Router();


router.get("/api/inventory/detail", (req, res) => {
  res.send(inventoryList); 
});
router.get("/api/inventory/:id/detail", (req, res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  res.send(inventoryList.find((inventory) => inventory.id === parsedId));
});

router.get("/api/inventory", (req, res) => {
const newInventory = inventoryList.map((inventory) => {
  const {id,name} = inventory;
  return {id, name};
})
res.send(newInventory);
});

