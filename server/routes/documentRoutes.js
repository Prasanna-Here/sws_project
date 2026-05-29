import express from "express";

import upload from "../config/multer.js";

import {
  uploadDocuments,
} from "../controllers/documentController.js";

const router = express.Router();

router.post(
  "/upload",
  upload.array("documents"),
  uploadDocuments
);

export default router;