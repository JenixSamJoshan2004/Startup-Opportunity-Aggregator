const Opportunity = require("../models/Opportunity");

const saveOpportunities = async (data) => {
  try {
    for (const item of data) {
      const existing = await Opportunity.findOne({
        title: item.title,
      });

      if (!existing) {
        await Opportunity.create(item);

        console.log("Saved:", item.title);
      } else {
        console.log("Duplicate skipped:", item.title);
      }
    }
  } catch (error) {
    console.log("Opportunity Save Error:", error.message);
  }
};

module.exports = {
  saveOpportunities,
};
