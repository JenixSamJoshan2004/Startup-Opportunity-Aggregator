const Parser = require("rss-parser");

const parser = new Parser();

const scrapeRSS = async () => {
  try {
    console.log("Scraping RSS feeds...");

    const feed = await parser.parseURL(
      "https://techcrunch.com/category/startups/feed/",
    );

    const opportunities = feed.items
      .filter((item) => {
        const title = item.title.toLowerCase();

        return (
          title.includes("hackathon") ||
          title.includes("grant") ||
          title.includes("accelerator") ||
          title.includes("startup") ||
          title.includes("conference") ||
          title.includes("program")
        );
      })
      .map((item) => ({
        title: item.title,

        description: item.contentSnippet,

        type: "Startup Program",

        organizer: "TechCrunch",

        location: "Global",

        deadline: "N/A",

        source: "RSS Feed",

        sourceUrl: item.link,

        startupStage: "Early Stage",

        fundingRange: "Seed",

        mode: "Remote",

        tags: ["Startup", "Tech"],
      }));

    console.log(`RSS Opportunities: ${opportunities.length}`);

    return opportunities;
  } catch (error) {
    console.log("RSS Scraper Error:", error.message);

    return [];
  }
};

module.exports = scrapeRSS;
