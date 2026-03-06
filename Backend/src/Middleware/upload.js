import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    const safeName = path
      .basename(file.originalname || "image", ext)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();

    cb(null, `${safeName}-${Date.now()}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (!file.mimetype?.startsWith("image/")) {
    cb(new Error("Only image files are allowed"), false);
    return;
  }
  cb(null, true);
};

export const uploadMovieImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

