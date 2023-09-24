import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { API } from "../../../BaseURLProvider";
import { Image, VerifiedRounded } from "@mui/icons-material";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    md: "50%",
    xs: "95%",
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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

const PaymentVerification = () => {
  const [studentList, setStudentList] = useState([]);
  const [open, setOpen] = useState(false);
  const [paymentImage, setPaymentImage] = useState("");
  const [QRopen, setQR] = useState(false);
  const [screenShotImage, setScreenShotImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getAllPayment();
  }, []);
  const getAllPayment = () => {
    API.get(`/teacher/getPaymentsofStudent`)
      .then((res) => {
        setStudentList(res.data.enrollments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewPayment = (image) => {
    setPaymentImage(image);
    setOpen(true);
  };

  const verifyStudent = (id) => {
    API.put("/student/updateVerify/" + id)
      .then((res) => {
        toast.success("The student is enrolled successfuly");
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };
  const handleQRSubmit = () => {
    setQR(true);
  };

  const handleQRClose = () => {
    setQR(false);
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("qrImage", selectedFile);
    API.put('/teacher/changeQR', formData).then((res)=>{
      toast.success("New QR Updated Successfully")
      setQR(false);
    }).catch((err)=>{
      console.log(err)
    })
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
      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "monospace",
          textDecorationColor: "CaptionText",
          fontSize: "19pt",
        }}
      >
        Paid Student Lists
      </Typography>
      <Grid
        item
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          gap: "4rem",
          my: 3,
        }}
      >
        <Button variant="contained" color="secondary" onClick={handleQRSubmit}>
          Upload New QR
        </Button>
        <Modal
          open={QRopen}
          onClose={handleQRClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Grid container mt={2} justifyContent={"center"}>
                <Avatar
                  src={screenShotImage}
                  sx={{ borderRadius: "0", width: "50%", height: "50%" }}
                ></Avatar>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                gap: "2rem",
              }}
              item
              xs={12}
              md={6}
            >
              <Button
                startIcon={<Image />}
                sx={{ width: "30%" }}
                variant="contained"
                component="label"
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileSelect}
                />
              </Button>
              <Button
                variant="outlined"
                disabled={screenShotImage == ""}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Grid>
          </Box>
        </Modal>
      </Grid>
      <TableContainer
        sx={{
          width: {
            md: "50%",
            xs: "90%",
          },
          margin: "auto",
        }}
        component={Paper}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student Name</StyledTableCell>
              <StyledTableCell align="right">Payment Status</StyledTableCell>
              <StyledTableCell align="right">
                Payment ScreenShot
              </StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList?.map((item) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {item.student.firstName + " " + item.student.lastName}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.paymentStatus ? "Payment Completed" : "Payment Pending"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    onClick={() => {
                      handleViewPayment(item.paymentImage);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => {
                      verifyStudent(item._id);
                    }}
                  >
                    <VerifiedRounded />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display={"flex"} justifyContent={"center"}>
          <Avatar
            src={paymentImage}
            sx={{ borderRadius: 0, width: "400px", height: "auto" }}
          ></Avatar>
        </Box>
      </Modal>
    </>
  );
};

export default PaymentVerification;
