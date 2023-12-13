import { createContext,useContext,useState } from "react";
import MySnackBar from "../Components/MySnackBar";

const ToastContext=createContext({});
 
export const ToastProvider =({children})=>{
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    function ShowHideToast(message){
        setOpen(true);
        setMessage(message)
        setTimeout(() => {
        setOpen(false)
        }, 2000);
    }
    return(
        <>
            <ToastContext.Provider value={{ShowHideToast}}>
                <MySnackBar open={open} message={message}/>
                {children}
            </ToastContext.Provider> 
        </>
    );
}
export const useToast=()=>{
    return (
        useContext(ToastContext)
    );
}