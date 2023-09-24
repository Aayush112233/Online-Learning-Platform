import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Card, Modal, Table } from "@mui/material";
import AddCourses from "./AddCourses";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../BaseURLProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CourseList = (refreshTable, handleClose) => {
  const [value, setValue] = React.useState(0);
  const [courses, setCourses] = useState([]);
  const [editData, setEditData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formStatus, setFormStatus] = useState("add");
  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = () => {
    axios
      .get("http://localhost:9005/api/course")
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  const [modalOpen, setModalOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setFormStatus("add");
  };

  const handleEdit = (data) => {
    setEditData(data);
    setModalOpen(true);
    setFormStatus("edit");
  };
  const handleDelete = (data) => {
    setDeleteData(data);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    const id = deleteData._id;
    API.delete("/course/delete/" + id)
      .then((res) => {
        getAllCourses();
        handleDeleteModalClose();
        toast.success("Course Deleted Successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Manage Courses" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Box
          component="form"
          sx={{
            margin: "auto",
            w: 1,
            display: "flex",
            padding: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <Card
            sx={{
              margin: "auto",
              // padding: 2,
              // width: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add Course +
            </Button>
            <AddCourses
              refreshTable={getAllCourses}
              open={modalOpen}
              handleClose={handleModalClose}
              editData={editData}
              formStatus={formStatus}
            />
          </Card>
        </Box>
      </TabPanel>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell align="center">Course Code</StyledTableCell>
              <StyledTableCell align="center">Course Duration</StyledTableCell>
              <StyledTableCell align="center">Course Price</StyledTableCell>
              <StyledTableCell align="center">
                Course Description
              </StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {item.courseName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.courseCode}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.courseDuration + "months"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.coursePrice}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.courseDescription}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <EditIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleEdit(item);
                      }}
                    />
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleDelete(item);
                      }}
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete this?
          </Typography>
          <div style={{ display: "flex", gap: "1rem", marginTop: "15px" }}>
            <Button
              variant="contained"
              onClick={() => {
                handleDeleteData();
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDeleteModalClose()}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};
export default CourseList;
