import React from "react";
import { useToast } from "../Contexts/ToastContext";
import { useToDo } from "../Contexts/ToDosContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function ToDo({ todo, deletefunction, editfunction }) {
  const { toDos, dispatch } = useToDo();
  const { ShowHideToast } = useToast();

  function handleCheck() {
    dispatch({ type: "complete", payload: todo });
    ShowHideToast("تم الانجاز بنجاح");
  }
  function handleDelete() {
    deletefunction(todo);
  }

  function handleEdit() {
    editfunction(todo);
  }

  return (
    <>
      <Card
        sx={{ minWidth: 275 }}
        style={{
          margin: "20px",
          backgroundColor: "rgb(12 88 184)",
          color: "white",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              xs={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <CheckIcon
                onClick={() => handleCheck()}
                style={{
                  backgroundColor: todo.completed ? "green" : "#f7f6ff",
                  borderRadius: "50%",
                  border: "2px solid green",
                  color: todo.completed ? "#f7f6ff" : "green",
                  padding: "5px",
                }}
              />
              <DeleteIcon
                onClick={() => handleDelete()}
                style={{
                  backgroundColor: "#f7f6ff",
                  borderRadius: "50%",
                  border: "2px solid rgb(179 30 30)",
                  color: "rgb(179 30 30)",
                  padding: "5px",
                }}
              />
              <EditIcon
                onClick={() => handleEdit()}
                style={{
                  backgroundColor: "#f7f6ff",
                  borderRadius: "50%",
                  border: "2px solid #221ea9",
                  color: "#221ea9",
                  padding: "5px",
                }}
              />
            </Grid>
            <Grid xs={8}>
              <Typography
                variant="h5"
                component="div"
                style={{
                  textAlign: "right",
                  fontFamily: " 'Marhey', sans-serif ",
                  textDecoration: todo.completed ? "line-through" : "",
                }}
              >
                <b>{todo.title}</b>
              </Typography>
              <Typography
                variant="h7"
                component="div"
                style={{ textAlign: "right" }}
              >
                {todo.body}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default ToDo;
