const express = require("express");
const agentController = require("../controllers/agentController");
const authorize = require("../middlewares/authorize");
const restrict = require("../middlewares/restrict");

const router = express.Router();

router.get("/reports/today/:id", authorize, restrict("agent"), agentController.getReportsToday);
router.post("/trade/create", authorize, restrict("agent"), agentController.createTradeToFarmer);
router.patch("/report/:id", authorize, restrict("agent"), agentController.acknowledgeReport);

module.exports = router;
