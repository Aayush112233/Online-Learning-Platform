import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import FormValidation from "../../../Validator/auth.Validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "../../../BaseURLProvider";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AddAssignment = ({ setAssignmentOpen, assignmentOpen, user, getAllAssignment }) => {

  const {
    register: AddAssignment,
    handleSubmit: assignmentSubmit,
    formState: { errors: assignmentError },
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidation.AssignmentValidation),
  });

  const handlePostAssignment = (data) => {
    console.log("the data after validation", data);
    API.post("/teacher/postAssignments", data)
      .then((res) => {
        toast.success("Assignment Posted Successfully");
        setAssignmentOpen(false);
        getAllAssignment(user._id);
      })
      .catch((err) => {
        toast.error("Failed to Post Assignment");
      });
  };

  return (
    <Modal
      open={assignmentOpen}
      onClose={() => {
        setAssignmentOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign={"center"}>
              Post Assignment
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              error={!!assignmentError.title}
              label="Title"
              {...AddAssignment("title")}
              helperText={
                assignmentError.title ? assignmentError.title.message : ""
              }
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              error={!!assignmentError.description}
              label="description"
              {...AddAssignment("description")}
              helperText={
                assignmentError.description
                  ? assignmentError.description.message
                  : ""
              }
              multiline
              variant="filled"
              minRows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!assignmentError.deadlineDate}
                label="Deadline Date"
                type={"date"}
                {...AddAssignment("deadlineDate")}
                helperText={
                  assignmentError.deadlineDate
                    ? assignmentError.deadlineDate.message
                    : ""
                }
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="outlined"
              onClick={assignmentSubmit(handlePostAssignment)}
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddAssignment;
