import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Dashboard from "../TeacherDashboard/TeacherContent/Dashboard";
import MyCourses from "../TeacherDashboard/TeacherContent/MyCourses";
import StudentAssignments from "../TeacherDashboard/TeacherContent/StudentAssignments.js";
import Chat from "../../Reusables/Chat";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  json,
} from "react-router-dom";
import { Box } from "@mui/system";
import TeacherNavbar from "./TeacherNavbar";
import Profile from "../../Reusables/profile";
import { API } from "../../BaseURLProvider";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Payment, PhotoCamera, PictureAsPdf } from "@mui/icons-material";
import { toast } from "react-toastify";
import "../../assets/customCss.css";
import { removeCookies } from "../../configurations/systemUtillies";
import PaymentVerification from "../TeacherDashboard/TeacherContent/PaymentVerification.js";
import Quiz from "../TeacherDashboard/TeacherContent/Quiz.js";
const TeacherIndex = () => {
  const [mobileOpen, setmobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setmobileOpen(!mobileOpen);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      md: "40%",
      sm: "60%",
      xs: "80%",
    },
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: "20px",
    p: 4,
  };

  const [isVerify, setVerify] = useState(false);
  const [isSubmittedDoc, setIsSubmittedDoc] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [ProfileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState(false);
  const [teacherCourse, setTeacherCourse] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    API.get(`/teacher/getDocumentByTeacher`).then((res) => {
      if (res.data.teacherVerify) {
        setIsSubmittedDoc(true);
        if (res.data.teacherVerify.isVerified) {
          setVerify(true);
        } else {
          setOpen(true);
        }
      } else {
        setIsSubmittedDoc(null);
        setOpen(true);
      }
    });

    API.get("/course/").then((res) => {
      setCourses(res.data.courses);
      setTeacherCourse(res.data.courses[0]._id);
    });
  }, []);

  const handleFileChange = (event) => {
    setError(false);
    setUploadError("");
    setPdfFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("document", pdfFile);
    formData.append("course", teacherCourse);
    formData.append("qrPhoto", selectedFile);

    if (pdfFile && selectedFile) {
      API.post("/user/teacher-documents", formData)
        .then((response) => {
          toast.success("Your document have been submitted successfully");
          setIsSubmittedDoc(true);
        })
        .catch((error) => console.log(error));
    } else {
      setUploadError("QR IMAGE OR DOCUMENT IS MISSING. PLEASE UPLOAD BOTH");
      setError(true);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    previewFile(file);
    setError(false);
    setUploadError("");
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TeacherNavbar
          mobileOpen={mobileOpen}
          handleDrawerOpen={handleDrawerOpen}
        />
        <Box
          sx={{
            display: {
              sm: "flex",
            },
          }}
        >
          <SideBar
            mobileOpen={mobileOpen}
            handleDrawerOpen={handleDrawerOpen}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              minHeight: "91vh",
              background: "#efefef",
            }}
          >
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route
                path="PaymentVerification"
                element={<PaymentVerification />}
              />
              <Route path="MyCourses" element={<MyCourses />} />
              <Route
                path="StudentAssignments"
                element={<StudentAssignments />}
              />
              <Route path="Quiz" element={<Quiz />} />
              <Route path="Chat" element={<Chat />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </Box>
        </Box>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {!isSubmittedDoc ? (
              <>
                <Grid container>
                  <Grid item sx={12}>
                    <Typography>Verification</Typography>
                  </Grid>
                  <Grid item sx={12}>
                    <Alert severity="info">
                      In order to know that you are a verified teacher, you are
                      asked to upload your academic certification which can
                      include Bachelor's Degree, Master's Degree Certifaction.
                      <span style={{ fontWeight: "bold" }}>
                        Highly Recommended{" "}
                      </span>
                      : Teaching Liscense.
                    </Alert>
                  </Grid>
                  <Grid item sx={12} mt={4}>
                    <span
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      How to upload?
                    </span>
                    <br></br>
                    1. Select a course you are willing to teach. <br></br> 2.
                    Place all your cerfication and qualification document in a
                    single pdf file.<br></br> 3. Click on the button below and
                    choose the file.<br></br>4. Upload your QR Code of Fonepay
                  </Grid>
                  <Grid item xs={6} mt={3}>
                    <TextField
                      id="outlined-select-currency-native"
                      select
                      label="Select a course"
                      size="small"
                      defaultValue="EUR"
                      SelectProps={{
                        native: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={teacherCourse}
                      helperText="Please select a course"
                      onChange={(e) => {
                        setTeacherCourse(e.target.value);
                      }}
                    >
                      {courses.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.courseName}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
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
                  </Grid>

                  <Grid item>
                    <Typography color={"red"} sx={{ my: 3 }}>
                      {pdfFile ? `You Selected :${pdfFile.name} ` : " "}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} display={"flex"}>
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        my: 2,
                      }}
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleFileSelect}
                      />
                      <Payment sx={{ mr: 1 }} /> Upload Payment QR
                    </Button>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Avatar
                      src={ProfileImage}
                      sx={{ borderRadius: 0, width: 150, height: 150 }}
                    ></Avatar>
                  </Grid>
                  <Grid item xs={12}>
                    {error && <Alert severity="error">{uploadError}</Alert>}
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" onClick={handleFormSubmit}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid container justifyContent={"center"}>
                <Grid item xs={12} textAlign={"center"} fontWeight={"bold"}>
                  The verification for the document is in pending status.
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="status -pending">Pending</div>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    sx={{ mt: "20px" }}
                    onClick={() => {
                      removeCookies("token");
                      navigate("/login");
                    }}
                  >
                    Go back to login
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TeacherIndex;
