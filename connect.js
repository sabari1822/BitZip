const mongoose = require('mongoose');

async function connect(url) {
  await mongoose.connect(url);
  console.log('MongoDB connected');
}

module.exports = connect;
