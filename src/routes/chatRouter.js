const express = require("express");
const chatController = require("../controllers/chatController");
const authorize = require("../middlewares/authorize");

const router = express.Router();

// Message controllers.
router.get("/messages/:chatId", authorize, chatController.allMessages);
router.post("/message/add/:chatId", authorize, chatController.sendMessage);

// Chat controllers.
router.get("/", authorize, chatController.allMessages);
router.post("/:userId", authorize, chatController.fetchChats);
module.exports = router;
