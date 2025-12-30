const { nanoid } = require("nanoid");
const Url = require("../models/url");

exports.createUrl = async (req, res) => {
  const { url, customAlias } = req.body;

  if (!url) return res.status(400).json({ error: "URL required" });

  const shortId = customAlias?.trim() || nanoid(8);

  const exists = await Url.findOne({ shortId });
  if (exists) return res.status(409).json({ error: "Alias already exists" });

  const newUrl = await Url.create({
    shortId,
    redirectUrl: url,
    userId: req.user.id,
    visitHistory: [],
  });

  res.json({ id: newUrl.shortId });
};

exports.getUrls = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const urls = await Url.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Url.countDocuments({ userId: req.user.id });

  res.json({ urls, totalPages: Math.ceil(total / limit) });
};

exports.getAnalytics = async (req, res) => {
  const url = await Url.findOne({
    shortId: req.params.shortId,
    userId: req.user.id,
  });

  if (!url) return res.status(404).json({ error: "Not found" });

  res.json({
    totalClicks: url.visitHistory.length,
    analytics: url.visitHistory,
  });
};

exports.deleteUrl = async (req, res) => {
  await Url.deleteOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  res.json({ success: true });
};
