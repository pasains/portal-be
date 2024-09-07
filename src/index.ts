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
