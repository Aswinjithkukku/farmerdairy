const express = require("express");
const userController = require("../controllers/userController");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.post("/signup", userController.doUserSignup);
router.post("/signin", userController.doSignIn);
router
    .route("/me")
    .get(authorize, userController.myAccount)
    .patch(authorize, userController.updateUser);
router.get("/", authorize, userController.fetchUsers);
router.get("/agents/list", userController.listAgents);
module.exports = router;
