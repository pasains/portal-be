import express, { Request, Response } from "express";
import prisma from "./configuration/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
var cors = require("cors");
const port = 8081;

app.use(cors());

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "susi",
      email: "susi@probo.id",
      phone_number: "081225363229",
      address: "sleman",
      profile: "dev",
      position: "senior",
      created_by: 1,
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
