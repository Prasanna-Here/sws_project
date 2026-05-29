import db from "../config/db.js";

export const getNotifications =
  async (req, res) => {
    try {
      const [notifications] =
        await db.query(
          `
          SELECT * FROM notifications
          ORDER BY created_at DESC
          `
        );

      res.status(200).json(
        notifications
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch notifications",
      });
    }
  };

export const markAsRead = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      UPDATE notifications
      SET is_read = true
      WHERE id = ?
      `,
      [id]
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Failed to update notification",
    });
  }
};