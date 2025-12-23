const express = require('express');
const router = express.Router();
const{generateNewShortUrl,handleGetAnalystics,getAllUrls}= require('../controllers/url');

router.post('/', generateNewShortUrl);
router.get('/analytics/:shortId', handleGetAnalystics);
router.get('/all', getAllUrls);

module.exports = router;