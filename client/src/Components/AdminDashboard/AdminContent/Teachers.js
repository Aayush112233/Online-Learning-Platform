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
import AddTeachers from "./AddTeachers";
import axios from "axios";
import { get, useForm } from "react-hook-form";
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

const ManageTeacher = () => {
  const [value, setIndexValue] = React.useState(0);
  const [teachers, setTeachers] = useState([]);
  const [editData, setEditData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const {
    register: teacherForm,
    handleSubmit: teacherSubmit,
    formState: { errors: teacherError },
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidation.EditTeacherValidation),
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
    getAllTeachers();
  }, []);

  const filterTeacher = (users) => {
    const teacher = users.filter((item) => item.role === "teacher");
    setTeachers(teacher);
  };

  const handleModelEditClose = () => {
    setEditModalOpen(false);
  };
  const handleTeacherUpdate = (data) => {
    axios
      .put("http://localhost:9005/api/user/update/" + editData._id, data)
      .then((res) => {
        toast.success(res.data.msg);
        getAllTeachers();
        setEditModalOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  const getAllTeachers = () => {
    API.get("/user")
      .then((res) => {
        filterTeacher(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setIndexValue(newValue);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEdit = (data) => {
    setEditData(data);
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
        getAllTeachers();
        handleDeleteModalClose();
        toast.success("Teacher  Deleted Successfully");
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
          <Tab label="Add Teacher" {...a11yProps(0)} />
          <Tab label="Manage Teacher" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AddTeachers refreshTable={getAllTeachers} />
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
              {teachers?.map((item) => (
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
            Edit Teacher Information{" "}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!teacherError.firstName}
                label="First Name"
                {...teacherForm("firstName")}
                helperText={
                  teacherError.firstName ? teacherError.firstName.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!teacherError.lastName}
                label="Last Name"
                {...teacherForm("lastName")}
                helperText={
                  teacherError.lastName ? teacherError.lastName.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-number"
                error={!!teacherError.email}
                label="Email"
                {...teacherForm("email")}
                helperText={
                  teacherError.email ? teacherError.email.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!teacherError.dob}
                label="Date of Birth"
                type={"date"}
                {...teacherForm("dob")}
                helperText={teacherError.dob ? teacherError.dob.message : ""}
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
                error={!!teacherError.phoneNo}
                label="Phone Number"
                {...teacherForm("phoneNo")}
                helperText={
                  teacherError.phoneNo ? teacherError.phoneNo.message : ""
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
                {...teacherForm("sex")}
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
                onClick={teacherSubmit(handleTeacherUpdate)}
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

export default ManageTeacher;
