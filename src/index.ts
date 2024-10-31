import prisma from "./configuration/db";
import dotenv from "dotenv";
import { app } from "./router";

// Load environment variable
dotenv.config();

// Fix BigInt to JSON
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return Number(this);
};

try {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
} catch (error) {
  console.error("Error during execution:", error);
  process.exit(1);
} finally {
  // Ensuring the Prisma client is properly disconnected
  prisma
    .$disconnect()
    .catch((e) => console.error("Error during disconnection:", e));
}
