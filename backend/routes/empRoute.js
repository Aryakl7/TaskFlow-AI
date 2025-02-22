const express = require("express");
const router = express.Router();
const { createEmp, getAllEmp } = require("../controller/empController");

console.log("Routes enabled...");

router.get("/empList", getAllEmp);
router.post("/create", createEmp);

module.exports = router;