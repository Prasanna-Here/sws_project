import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post(
  "/upload",
  upload.array("documents"),
  async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        files: req.files,
      });
    } catch (error) {
      res.status(500).json({
        message: "Upload failed",
      });
    }
  }
);

export default router;