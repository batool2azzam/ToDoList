import { createContext, useReducer, useContext } from "react";
import ToDoReducer from "../Reducers/ToDoReducer";

export const ToDosContext=createContext([]);

export const ToDosProvider=({children})=>{
    const [toDos,dispatch]=useReducer(ToDoReducer,[]);
    return(
        <ToDosContext.Provider value={{toDos,dispatch}}>
            {children}
        </ToDosContext.Provider>
    );
}
export default ToDosProvider;

export const useToDo=()=>{
    return (
        useContext(ToDosContext)
    );
}