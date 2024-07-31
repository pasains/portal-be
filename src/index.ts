import prisma from "./configuration/db";
import dotenv from "dotenv";
import { app } from "./router";

dotenv.config();

// Fix BigInt to JSON
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return Number(this);
};

async function main() {
  // const newInventory = await prisma.inventory.create({
  //   data: {
  //     inventoryName: "COS",
  //     refId: "21/RS/186",
  //     description: "seri 04 08 berwarna silver buatan Buatan Petzl",
  //     inventoryTypeId: 3,
  //     createdBy: 4,
  //     updatedBy: 4
  //   },
  // });
  // console.log("Created new inventory:", newInventory);
  //const updatedUser = await prisma.user.update({
  //  where: { id: newUser.id },
  //  data: { userName: "Susilawati update" },
  //});
  //console.log("Updated user:", updatedUser);
  //
  //const deletedUser = await prisma.user.delete({
  //  where: { id: newUser.id },
  //});
  //console.log("Deleted user:", deletedUser);
  //const auditTrail = await prisma.userHistory.findMany();
  //console.log("History Trail:", auditTrail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
