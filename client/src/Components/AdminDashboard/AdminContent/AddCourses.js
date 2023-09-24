import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormValidation from "../../../Validator/auth.Validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Image, Preview } from "@mui/icons-material";
import { API } from "../../../BaseURLProvider";
const AddCourses = ({
  open,
  handleClose,
  refreshTable,
  editData,
  formStatus,
}) => {
  const {
    register: courseForm,
    handleSubmit: courseSubmit,
    formState: { errors: courseError },
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidation.CourseListValidator),
  });
  const [screenShotImage, setScreenShotImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (formStatus === "edit") {
      setValue("courseName", editData.courseName);
      setValue("courseCode", editData.courseCode);
      setValue("courseDuration", editData.courseDuration);
      setValue("coursePrice", editData.coursePrice);
      setValue("courseDescription", editData.courseDescription);
    }
  }, [editData, formStatus]);

  useEffect(() => {
    if (formStatus === "add") {
      setValue("courseName", "");
      setValue("courseCode", "");
      setValue("courseDuration", "");
      setValue("coursePrice", "");
      setValue("courseDescription", "");
    }
  }, [formStatus]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      md: "70%",
      xs: "95%",
    },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const previewStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 4,
  };

  const handleCourseSubmit = (data) => {
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseCode", data.courseCode);
    formData.append("courseDuration", data.courseDuration);
    formData.append("coursePrice", data.coursePrice);
    formData.append("courseDescription", data.courseDescription);
    formData.append("courseImage", selectedFile);
    API.post("/course/addCourse", formData)
      .then((res) => {
        toast.success("Course Added Successfully");
        setValue("courseName", "");
        setValue("courseCode", "");
        setValue("courseDuration", "");
        setValue("coursePrice", "");
        setValue("courseDescription", "");
        refreshTable();
        handleClose();
      })
      .catch((err) => {
        if (err) {
          toast.error("Failed to Add");
        }
      });
  };
  const handleCourseUpdate = (data) => {
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseCode", data.courseCode);
    formData.append("courseDuration", data.courseDuration);
    formData.append("coursePrice", data.coursePrice);
    formData.append("courseDescription", data.courseDescription);
    formData.append("courseImage", selectedFile);
    API.put("/course/editCourse/" + editData._id, formData)
      .then((res) => {
        toast.success("course sucessfully updated");
        setScreenShotImage("");
        setSelectedFile("");
        refreshTable();
        handleClose();
      })
      .catch((err) => {
        if (err) {
          toast.error("failed to update");
        }
      });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setScreenShotImage(reader.result);
    };
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" mb={2} fontWeight="bold">
            {formStatus === "add" ? "Add Courses" : "Edit Courses"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!courseError.courseName}
                label="Course Name"
                {...courseForm("courseName")}
                helperText={
                  courseError.courseName ? courseError.courseName.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!courseError.courseCode}
                label="Course Code"
                {...courseForm("courseCode")}
                helperText={
                  courseError.courseCode ? courseError.courseCode.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-number"
                error={!!courseError.courseDuration}
                label="Course Duration"
                {...courseForm("courseDuration")}
                helperText={
                  courseError.courseDuration
                    ? courseError.courseDuration.message
                    : ""
                }
                type="number"
                defaultValue={"1"}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">month</InputAdornment>
                  ),
                  inputProps: { min: 1, max: 3 },
                }}
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!courseError.coursePrice}
                label="Course Price"
                {...courseForm("coursePrice")}
                helperText={
                  courseError.coursePrice ? courseError.coursePrice.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-multiline-static"
                error={!!courseError.courseDescription}
                label="Course Description"
                {...courseForm("courseDescription")}
                helperText={
                  courseError.courseDescription
                    ? courseError.courseDescription.message
                    : ""
                }
                multiline
                rows={4}
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"1rem"}
              display="flex"
              flexDirection={"column"}
            >
              {screenShotImage ? (
                <IconButton
                  onClick={() => {
                    setPreviewOpen(open);
                  }}
                >
                  <Preview /> Preview
                </IconButton>
              ) : null}

              <Button
                startIcon={<Image />}
                variant="outlined"
                component="label"
              >
                Upload Course Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileSelect}
                />
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
              spacing={5}
            >
              {formStatus === "add" ? (
                <Button
                  sx={{ minWidth: "120px" }}
                  variant="contained"
                  onClick={courseSubmit(handleCourseSubmit)}
                >
                  Add
                </Button>
              ) : (
                <Button
                  sx={{ minWidth: "120px" }}
                  variant="contained"
                  onClick={courseSubmit(handleCourseUpdate)}
                >
                  Update
                </Button>
              )}
            </Grid>
          </Grid>
          <Modal
            open={previewOpen}
            onClose={() => {
              setPreviewOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={previewStyle}>
              <Avatar
                sx={{ borderRadius: 0, width: "100%", height: "auto" }}
                alt="Image Preview"
                src={screenShotImage}
              ></Avatar>
            </Box>
          </Modal>
        </Box>
      </Modal>
    </>
  );
};

export default AddCourses;
