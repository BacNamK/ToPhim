import express from "express";
import dotenv from "dotenv";
import router from "./Router/action.js";
import connetion from "./Config/DataBase.js";
import cors from "cors";

dotenv.config();

const server = express();

await connetion.connect();
console.log("DB connected");

server.use(cors());
server.use(express.json());
server.use(router);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running port ${process.env.PORT}`);
});
