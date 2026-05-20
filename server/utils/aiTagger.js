const aiTagger = (item) => {
  const text = `
    ${item.title}
    ${item.description}
    ${item.location}
  `.toLowerCase();

  // Funding

  if (
    text.includes("$") ||
    text.includes("funding") ||
    text.includes("grant") ||
    text.includes("prize")
  ) {
    item.fundingRange = "Funding Available";
  } else {
    item.fundingRange = "Not Specified";
  }

  // Startup Stage

  if (text.includes("early stage")) {
    item.startupStage = "Early Stage";
  } else if (text.includes("seed")) {
    item.startupStage = "Seed";
  } else {
    item.startupStage = "Open";
  }

  // Remote / On-site

  if (
    text.includes("online") ||
    text.includes("remote") ||
    text.includes("virtual")
  ) {
    item.mode = "Remote";
  } else {
    item.mode = "On-site";
  }

  return item;
};

module.exports = aiTagger;
