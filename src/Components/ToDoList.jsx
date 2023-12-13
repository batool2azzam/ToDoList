import React, { useState, useEffect } from "react";
import { useToast } from "../Contexts/ToastContext";
import { useToDo } from "../Contexts/ToDosContext"; 
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Unstable_Grid2";
import ToDo from "./ToDo";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function ToDoList() {
    const {toDos,dispatch}=useToDo();
    console.log({toDos,dispatch})
    const {ShowHideToast}=useToast();
    const [addToDo,setAddToDo]=useState("")
    const [selectedButton, setSelectedButton] = useState("all");
    const [todoForDialog,setTodoForDialog]=useState("");
    const [isDialogOpen,setDialogOpen]=useState(false);
    const [editDialog,seteditDialog]=useState(false);
    const [editTitle,setEditTitle]=useState("");
    const [editBody,setEditBody]=useState("");
    
    
    function handleAddTask(){
            dispatch({type:"addTask",
        payload:{id:addToDo}
        })
            setAddToDo("");
            ShowHideToast("تم الاضافة بنجاح");
    }
    function handleTodoForDialog(todo){
        setTodoForDialog(todo)
        setDialogOpen(true)
    }
    function handleEditTodoForDialog(todo) {
        setTodoForDialog(todo);
        seteditDialog(true);
        setEditTitle(todo.title);
        setEditBody(todo.body);
    }
    
    function confirmEdit(){
        seteditDialog(false);
        ShowHideToast("تم التعديل بنجاح");
        dispatch({type:"confirmEdit", 
            payload:{id:todoForDialog.id, title: editTitle ,body:editBody}
        })
    }
    const generateToDoItems = () =>
    toDos.map((e) => (
        <ToDo
            key={e.id}
            todo={e}
            deletefunction={handleTodoForDialog}
            editfunction={handleEditTodoForDialog}
        />
    ));

    const toDoItem = generateToDoItems();
    
    const checkCompleted = (completed) =>
        toDos
            .filter((e) => (completed ? e.completed === true : e.completed === false))
            .map((e) => (
                <ToDo
                    key={e.id}
                    todo={e}
                    deletefunction={handleTodoForDialog}
                    editfunction={handleEditTodoForDialog}
                />
            ));
    const toDoCompleted = checkCompleted(true);
    const toDoUncompleted = checkCompleted(false);

    useEffect(() => {
        dispatch({type:"get"})
    }, []);

    function handleButtonsChange(e,newVal){
        console.log("hi hi")
        if (newVal !== null) {
            setSelectedButton(newVal);
          }
    }
    function confirmDeleting(todo) {
        
        dispatch({type:"confirmDelete", 
            payload:{id:todoForDialog.id}
        })
        setDialogOpen(false);
        ShowHideToast("تم الحذف بنجاح");


    }
    
    return (
        <>
        <Dialog style={{fontSize:"18px"}}
            open={isDialogOpen}
            aria-labelledby="draggable-dialog-title">
            <DialogTitle style={{ cursor: 'move' ,fontSize:"22px" ,fontFamily:" 'Marhey', sans-serif" }} id="draggable-dialog-title">
                        هل أنت متأكد من رغبتك في حذف المهمة؟
            </DialogTitle>
            <DialogContent  >
                <DialogContentText style={{fontSize:"14px" ,fontFamily:" 'Marhey', sans-serif ", direction:"rtl"}}>
                لا يمكنك التراجع عن الحذف في حال اختيار زر الحذف
                </DialogContentText>
            </DialogContent>

            <DialogActions style={{ justifyContent: "flex-start"}}>
                <Button onClick={confirmDeleting} style={{fontSize:"14px" ,fontFamily:" 'Marhey', sans-serif ", color:"red"}}>
                    نعم قم بالحذف 
                </Button>

                <Button onClick={()=>{setDialogOpen(false)}} style={{fontSize:"14px" ,fontFamily:" 'Marhey', sans-serif "}} >
                    إلغاء
                </Button>
                
            </DialogActions>
        </Dialog>
        <Dialog open={editDialog} >
            <DialogTitle style={{ cursor: 'move' ,fontSize:"22px" ,fontFamily:" 'Marhey', sans-serif", direction:"rtl" }} id="draggable-dialog-title">
                        تعديل المهمة
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{fontSize:"14px" ,fontFamily:" 'Marhey', sans-serif ", direction:"rtl"}}>
                قم بإضافة عنوان جديد وتفاصيل للمهمة
                </DialogContentText>
                <TextField  style={{direction:"rtl"}}
                autoFocus
                margin="dense"
                id="name"
                label="العنوان الجديد للمهمة"
                type="text"
                fullWidth
                variant="standard"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <TextField  style={{direction:"rtl"}}
                autoFocus
                margin="dense"
                id="name"
                label="التفاصيل"
                type="text"
                fullWidth
                variant="standard"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
            />
            </DialogContent>
            <DialogActions style={{ justifyContent: "flex-start"}}>
                <Button onClick={confirmEdit} style={{fontSize:"14px" ,fontFamily:" 'Marhey', sans-serif ", color:"red"}}>
                    تعديل المهمة 
                </Button>

                <Button onClick={()=>{seteditDialog(false)}} style={{fontSize:"14px" ,fontFamily:" 'Marhey', sans-serif "}} >
                    إلغاء
                </Button>
            </DialogActions>
        </Dialog>
        <Container maxWidth="sm" style={{ textAlign: "center"}}>
            <Card sx={{ minWidth: 275, backgroundColor: "#f7f6ff",maxHeight:"90vh" ,overflow:"scroll"}}>
                <CardContent>
                    <Typography
                    variant="h2"
                    component="div"
                    style={{
                        fontFamily: " 'Marhey', sans-serif ",
                        fontWeight: "400",
                    }}
                    >
                    مهامي
                    </Typography>
                    <Divider variant="middle" />
                </CardContent>
                <ToggleButtonGroup
                    value={selectedButton}
                    exclusive
                    onChange={handleButtonsChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="uncompleted"
                    style={{
                        fontWeight: "bolder",
                        fontSize: "16px",
                        backgroundColor: "#b90303",
                        color: "white",
                    }}
                    >
                    غير منجز
                    </ToggleButton>
                    <ToggleButton value="completed"
                    style={{
                        fontWeight: "bolder",
                        fontSize: "16px",
                        backgroundColor: "rgb(3 145 3)",
                        color: "white",
                    }}
                    >
                    منجز
                    </ToggleButton>
                    <ToggleButton value="all"
                    style={{
                        fontWeight: "bolder",
                        fontSize: "16px",
                        backgroundColor: "#0065b0",
                        color: "white",
                    }}
                    >
                    الكل
                    </ToggleButton>
                </ToggleButtonGroup>

                    {selectedButton === "all" && toDoItem}
                    {selectedButton === "completed" && toDoCompleted}
                    {selectedButton === "uncompleted" && toDoUncompleted}

                <Grid 
                    container
                    spacing={2}
                    style={{
                        posetion:"fixed",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                >
                    <Grid xs={9}>
                        <TextField
                            value={addToDo}
                            onChange={e=>setAddToDo(e.target.value)}
                            style={{ width: "93%",marginRight:"-15px" }}
                            id="outlined-basic"
                            label="إضافة مهمة"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid xs={3}>
                        <Button
                            onClick={handleAddTask}
                            variant="contained"
                            endIcon={<SendIcon />}
                            style={{ width: "100%", height: "2.8em", fontSize:"20px" ,marginLeft:"-45px" , backgroundColor:"#0060c0"}}
                        >
                            ارسال
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Container>
        </>
    );
    }

export default ToDoList;
