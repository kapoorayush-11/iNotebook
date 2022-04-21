import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
 const notesInitial = [
    {
      "_id": "6259201aee1b473bfa57dff9",
      "user": "625525e9d04ed05ce86416d3",
      "title": "Morning",
      "description": "Walk at 7:00 AM",
      "tag": "public",
      "date": "2022-04-15T07:34:50.782Z",
      "__v": 0
    },
    {
      "_id": "625e9eacff77fd66ac3240b71",
      "user": "625525e9d04ed05ce86416d3",
      "title": "evening hai shava shava",
      "description": "Walk at 6:00 PM sharp",
      "tag": "public",
      "date": "2022-04-19T11:36:12.983Z",
      "__v": 0
    },

    {
      "_id": "625e9eacff77fd66ac3240b72",
      "user": "625525e9d04ed05ce86416d3",
      "title": "evening hai shava shava",
      "description": "Walk at 6:00 PM sharp",
      "tag": "public",
      "date": "2022-04-19T11:36:12.983Z",
      "__v": 0
    },

    {
      "_id": "625e9eacff77fd66ac3240b73",
      "user": "625525e9d04ed05ce86416d3",
      "title": "evening hai shava shava",
      "description": "Walk at 6:00 PM sharp",
      "tag": "public",
      "date": "2022-04-19T11:36:12.983Z",
      "__v": 0
    },

    {
      "_id": "625e9eacff77fd66ac3240b74",
      "user": "625525e9d04ed05ce86416d3",
      "title": "evening hai shava shava",
      "description": "Walk at 6:00 PM sharp",
      "tag": "public",
      "date": "2022-04-19T11:36:12.983Z",
      "__v": 0
    },

    {
      "_id": "625e9eacff77fd66ac3240b75",
      "user": "625525e9d04ed05ce86416d3",
      "title": "evening hai shava shava",
      "description": "Walk at 6:00 PM sharp",
      "tag": "public",
      "date": "2022-04-19T11:36:12.983Z",
      "__v": 0
    },


  ] 

  const [notes, setNotes] = useState(notesInitial)

  // Add a note

  const addNote = (title, description, tag) => {
    //TODO: API call

    console.log("Adding a new note")

    const note = {
      "_id": "625e9eacff77fd66ac3240b754",
      "user": "625525e9d04ed05ce86416d3",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-04-19T11:36:12.983Z",
      "__v": 0
    }

    setNotes(notes.concat(note))
  }

  // Delete a note

  const deleteNote = (id) => {
    console.log("Deleting the note with id " + id);
   const newNotes= notes.filter((note) =>{ return note._id !== id});
    setNotes(newNotes)
  }


  //Edit a note

  const editNote = () => {
    
  }


    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote  }}>{props.children}</NoteContext.Provider>
        // I can also write {{state:state, update:update}}
    );
};

export default NoteState;
