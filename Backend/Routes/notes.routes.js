const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { noteModel } = require("../models/note.model");

const notesController = Router();

notesController.get("/", async (req, res) => {
  const notes = await noteModel.find({ userId: req.body.userId });
  res.send(notes);
});

notesController.post("/create", async (req, res) => {
  const { Heading, Tag, Note, userId } = req.body;
  const note = new noteModel({
    Heading,
    Tag,
    Note,
    userId,
  });
  try {
    await note.save();
    res.send("Note created");
  } catch (err) {
    res.send("Something went wrong");
  }
});

notesController.delete("/delete/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const deleteNote = await noteModel.findOneAndDelete({_id: noteId, userId: req.body.userId,});
  if (deleteNote) {
    res.status(200).send("Deleted successfully");
  } else {
    res.send("Couldn't deleted");
  }
});

notesController.patch("/edit/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const editNote = await noteModel.findOneAndUpdate({_id: noteId,userId: req.body.userId},req.body);
    if (editNote) {
      res.send("Edited successfully");
    } else {
      res.send("Couldn't edited");
    }
  });

module.exports = {
  notesController,
};
