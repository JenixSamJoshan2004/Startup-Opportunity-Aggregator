const Opportunity = require("../models/Opportunity");

const { runAllScrapers } = require("../services/scraperService");

const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const triggerScraping = async (req, res) => {
  try {
    await runAllScrapers();

    res.json({
      success: true,
      message: "Scraping completed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllOpportunities,
  triggerScraping,
  getOpportunityById,
};
