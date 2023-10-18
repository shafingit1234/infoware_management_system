const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.view);
router.get("/addemployee", employeeController.form);
router.get("/editemployee/:id", employeeController.edit);
router.get("/:id", employeeController.delete);
router.get("/viewemployee/:id", employeeController.viewall);
router.post("/", employeeController.find);
router.post("/addemployee", employeeController.create);
router.post("/editemployee/:id", employeeController.update);
module.exports = router;
