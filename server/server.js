const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const opportunityRoutes = require("./routes/opportunityRoutes");
const scrapeRoutes = require("./routes/scrapeRoutes");
const authRoutes = require("./routes/authRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const cron = require("node-cron");
const { runAllScrapers } = require("./services/scraperService");

const app = express();

// Initialize Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Route Handlers
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/scrape", scrapeRoutes); // Connected to the dynamic scraping route above
app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Running Startup Opportunity Aggregator Base API Engine",
  });
});

// CRON SCHEDULER
// Runs automatically at the minute 0 of every hour.
cron.schedule("0 * * * *", async () => {
  console.log("Running hourly automated global scraping sync...");

  // Default general baseline sweep (pulls latest general posts without strict query filters)
  await runAllScrapers("", "");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
