import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  // destructure of context. Usme se notes and setnotes extract krne.
 

  useEffect(() => {
 getNotes()
// eslint-disable-next-line
  }, [])

const ref = useRef(null)
const refClose = useRef(null)
const [note, setNote] = useState({ id:"",  etitle:"", edescription:"", etag:""})

const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,   etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  } 

const handleClick = (e) => {
  editNote(note.id, note.etitle, note.edescription, note.etag)
  refClose.current.click(); 
}  

const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value })
        }


  return (

    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Update Note
    </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">



            <form className='my-3'>
            <div className="mb-3">
              <label htmlFor="etitle" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} placeholder="" aria-describedby="emailHelp" onChange={onChange}  minLength={5} required  />
            </div>
      
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">Description</label>
              <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} placeholder="" aria-describedby="" onChange={onChange} minLength={5} required />
            </div>
      
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="" aria-describedby="" onChange={onChange}/>
            </div>
           
          </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}  type="button" className="btn btn-secondary" data-dismiss="modal">Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <h2> Your notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          // Not getting why note is used in map function instead of notes.
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes
