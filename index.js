const express= require('express');
require('dotenv').config();
const connect= require('./connect');
const urlRouter= require('./routes/url');
const Url= require('./models/url');
const app = express();
const PORT = process.env.PORT || 8001;
app.use(express.json());

connect(process.env.Mongo_url);
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId.trim();

  console.log('Looking for shortId:', shortId);

  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  console.log('Found entry:', entry);

  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(entry.redirectUrl);
});


app.use('/url', urlRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));