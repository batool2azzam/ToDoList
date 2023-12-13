import './App.css'
import ToDoList from './Components/ToDoList';
import React from 'react';
import ToDosProvider from "./Contexts/ToDosContext";
import { ToastProvider } from './Contexts/ToastContext';

export default function App() {

  

//   const initialToDos=[
//     {
//         id:uuidv4(),
//         title:"المهمة الاولى",
//         body:"تةنهتهنتهناىاىهخاىتخىختىاخت",
//         completed:false
//     },
//     {
//         id:uuidv4(),
//         title:"المهمة 2",
//         body:"تةنهتهنتهناىاىهخاىتخىختىاخت",
//         completed:false
//     },
//     {
//         id:uuidv4(),
//         title:"المهمة 3",
//         body:"تةنهتهنتهناىاىهخاىتخىختىاخت",
//         completed:false
//     }
// ];
  
return (
    <>
      <div className='App'>
        <ToDosProvider>
          <ToastProvider >
          <ToDoList/>
          </ToastProvider>
        </ToDosProvider>
        
      </div>
    </>
  );
}