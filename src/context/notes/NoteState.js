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
      "_id": "625e9eacff77fd66ac3240b7",
      "user": "625525e9d04ed05ce86416d3",
      "title": "evening hai shava shava",
      "description": "Walk at 6:00 PM sharp",
      "tag": "public",
      "date": "2022-04-19T11:36:12.983Z",
      "__v": 0
    }
  ] 

  const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>{props.children}</NoteContext.Provider>
        // I can also write {{state:state, update:update}}
    );
};

export default NoteState;
