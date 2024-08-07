const express = require("express");
const { signup, getAllUsers  } = require("./controllers.js");

const router = express.Router();

router.post("/signup", signup);
router.get("/allUser", getAllUsers);

module.exports = router;
