const router = require("express").Router();
import {
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
} from "../controller/userController";
router.get("/", getAllUser);
router.get("/", getOneUser);

router.put("/:id", updateUser);
router.delete("/", deleteUser);

module.exports = router;
