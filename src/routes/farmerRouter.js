const express = require("express");
const farmerController = require("../controllers/farmerController");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.get("/transaction", authorize, farmerController.listTransactions);
router.post("/farms", authorize, farmerController.listFarms);
router.post("/reports", authorize, farmerController.listFarmReports);
router.patch("/farm/:id", authorize, farmerController.updateFarmData);
router.post("/report/:id", authorize, farmerController.createFarmReport);

module.exports = router;
