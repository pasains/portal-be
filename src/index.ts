import express, { Request, Response } from "express";
import prisma from "./configuration/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
var cors = require("cors");
const port = 8081;

app.use(cors());
async function main() {
  const newUser = await prisma.user.create({
    data: {
      firstName: "Susilawati",
      lastName: "Budi Utami",
      userName: "mecinsusi",
      email: "susi@probo.id",
      phoneNumber: "081225363229",
      address: "sleman",
      profile: "dev",
      position: "senior",
    },
  });
  console.log("Created new user:", newUser);

  const updatedUser = await prisma.user.update({
    where: { id: newUser.id },
    data: { userName: "Susilawati update" },
  });
  console.log("Updated user:", updatedUser);

  const deletedUser = await prisma.user.delete({
    where: { id: newUser.id },
  });
  console.log("Deleted user:", deletedUser);

  const auditTrail = await prisma.userHistory.findMany();
  console.log("History Trail:", auditTrail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
