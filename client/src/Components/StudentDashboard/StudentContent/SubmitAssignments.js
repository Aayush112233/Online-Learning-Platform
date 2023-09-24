import { PictureAsPdf } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { API } from "../../../BaseURLProvider";
import { toast } from "react-toastify";

const SubmitAssignments = ({
  setSubmitAssignment,
  submitAssignment,
  selectedAssignment,
}) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState(false);
  const [remarks, setRemarks] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      sm: "50%",
      xs: "95%",
    },
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #efeff2",
    borderRadius: "16px",
    boxShadow: 24,
    gap: "1rem",
    p: 4,
  };

  const dateConversion = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handleFileChange = (event) => {
    setError(false);
    setUploadError("");
    setPdfFile(event.target.files[0]);
  };

  const handlePreview = () => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      window.open(url, "_blank");
    }
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const handleAssignmentSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("document", pdfFile);
    formData.append("remarks", remarks);
    formData.append("assignment", selectedAssignment._id);

    if (pdfFile) {
      API.post("/student/student-assignment", formData)
        .then((res) => {
          toast.success("Assignment Submitted Successfully");
          setSubmitAssignment(false);
          setRemarks("");
          setPdfFile("");
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
        });
    } else {
      setUploadError("DOCUMENT IS MISSING. PLEASE UPLOAD");
      alert("DOCUMENT IS MISSING. PLEASE UPLOAD");
      setError(true);
    }
  };

  return (
    <Modal
      open={submitAssignment}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {
        setSubmitAssignment(false);
        setRemarks("");
        setPdfFile("");
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <form onSubmit={handleAssignmentSubmit}>
            <Alert severity="info" icon={false}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {selectedAssignment.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="p" color={"GrayText"} fontSize={"17px"}>
                    {selectedAssignment.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="p" color={"red"} fontSize={"14px"}>
                    Deadline At :{" "}
                    {dateConversion(selectedAssignment.deadlineDate)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    multiline
                    variant="filled"
                    minRows={4}
                    value={remarks}
                    label="Write Down Remarks"
                    fullWidth
                    onChange={handleRemarksChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                gap="1rem"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    my: 1,
                  }}
                >
                  <input
                    hidden
                    accept="application/pdf"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <PictureAsPdf sx={{ mr: 1 }} /> Upload
                </Button>
                {pdfFile ? (
                  <>
                    <Typography variant="p">
                      {" "}
                      You selected : {pdfFile.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      type="submit"
                      onClick={handlePreview}
                    >
                      Preview
                    </Button>
                  </>
                ) : (
                  " "
                )}
              </Grid>
            </Alert>
            <Button
              variant="outlined"
              type="submit"
              onClick={handleAssignmentSubmit}
              sx={{ margin: "auto", width: "100px", mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubmitAssignments;
