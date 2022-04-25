const notesModule = require("../Model/notes");

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await notesModule.find({ createdBy: req.body.id });
    res.status(200).json(notes);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.postNote = async (req, res, next) => {
  const newNote = new notesModule(req.body);
  newNote.createdBy = req.body.id;
  try {
    const note = await newNote.save();
    res.status(201).json(note);
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await notesModule.findById(id);
    if (!data) res.status(200).json({ message: "Not Data Found" });
    res.status(200).json(data);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.updateNotes = async (req, res, next) => {
  const { id } = req.params;
  try {
    await notesModule.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status = 400;
    next(err);
  }
};

exports.DeleteNotes = async (req, res, next) => {
  const { id } = req.params;
  try {
    await notesModule.findByIdAndRemove(id);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
