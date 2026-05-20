const Opportunity = require("../models/Opportunity");

const scrapeDevpost = require("../scrapers/devpostScraper");

const runScrapers = async (req, res) => {
  try {
    const devpostData = await scrapeDevpost();

    let inserted = 0;

    for (const item of devpostData) {
      const exists = await Opportunity.findOne({
        sourceUrl: item.sourceUrl,
      });

      if (!exists) {
        await Opportunity.create(item);

        inserted++;
      }
    }

    res.status(200).json({
      success: true,
      total: devpostData.length,
      inserted,
      skipped: devpostData.length - inserted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  runScrapers,
};
