const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes using : GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);

} catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured paaji");
}
});

// ROUTE 2: Add a new note using : POST "/api/notes/addnote". Login required.
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Title must be atleast 3 character").isLength({ min: 3 }),
        body("description", "Description must be atleast 5 character").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try { 
            const { title, description, tag} = req.body;
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured janaab");
    }
});

module.exports = router
