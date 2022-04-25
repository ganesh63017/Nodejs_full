const express = require("express");
const router = express.Router(); // Routing Purpose of the Api^S
const { register, login } = require("../Controllers/user");

router.post("/register", register); // Register Route

router.post("/login", login); // Login Route;

module.exports = router;
