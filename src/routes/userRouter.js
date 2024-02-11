const express = require("express");
const multer = require("multer");
const path = require("path");
const userController = require("../controllers/userController");
const authorize = require("../middlewares/authorize");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/users");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const upload = multer({
    limits: {
        fileSize: 2000000,
    },
    fileFilter: (req, file, cb) => {
        const allowed = [".jpg", ".jpeg", ".png", ".webp"];
        const ext = path.extname(file.originalname);
        if (!allowed.includes(ext)) {
            return cb(new Error("Please upload jpg, jpeg, webp, or png"));
        }
        cb(undefined, true);
    },
    storage: storage,
});

router.post("/signup", userController.doSignUp);
router.post("/signin", userController.doSignIn);
router
    .route("/me")
    .get(authorize, userController.myAccount)
    .patch(authorize, upload.single("avatar"), userController.updateMe)
    .delete(authorize, userController.deleteMe);

module.exports = router;
