const User = require("../models/User");

const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("bookmarks");

    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addBookmark = async (req, res) => {
  try {
    const { userId, opportunityId } = req.params;

    const user = await User.findById(userId);

    if (!user.bookmarks.includes(opportunityId)) {
      user.bookmarks.push(opportunityId);

      await user.save();
    }

    res.json({
      success: true,
      message: "Bookmarked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBookmarks,
  addBookmark,
};
