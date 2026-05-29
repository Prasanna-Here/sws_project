import db from "../config/db.js";

export const uploadDocuments = async (
  req,
  res
) => {
  try {
    const files = req.files;

    for (const file of files) {
      await db.query(
        `
        INSERT INTO documents
        (filename, filepath, filesize, filetype, status)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          file.filename,
          file.path,
          file.size,
          file.mimetype,
          "completed",
        ]
      );
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};