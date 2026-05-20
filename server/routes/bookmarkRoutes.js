const express = require("express");

const router = express.Router();

const {
  getBookmarks,
  addBookmark,
} = require("../controllers/bookmarkController");

router.get("/:userId", getBookmarks);

router.post("/:userId/:opportunityId", addBookmark);

module.exports = router;