import express from "express";
import dotenv from "dotenv";
import router from "./Router/action.js";
import connetion from "./Config/DataBase.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cors());
server.use(express.json());
server.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
server.use(router);
const connectDB = async () => {
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
};

connectDB();
