const { chromium } = require("playwright");

const scrapeStartupIndia = async (keyword = "", region = "") => {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--disable-blink-features=AutomationControlled"],
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });
    const page = await context.newPage();

    // Construct url with search phrases cleanly
    const baseUrl =
      "https://www.startupindia.gov.in/content/sih/en/search.html?roles=Startup&page=0";
    const searchUrl = keyword
      ? `${baseUrl}&q=${encodeURIComponent(keyword)}`
      : baseUrl;

    console.log(`Scraping Startup India: ${searchUrl}`);

    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Wait for the layout system components
    await page
      .waitForSelector(".startup-card, .search-result-card, .category-card", {
        timeout: 15000,
      })
      .catch(() => {});
    await page.waitForTimeout(2000);

    // ... upper code remains the same ...
    const opportunities = await page.evaluate((regionFilter) => {
      const cards = document.querySelectorAll(
        ".startup-card, .search-result-card, .category-card",
      );
      const data = [];

      cards.forEach((card) => {
        const title =
          card
            .querySelector(".startup-card-title, .title, h3, h4")
            ?.innerText?.trim() || "";
        const stage =
          card.querySelector(".startup-stage, .stage")?.innerText?.trim() ||
          "Early Stage";
        const location =
          card
            .querySelector(".startup-location, .location")
            ?.innerText?.trim() || "India";
        const sector =
          card.querySelector(".startup-sector, .sector")?.innerText?.trim() ||
          "Startup";

        // Try to find an actual anchor link to their profile
        const profileLink = card.querySelector("a")?.href;
        // Clean fallback: use a dynamic hash anchor so MongoDB sees a unique sourceUrl string
        const uniqueSourceUrl =
          profileLink ||
          `https://www.startupindia.gov.in/content/sih/en/search.html#${encodeURIComponent(title)}`;

        if (
          regionFilter &&
          !location.toLowerCase().includes(regionFilter.toLowerCase())
        ) {
          return;
        }

        if (!title) return;

        data.push({
          title,
          description: `${title} - ${sector} program from the Startup India ecosystem hub.`,
          type: "Startup Program",
          organizer: "Startup India Hub",
          location,
          deadline: "Check Website",
          source: "Startup India",
          sourceUrl: uniqueSourceUrl, // This ensures MongoDB unique indices won't clash!
          startupStage: stage,
          fundingRange: "Grant/Funding",
          mode: "Hybrid",
          tags: [sector, "India"].filter(Boolean),
        });
      });

      return data;
    }, region);
    // ... lower code remains the same ...

    console.log(`Startup India Opportunities Found: ${opportunities.length}`);
    await browser.close();
    return opportunities;
  } catch (error) {
    console.log("Startup India Scraper Error:", error.message);
    if (browser) await browser.close();
    return [];
  }
};

module.exports = scrapeStartupIndia;
