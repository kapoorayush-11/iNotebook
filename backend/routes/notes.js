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
            min: 5 }),
    ],
    async (req, res) => {
        try { 
            const { title, description, tag} = req.body;  // destructuring. Body se inn cheezo ko uthana
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

// ROUTE 3: Update existing note using : POST "/api/notes/updatenote". Login required.
router.put( "/updatenote/:id", fetchuser, async (req, res) => {

const {title, description, tag} = req.body;

// Create a newNote object
const newNote = {};
if(title){newNote.title = title};

if(description){newNote.description = description};

if(tag){newNote.tag = tag};

// Find the note to be updated and update it
let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("not found nahi miliya");  }

if(note.user.toString() !== req.user.id){
    return res.status(401).send("Unauthorised access");
}

// Dono if se yeh toh pata lag gya ki note exist krta hai and vohi user jiska hai yeh isko update krne ka attempt kr rha

note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
//new true ka matlab ki naya content aayega toh vo update ho jayega.
res.json({note});
})

module.exports = router
