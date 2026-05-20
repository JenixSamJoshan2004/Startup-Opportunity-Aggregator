const express = require("express");

const {
  getAllOpportunities,
  triggerScraping,
  getOpportunityById,
} = require("../controllers/opportunityController");

const router = express.Router();

router.get("/scrape", triggerScraping);

router.get("/", getAllOpportunities);

router.get("/:id", getOpportunityById);

module.exports = router;
