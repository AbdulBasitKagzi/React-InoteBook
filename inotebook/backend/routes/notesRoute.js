const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../model/NoteSchema");
const User = require("../model/UserModel");
const { default: mongoose } = require("mongoose");
const routeNotes = express.Router();

// get all notes request
routeNotes.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    if (!notes) {
      return res.status(400).send("No notes exists");
    }
    return res.status(200).send(notes);
  } catch (error) {
    console.error(error.messgae);
    return res.status(400).send("Some error occured");
  }
});

// add notes request
routeNotes.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "title Should not be empty").isLength({ min: 3 }),
    body("description", "description should not be empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("err");
      return res.status(400).json({
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    try {
      const UserId = req.user.id;
      console.log(UserId);
      const { title, description, tag } = req.body;
      const addedNotes = await Notes.findOne({ user: UserId, title });

      if (!addedNotes) {
        const notes = await Notes.create({
          title,
          description,
          user: UserId,
          tag,
        });
        return res.status(200).send(notes);
      }
      return res.status(400).send("This note already exist by this user");
    } catch (error) {
      console.error(error.messgae);
      return res.status(400).send("Some error occured");
    }
  }
);

// update request
routeNotes.patch(
  "/updatenote/:id",
  [
    body("title", "Enter Valid Title").isLength({ min: 3 }),
    body("description", "description should not be empty").isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
    const id = req.params.id;

    const existingNote = await Notes.findById({ _id: id });
    //   console.log("existingNote", Object.values(existingNote));
    console.log(req.user.id);
    if (!existingNote) {
      return res.status(404).send("Note doesnot exist");
    }
    console.log(req.user.id);
    console.log(existingNote.user.toString());

    if (existingNote.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized user");
    }

    if (req.body.title === "") {
      return res.status(400).send("title should not be empty");
    } else if (req.body.description === "") {
      return res.status(400).send("description should not be empty");
    } else if (req.body.tag === "") {
      return res.status(400).send("tag should not be empty");
    }
    try {
      const updatednote = await Notes.findByIdAndUpdate(
        { _id: id },
        {
          title: req.body.title,
          description: req.body.description,
          tag: req.body.tag,
        },
        {
          new: true,
        }
      );
      console.log(updatednote);
      return res.status(200).send(updatednote);
    } catch (error) {
      console.error(error.messgae);
      return res.status(400).send("Some error occured");
    }
  }
);

// delete notes request
routeNotes.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("document id is not valid");
  }
  const existingNote = await Notes.findById({ _id: id });

  if (!existingNote) {
    return res.status(404).send("Note doesnot exist");
  }
  if (existingNote.user.toString() !== req.user.id) {
    return res.status(401).send("Unauthorized user");
  }
  try {
    const note = await Notes.findByIdAndDelete({ _id: id });
    return res.status(200).send("Deleted");
  } catch (error) {
    console.error(error.messgae);
    return res.status(400).send("Some error occured");
  }
});

module.exports = routeNotes;
