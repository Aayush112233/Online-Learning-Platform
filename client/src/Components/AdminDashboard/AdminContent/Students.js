import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid, MenuItem, Modal, Table, TextField } from "@mui/material";
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
import AddStudents from "./AddStudents";
import axios from "axios";
import { useForm } from "react-hook-form";
import FormValidation from "../../../Validator/auth.Validator";
import { yupResolver } from "@hookform/resolvers/yup";
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

const Students = () => {
  const [value, setIndexValues] = React.useState(0);
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const {
    register: studentForm,
    handleSubmit: studentSubmit,
    formState: { errors: studentError },
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidation.EditStudentValidation),
  });
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

  useEffect(() => {
    getAllStudents();
  }, []);

  const filterStudent = (users) => {
    const student = users.filter((item) => item.role === "student");
    setStudents(student);
  };

  const handleModelEditClose = () => {
    setEditModalOpen(false);
  };
  const handleStudentUpdate = (data) => {
    axios
      .put("http://localhost:9005/api/user/update/" + editData._id, data)
      .then((res) => {
        toast.success(res.data.msg);
        getAllStudents();
        setEditModalOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  const getAllStudents = () => {
    API.get("/user")
      .then((res) => {
        filterStudent(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setIndexValues(newValue);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEdit = (data) => {
    setEditData({ ...data, password: data.password });
    setEditModalOpen(true);
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("email", data.email);
    setValue("dob", data.dob);
    setValue("sex", data.sex);
    setValue("phoneNo", data.phoneNo);
  };

  const handleDelete = (data) => {
    setDeleteData(data);
    setDeleteModal(true);
  };
  const handleDeleteData = () => {
    const id = deleteData._id;
    axios
      .delete("http://localhost:9005/api/user/delete/" + id)
      .then((res) => {
        getAllStudents();
        handleDeleteModalClose();
        toast.success("Student Deleted Successfully");
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
          <Tab label="Add Student" {...a11yProps(0)} />
          <Tab label="Manage Student" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AddStudents refreshTable={getAllStudents} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Date of birth</StyledTableCell>
                <StyledTableCell align="right">Gender</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students?.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="row">
                    {item.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.email}</StyledTableCell>
                  <StyledTableCell align="right">{item.dob}</StyledTableCell>
                  <StyledTableCell align="right">{item.sex}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.phoneNo}
                  </StyledTableCell>
                  <StyledTableCell align="right">
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
      </TabPanel>
      <Modal
        open={editModalOpen}
        onClose={handleModelEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" mb={2} fontWeight="bold">
            Edit Student Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!studentError.firstName}
                label="First Name"
                {...studentForm("firstName")}
                helperText={
                  studentError.firstName ? studentError.firstName.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!studentError.lastName}
                label="Last Name"
                {...studentForm("lastName")}
                helperText={
                  studentError.lastName ? studentError.lastName.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-number"
                error={!!studentError.email}
                label="Email"
                {...studentForm("email")}
                helperText={
                  studentError.email ? studentError.email.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!studentError.dob}
                label="Date of Birth"
                type={"date"}
                {...studentForm("dob")}
                helperText={studentError.dob ? studentError.dob.message : ""}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!studentError.phoneNo}
                label="Phone Number"
                {...studentForm("phoneNo")}
                helperText={
                  studentError.phoneNo ? studentError.phoneNo.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                id="filled-basic"
                label="Gender"
                {...studentForm("sex")}
                variant="filled"
                fullWidth
                defaultValue={"male"}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                sx={{ minWidth: "120px" }}
                variant="contained"
                onClick={studentSubmit(handleStudentUpdate)}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default Students;
