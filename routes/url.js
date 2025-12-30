const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createUrl,
  getUrls,
  getAnalytics,
  deleteUrl,
} = require("../controllers/url");

router.post("/", auth, createUrl);
router.get("/all", auth, getUrls);
router.get("/analytics/:shortId", auth, getAnalytics);
router.delete("/:id", auth, deleteUrl);

module.exports = router;
