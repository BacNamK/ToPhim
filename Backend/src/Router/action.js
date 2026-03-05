import express from "express";
import { PostMovie } from "../Controllers/Controlls.js";

const router = express.Router();

router.post("/movie", PostMovie);

export default router;
