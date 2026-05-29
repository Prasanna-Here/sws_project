import express from "express";

import upload from "../config/multer.js";

import {
  uploadDocuments,
  getDocuments,
} from "../controllers/documentController.js";

const router = express.Router();

router.post(
  "/upload",
  upload.array("documents"),
  uploadDocuments
);

router.get("/", getDocuments);

export default router;