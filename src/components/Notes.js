import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  // destructure of context. Usme se notes and setnotes extract krne.

  return (
    <>
      <AddNote />
          <div className="row my-3">
               <h2> Your notes</h2>
               {notes.map((note) => {
               // Not getting why note is used in map function instead of notes.
                return <Noteitem key={note._id} note={note} />;
        })}
          </div>
    </>
  );
};

export default Notes
