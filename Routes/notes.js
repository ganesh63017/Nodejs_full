const express = require("express");
const router = express.Router(); // Routing Purpose of the Api^S

const {
  getAllNotes,
  postNote,
  getById,
  updateNotes,
  DeleteNotes,
} = require("../Controllers/notes");

router.get("/getAllNotes/", getAllNotes);

router.post("/postNotes/", postNote);

router.get("/getById/:id", getById);

router.put("/updateNotes/:id", updateNotes);

router.delete("/deleteNotes/:id", DeleteNotes);

module.exports = router;
