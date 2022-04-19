import NoteContext from "./noteContext";


const NoteState = (props) => {
 

    return (
        <NoteContext.Provider value={{}}>{props.children}</NoteContext.Provider>
        // I can also write {{state:state, update:update}}
    );
};

export default NoteState;
