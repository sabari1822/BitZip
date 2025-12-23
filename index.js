
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connect = require("./connect");
const urlRouter = require("./routes/url");
const Url = require("./models/url");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());


app.get("/test", (req, res) => {
  res.send("Backend is reachable");
});

connect(process.env.Mongo_url);


app.use("/url", urlRouter);


app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId.trim();

  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
