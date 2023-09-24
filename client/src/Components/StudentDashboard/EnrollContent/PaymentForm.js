import React, { useEffect, useState } from "react";
import payment from "../../../assets/image/payment.jpg";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { API } from "../../../BaseURLProvider";
import { toast } from "react-toastify";
const PaymentForm = ({
  setOpen,
  setValue,
  teacher,
  displayCourse,
  AllCourses,
}) => {
  const [qr, setQr] = useState("");
  const [screenShotImage, setScreenShotImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (teacher) {
      API.get(`teacher/getPaymentImageByTeacher/${teacher}`)
        .then((res) => {
          setQr(res.data.QRInfo.qrImage);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [teacher]);

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

  const handleEnroll = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("course", displayCourse._id);
    formData.append("teacher", teacher);
    formData.append("payment", selectedFile);

    if (displayCourse._id && teacher && selectedFile) {
      API.post("/student/enroll", formData)
        .then((response) => {
          toast.success("Your enrollment is placed successfully");
          AllCourses();
          setOpen(false);
        })
        .catch((error) => console.log(error));
    } else {
      toast.error("Something is missing while enrollment");
    }
  };

  return (
    <>
      <Typography
        sx={{
          fontWeight: "bold",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Payment
      </Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <img
            src={qr}
            alt="payment"
            style={{
              maxWidth: "100%",
              marginBottom: "3rem",
              mixBlendMode: "multiply",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Button variant="contained" component="label">
            Upload Screenshot
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileSelect}
            />
          </Button>
          <Grid container mt={2}>
            <Avatar
              src={screenShotImage}
              sx={{
                borderRadius: "0",
                width: "100%",
                height: "100%",
              }}
            ></Avatar>
          </Grid>
        </Grid>
        <Grid
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
          container
          mt={2}
        >
          <Button
            variant="contained"
            onClick={() => {
              setValue(0);
            }}
          >
            Back
          </Button>
          <Button variant="contained" color="success" onClick={handleEnroll}>
            Enroll
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default PaymentForm;
