import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [ ]

  const [notes, setNotes] = useState(notesInitial)

// Get a note
  const getNotes = async () => {
// API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1NTI1ZTlkMDRlZDA1Y2U4NjQxNmQzIn0sImlhdCI6MTY0OTkzNDUyMH0.dH1ogBs197EX1XrOfix4MFRxN5EUCkcHw1J62wk2pf0"
      },
    });
 const json = await response.json();
 setNotes(json);
  }


  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1NTI1ZTlkMDRlZDA1Y2U4NjQxNmQzIn0sImlhdCI6MTY0OTkzNDUyMH0.dH1ogBs197EX1XrOfix4MFRxN5EUCkcHw1J62wk2pf0"
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note)) 
  }

  // Delete a note

  const deleteNote = async (id) => {
    // API call - backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1NTI1ZTlkMDRlZDA1Y2U4NjQxNmQzIn0sImlhdCI6MTY0OTkzNDUyMH0.dH1ogBs197EX1XrOfix4MFRxN5EUCkcHw1J62wk2pf0"
    },
  });

  const json = response.json();


  //Frontend
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes)
  }

  //Edit a note

  const editNote = async (id, title, description, tag) => {

    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1NTI1ZTlkMDRlZDA1Y2U4NjQxNmQzIn0sImlhdCI6MTY0OTkzNDUyMH0.dH1ogBs197EX1XrOfix4MFRxN5EUCkcHw1J62wk2pf0"
              },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();


    let newNotes = JSON.parse(JSON.stringify (notes))

    //logic to edit in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }    
    }
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</NoteContext.Provider>
    // I can also write {{state:state, update:update}}
  );
};

export default NoteState;
