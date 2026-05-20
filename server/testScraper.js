const scrapeDevpost = require("./scrapers/devpostScraper");

const test = async () => {
  const data = await scrapeDevpost();

  console.log(data);
};

test();
