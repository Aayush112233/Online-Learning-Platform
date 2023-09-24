import { Edit, PostAdd, Upload } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import "../../../assets/customScroll.css";
import { useForm } from "react-hook-form";
import FormValidation from "../../../Validator/auth.Validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "../../../BaseURLProvider";
import { toast } from "react-toastify";
import { Context } from "../../../Context/ContextConfig";
import DeleteConfirmation from "../../../Reusables/DeleteConfirmation";
import AddAssignment from "./AddAssignment";

const MyCourses = () => {
  const { user } = useContext(Context);
  const [teacherCourse, setTeacherCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignment, setAssignments] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [editInfo, setEditInfo] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);

  const CardStyle = {
    minHeight: "100%",
    padding: "15px",
    textAlign: "center",
  };
  const useStyles = styled((theme) => ({
    card: {
      marginBottom: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const {
    register: announcement,
    handleSubmit: announcementSubmit,
    formState: { errors: announcementError },
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidation.Announcement),
  });

  useEffect(() => {
    API.get("/teacher/getAllDetails")
      .then((res) => {
        if (res.data) {
          setTeacherCourses(res.data.alldetails);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (user) {
      getAllAnnouncements();
      getAllAssignment(user._id);
      getMyStudent();
    }
  }, [teacherCourse, user]);

  const getAllAnnouncements = () => {
    API.get(`/teacher/getAnnouncements/${user._id}`)
      .then((res) => {
        if (res.data) {
          setAnnouncements(res.data.announcements);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handlePost = (data) => {
    API.post("teacher/postAnnouncements", data)
      .then((res) => {
        toast.success("Added Successfully");
        getAllAnnouncements();
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  const handleDelete = (item) => {
    setDeleteOpen(true);
    setDeleteInfo(item);
  };

  const deleteAnnouncement = () => {
    API.delete(`/teacher/deleteAnnouncements/${deleteInfo._id}`)
      .then((res) => {
        toast.success("Announcement Deleted Succesfully");
        getAllAnnouncements();
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  const getMyStudent = () => {
    API.get("/teacher/getMyStudent")
      .then((res) => {
        setStudentList(res.data.studentList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (item) => {
    setEditInfo(item);
    setValue("title", item.title);
    setValue("post", item.post);
    setEdit(true);
  };

  const updateAnnouncement = (data) => {
    API.put(`/teacher/updateAnnouncements/${editInfo._id}`, data)
      .then((res) => {
        toast.success("Announcement Updated Succesfully");
        getAllAnnouncements();
        setEdit(false);
        setValue("title", "");
        setValue("post", "");
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  const getAllAssignment = (id) => {
    API.get(`/teacher/getAllAssignments/${id}`)
      .then((res) => {
        setAssignments(res.data.assignment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("the assignments", assignment);
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
  return (
    <>
      <Box sx={{ height: "100%" }}>
        {!teacherCourse ? (
          <>Loading</>
        ) : (
          <>
            <DeleteConfirmation
              open={deleteOpen}
              setOpen={setDeleteOpen}
              handleSubmit={deleteAnnouncement}
            />
            <Grid container minHeight={1} spacing={3} justifyContent={"center"}>
              <Grid item xs={12} md={6} lg={3} order={{ xs: 3, lg: 1 }}>
                <Card sx={CardStyle}>
                  <Typography variant="h5">Student List</Typography>
                  <Divider sx={{ mt: 1 }}></Divider>
                  <Grid
                    className="scrollDiv"
                    container
                    mt={1}
                    spacing={2}
                    sx={{ maxHeight: "70vh", overflow: "auto" }}
                  >
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 1,
                        bgcolor: "background.paper",
                        my: "15px",
                      }}
                    >
                      {studentList?.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <ListItem alignItems="center" sx={{ my: "10px" }}>
                              <ListItemAvatar>
                                <Avatar
                                  alt={item.student.firstName}
                                  src={item.student.profilePic}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {item.student.firstName +
                                        " " +
                                        item.student.lastName}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            {index !== studentList.length - 1 && <Divider />}
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </Grid>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={5}
                order={{ xs: 1, lg: 2 }}
                minHeight={1}
              >
                <Card sx={CardStyle}>
                  {" "}
                  <Typography variant="h5">Post and Annoucements</Typography>
                  <Divider sx={{ mt: 1 }}></Divider>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={12}>
                      <Typography variant="h6" textAlign={"start"}>
                        Post New Announcement or Notices
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-static"
                        error={!!announcementError.title}
                        label="Title"
                        defaultValue=""
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...announcement("title")}
                        helperText={
                          announcementError.title
                            ? announcementError.title.message
                            : ""
                        }
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-static"
                        error={!!announcementError.post}
                        label="Write Announcment"
                        defaultValue=""
                        {...announcement("post")}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={
                          announcementError.post
                            ? announcementError.post.message
                            : ""
                        }
                        fullWidth
                        size="small"
                        multiline
                        rows={3}
                      />
                    </Grid>
                    {isEdit ? (
                      <>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          justifyContent={"start"}
                          gap={"1rem"}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<PostAdd />}
                            onClick={announcementSubmit(updateAnnouncement)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<PostAdd />}
                            onClick={() => {
                              setEdit(false);
                              setValue("post", "");
                              setValue("title", "");
                            }}
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <Grid
                        item
                        xs={12}
                        display={"flex"}
                        justifyContent={"start"}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<PostAdd />}
                          onClick={announcementSubmit(handlePost)}
                        >
                          Post
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    className="scrollDiv"
                    container
                    sx={{
                      maxHeight: "50vh",
                      overflow: "auto",
                      mt: 2,
                      padding: 2,
                    }}
                  >
                    {announcements.length > 0 ? (
                      <>
                        {announcements.map((item) => (
                          <Grid item xs={12} sx={{ my: 2 }}>
                            <Card
                              className={classes.card}
                              key={item._id}
                              sx={{
                                display: "flex",
                                padding: "10px",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                              }}
                            >
                              <Grid container>
                                <Grid xs={12} md={6}>
                                  <Chip
                                    variant="outlined"
                                    sx={{ ml: "10px" }}
                                    label={`Posted On: ${dateConversion(
                                      item.date
                                    )}`}
                                    color="primary"
                                  />
                                </Grid>
                                <Grid
                                  xs={12}
                                  md={6}
                                  display={"flex"}
                                  justifyContent={"end"}
                                >
                                  <IconButton
                                    aria-label="edit"
                                    color="primary"
                                    onClick={() => {
                                      handleEdit(item);
                                    }}
                                  >
                                    <Edit />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    sx={{ color: "#a82020" }}
                                    onClick={() => {
                                      handleDelete(item);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>

                              <CardContent>
                                <Typography
                                  variant="h6"
                                  mb={2}
                                  textAlign={"start"}
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  color="textSecondary"
                                  component="p"
                                  sx={{ textAlign: "start" }}
                                >
                                  {item.post}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </>
                    ) : (
                      <Grid item xs={12} sx={{ my: 2 }}>
                        <Alert severity="info">
                          <AlertTitle>Hey {user && user.firstName}</AlertTitle>
                          You haven't added any announcements. You can post one
                          from above.
                        </Alert>
                      </Grid>
                    )}
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4} order={{ xs: 2, lg: 3 }}>
                <Card sx={CardStyle}>
                  {" "}
                  <Typography variant="h5">Assignment</Typography>
                  <Divider sx={{ mt: 1 }}></Divider>
                  <Grid container mt={1}>
                    <Grid item xs={12}>
                      <Button
                        startIcon={<Upload />}
                        onClick={() => {
                          setAssignmentOpen(true);
                        }}
                      >
                        Add Assignment
                      </Button>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: 1 }}></Divider>
                  <Grid
                    className="scrollDiv"
                    container
                    mt={1}
                    spacing={2}
                    sx={{ maxHeight: "60vh", overflow: "auto" }}
                  >
                    {assignment?.map((item) => {
                      return (
                        <>
                          <Grid item xs={12}>
                            <Alert icon={false}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Typography fontWeight={"bold"}>
                                    {item.title}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    component="p"
                                    sx={{ textAlign: "start" }}
                                  >
                                    Published On :{" "}
                                    {dateConversion(item.assignedDate)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    component="p"
                                    sx={{ textAlign: "start" }}
                                  >
                                    Deadline :{" "}
                                    {dateConversion(item.deadlineDate)}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Alert>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <AddAssignment
              setAssignmentOpen={setAssignmentOpen}
              assignmentOpen={assignmentOpen}
              getAllAssignment={getAllAssignment}
              user={user}
            />
          </>
        )}
      </Box>
    </>
  );
};
export default MyCourses;
