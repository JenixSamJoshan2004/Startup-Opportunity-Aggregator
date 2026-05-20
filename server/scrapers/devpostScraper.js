const { chromium } = require("playwright");

const scrapeDevpost = async (keyword = "", region = "") => {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--disable-blink-features=AutomationControlled"],
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      viewport: { width: 1280, height: 720 },
      extraHTTPHeaders: {
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const page = await context.newPage();

    const searchUrl = `https://devpost.com/hackathons?search=${encodeURIComponent(keyword)}`;
    console.log(`Scraping Devpost: ${searchUrl}`);

    // Devpost works best with networkidle to let the challenge-listings populate
    await page.goto(searchUrl, { waitUntil: "networkidle", timeout: 60000 });

    // Explicitly wait for the listing section framework
    await page
      .waitForSelector(".challenge-listing, .hackathon-tile, #main-content", {
        timeout: 15000,
      })
      .catch(() => {});

    // Quick artificial pause to simulate human interaction layout speed
    await page.waitForTimeout(2000);

    const opportunities = await page.evaluate((regionFilter) => {
      // Devpost updated markup targets '.challenge-listing' layouts heavily
      const cards = document.querySelectorAll(
        ".hackathon-tile, .challenge-listing, div[class*='challenge-']",
      );
      const data = [];

      cards.forEach((card) => {
        const titleEl = card.querySelector("h3, .title, .challenge-title, h2");
        const title = titleEl?.innerText?.trim() || "";

        const linkEl = card.querySelector(
          "a[href*='/hackathons/'], a[href*='devpost.com']",
        );
        const sourceUrl = linkEl?.href || "";

        const organizer =
          card
            .querySelector(".host, .organizer, .by-with, .cl-host")
            ?.innerText?.replace(/by\s+/i, "")
            ?.trim() || "Devpost Host";
        const location =
          card
            .querySelector(".info .location, .cl-location, .location")
            ?.innerText?.trim() || "Global";
        const deadline =
          card
            .querySelector(
              ".time-left, .date-range, .submission-period, .cl-status",
            )
            ?.innerText?.trim() || "See website";

        if (
          regionFilter &&
          !location.toLowerCase().includes(regionFilter.toLowerCase())
        ) {
          return;
        }

        if (!title || !sourceUrl) return;

        data.push({
          title,
          description: `Hackathon challenge hosted by ${organizer}. Location: ${location}.`,
          type: "Hackathon",
          organizer,
          location,
          deadline,
          source: "Devpost",
          sourceUrl,
          startupStage: "Early Stage",
          fundingRange:
            card
              .querySelector(".prize, .prize-pool, .cl-prize")
              ?.innerText?.trim() || "Prize Pool",
          mode:
            location.toLowerCase().includes("online") ||
            location.toLowerCase().includes("remote")
              ? "Remote"
              : "Onsite",
          tags: ["Hackathon", "Tech"],
        });
      });

      return data;
    }, region);

    console.log(`Devpost Opportunities Found: ${opportunities.length}`);
    await browser.close();
    return opportunities;
  } catch (error) {
    console.log("Devpost Scraper Error:", error.message);
    if (browser) await browser.close();
    return [];
  }
};

module.exports = scrapeDevpost;
