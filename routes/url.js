const express = require('express');
const router = express.Router();
const{generateNewShortUrl,handleGetAnalystics}= require('../controllers/url');

router.post('/', generateNewShortUrl);
router.get('/analytics/:shortId', handleGetAnalystics);

module.exports = router;