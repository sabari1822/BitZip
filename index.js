const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connect = require("./connect");
const urlRouter = require("./routes/url");
const authRouter = require("./routes/auth");
const Url = require("./models/url");

const app = express();

app.use(cors());
app.use(express.json());

connect(process.env.Mongo_url);


app.use("/auth", authRouter);
app.use("/url", urlRouter);


app.get("/:shortId", async (req, res) => {
  try {
    const entry = await Url.findOneAndUpdate(
      { shortId: req.params.shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
