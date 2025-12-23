const { nanoid } = require("nanoid");
const Url = require("../models/url");

async function getAllUrls(req, res) {
  try {
    const urls = await Url.find({});
    return res.json(urls);
  } catch (err) {
    console.error("Get all URLs error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAnalystics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function generateNewShortUrl(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const shortID = nanoid(8);

    await Url.create({
      shortId: shortID,
      redirectUrl: url,
      visitHistory: [],
    });

    return res.json({ id: shortID });
  } catch (err) {
    console.error("Create short URL error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  generateNewShortUrl,
  handleGetAnalystics,
  getAllUrls,
};
