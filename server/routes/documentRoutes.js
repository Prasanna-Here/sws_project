import express from "express";

import upload from "../config/multer.js";

import {
  uploadDocuments,
  getDocuments,
  deleteDocument,
  downloadDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.post(
  "/upload",
  upload.array("documents"),
  uploadDocuments
);

router.get("/", getDocuments);
router.delete("/:id", deleteDocument);
router.get("/download/:id", downloadDocument);

export default router;