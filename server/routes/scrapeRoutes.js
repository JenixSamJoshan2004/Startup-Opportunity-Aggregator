const express = require("express");
const router = express.Router();
const { runAllScrapers } = require("../services/scraperService");

// CHANGE THIS FROM router.post TO router.get
// You can now hit this via: http://localhost:5000/api/scrape?keyword=AI&region=India
router.get("/", async (req, res) => {
  try {
    // Read parameters from URL query strings instead of req.body
    const { keyword, region } = req.query;

    console.log(
      `Manual scrape requested via GET for Keyword: "${keyword || ""}", Region: "${region || ""}"`,
    );

    // Kick off the scrapers asynchronously in the background
    runAllScrapers(keyword, region);

    res.status(202).json({
      success: true,
      message: "Scraping pipeline kicked off successfully in the background.",
      filtersApplied: {
        keyword: keyword || "None",
        region: region || "All",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
