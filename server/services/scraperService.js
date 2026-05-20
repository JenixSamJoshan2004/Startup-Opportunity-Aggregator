const scrapeDevpost = require("../scrapers/devpostScraper");
const scrapeStartupIndia = require("../scrapers/startupIndiaScraper");
const { saveOpportunities } = require("./opportunityService");

/**
 * Runs all scrapers with explicit keywords and targeted regions
 * @param {string} keyword - Search term like "AI" or "SaaS"
 * @param {string} region - Optional geographic boundary filter
 */
const runAllScrapers = async (keyword = "", region = "") => {
  try {
    console.log(
      `\n--- Starting pipeline run [Keyword: "${keyword}" | Region: "${region || "All"}"] ---`,
    );

    // 1. RUN DEVPOST SCRAPER
    const devpostData = await scrapeDevpost(keyword, region);
    await saveOpportunities(devpostData);

    // 2. RUN STARTUP INDIA SCRAPER
    const startupIndiaData = await scrapeStartupIndia(keyword, region);
    await saveOpportunities(startupIndiaData);

    console.log("--- All active scrapers completed successfully ---\n");
  } catch (error) {
    console.error("Scraper Service Execution Error:", error.message);
  }
};

module.exports = {
  runAllScrapers,
};
