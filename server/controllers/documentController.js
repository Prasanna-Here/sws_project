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

            if (files.length > 3) {
                await db.query(
                    `
    INSERT INTO notifications
    (message, type)
    VALUES (?, ?)
    `,
                    [
                        `${files.length} files uploaded successfully.`,
                        "bulk-upload",
                    ]
                );

                const io = req.app.get("io");

                io.emit("newNotification", {
                    message: `${files.length} files uploaded successfully.`,
                });
            }
        }

        const io = req.app.get("io");

        io.emit("newNotification", {
            message:
                "New document uploaded",
        });

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

export const getDocuments = async (
    req,
    res
) => {
    try {
        const [documents] = await db.query(
            `
      SELECT * FROM documents
      ORDER BY uploaded_at DESC
      `
        );

        res.status(200).json(documents);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch documents",
        });
    }
};

export const deleteDocument = async (
    req,
    res
) => {
    try {
        const { id } = req.params;

        await db.query(
            `
      DELETE FROM documents
      WHERE id = ?
      `,
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Document deleted",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Delete failed",
        });
    }
};