const express = require("express");
const chatController = require("../controllers/chatController");
const authorize = require("../middlewares/authorize");

const router = express.Router();
// Chat controllers.

// Message controllers.
router.get("/messages/:chatId", authorize, chatController.allMessages);
router.post("/message/add/:chatId", authorize, chatController.sendMessage);
module.exports = router;
