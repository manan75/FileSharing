import User from "../Models/User.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user) {
      res.json({
        success: true,
        userData: {
          userId: user._id,
          name: user.name,
        },
      });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("getUserData error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
