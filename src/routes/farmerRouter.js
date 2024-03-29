const express = require("express");
const farmerController = require("../controllers/farmerController");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.post("/farm/create", authorize, farmerController.createFarmData);
router.get("/transaction", authorize, farmerController.listTransactions);
router.get("/farms", authorize, farmerController.listFarms);
router.patch("/farm/:id", authorize, farmerController.updateFarmData);
router.post("/report/:farmId", authorize, farmerController.createFarmReport);
router.get("/reports/:id", authorize, farmerController.listFarmReports);
router.get("/chatusers", authorize, farmerController.fetchCoFarmersAndAgent);

module.exports = router;
