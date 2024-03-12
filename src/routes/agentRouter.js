const express = require("express");
const agentController = require("../controllers/agentController");
const authorize = require("../middlewares/authorize");
const restrict = require("../middlewares/restrict");

const router = express.Router();

router.get(
    "/reports/today/:farmerId",
    authorize,
    restrict("agent"),
    agentController.getReportsToday
);
router.post("/trade/create", authorize, restrict("agent"), agentController.createTradeToFarmer);
router.patch("/report/:reportId", authorize, restrict("agent"), agentController.acknowledgeReport);
router.get("/chatusers", authorize, restrict("agent"), agentController.fetchfarmers);

module.exports = router;
