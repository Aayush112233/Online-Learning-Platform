import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  TextField,
  CardMedia,
  Chip,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import ContentPasteSearchTwoToneIcon from "@mui/icons-material/ContentPasteSearchTwoTone";
import SelectionForm from "../EnrollContent/SelectionForm";
import PaymentForm from "../EnrollContent/PaymentForm";
import { API } from "../../../BaseURLProvider";

const AllCourses = () => {
  const [Allcourse, setAllCourse] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [displayCourse, setDisplay] = React.useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [teacher, setTeacher] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [filteredCourses, setFilteredCourses] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTeacher("");
    setValue(0);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      sm: 600,
      xs: "90%",
    },
    overFlow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #efeff2",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    AllCourses();
  }, []);
  const AllCourses = () => {
    API.get("/student/getCourses")
      .then((res) => {
        setAllCourse(res.data);
        setFilteredCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ViewCourse = (item) => {
    setOpen(true);
    setDisplay(item);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    // Filter courses based on search value
    const filtered = Allcourse.filter((course) =>
      course.courseName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCourses(filtered);
  };
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Typography sx={{ color: "grey", fontWeight: "bold" }} variant="h5">
              WELCOME!
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ContentPasteSearchTwoToneIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                id="input-Search"
                label="Search Courses"
                variant="standard"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid>
          <Grid sx={{ minHeight: "122px" }} container spacing={1} mt={1}>
            {filteredCourses?.map((item) => {
              return (
                <>
                  <Grid item xs={12} md={6} lg={3}>
                    <Card
                      sx={{
                        minHeight: "100%",
                        justifyContent: "space-between",
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                      }}
                    >
                      <div>
                        <CardMedia
                          component="img"
                          height="140"
                          sx={{ borderRadius: "10px", mb: 2 }}
                          image={item.courseImage}
                          alt="green iguana"
                        />
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography component={"h6"} fontWeight={"bold"}>
                              {item.courseName}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component={"h6"} color={"gray"}>
                              {item.courseDuration}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sx={{wordWrap:"break-word"}}>
                            <Typography  component={"h6"} color={"gray"}>
                              {item.courseDescription}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}></Grid>
                        </Grid>
                      </div>

                      <Grid container justifyContent={"space-between"} mt={2}>
                        <Grid item>
                          <Chip
                            label={"NPR " + item.coursePrice}
                            color="primary"
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            color="primary"
                            onClick={() => {
                              ViewCourse(item);
                            }}
                          >
                            Join +
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Grid>
      </Box>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {value == 0 ? (
              <SelectionForm
                displayCourse={displayCourse}
                setValue={setValue}
                setTeacher={setTeacher}
              />
            ) : (
              <PaymentForm
                setValue={setValue}
                displayCourse={displayCourse}
                teacher={teacher}
                AllCourses={AllCourses}
                setOpen={setOpen}
              />
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default AllCourses;
