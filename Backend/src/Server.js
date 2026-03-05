import express from "express";
import dotenv from "dotenv";
import router from "./Router/action.js";
import connetion from "./Config/DataBase.js";
import cors from "cors";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);
try {
  await connetion.connect();
  console.log("DB connected");
  server.listen(process.env.PORT || 5137, () => {
    console.log(`Server running port ${process.env.PORT}`);
  });
} catch (err) {
  console.error("DB connect failed:", err.message);
  process.exit(1);
}
