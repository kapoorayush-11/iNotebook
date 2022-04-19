import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const s1 = {
        "name": "Ayush",
        "class": "5b"
    };

    const [state, setState] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setState(
                {
                    "name": "Piyush",
                    "class": "2a"
                }
            )
        }, 1000);
    }

    return (
        <NoteContext.Provider value={{state, update}}>{props.children}</NoteContext.Provider>
        // I can also write {{state:state, update:update}}
    );
};

export default NoteState;
