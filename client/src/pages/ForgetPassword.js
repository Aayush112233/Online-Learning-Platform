import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useForm } from "react-hook-form";
import FormValidation from "../Validator/auth.Validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    register: resetForm,
    handleSubmit: resetSubmit,
    formState: { errors: resetError },
  } = useForm({
    resolver: yupResolver(FormValidation.ResetValidation),
  });

  const onResetSubmit = (data) => {
    axios
      .post(
        "http://localhost:9005/api/user/resetpassword/" +
          params.id +
          "/" +
          params.token,
        data
      )
      .then((res) => {
        toast.success(res.data.msg);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Navbar />
        <Grid
          container
          sx={{
            height: "85vh",
            width: {
              md: "70%",
              sm: "80%",
              xs: "90%",
            },
          }}
        >
          <Grid item xs={12}></Grid>
          <Grid
            item
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              gap: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
            xs={12}
            lg={6}
          >
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Reset Password
            </Typography>
            <TextField
              id="outlined-basic"
              error={!!resetError.newPassword}
              label="New Password"
              {...resetForm("newPassword")}
              helperText={
                resetError.newPassword ? resetError.newPassword.message : ""
              }
              fullWidth
            />

            <TextField
              id="outlined-basic"
              error={!!resetError.confirmPassword}
              label="Confirm Password"
              {...resetForm("confirmPassword")}
              helperText={
                resetError.confirmPassword
                  ? resetError.confirmPassword.message
                  : ""
              }
              fullWidth
            />

            <Button variant="contained" onClick={resetSubmit(onResetSubmit)}>
              Reset
            </Button>
          </Grid>

          <Grid
            item
            sx={{
              display: {
                lg: "block",
                xs: "none",
              },
            }}
            xs={12}
            lg={6}
          >
            <Grid
              container
              sx={{
                minHeight: 1,
                dispaly: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="https://stage.insights.dreamsave.net/static/media/forgot-password-illustration.eb52edcb.svg"
                alt="Image7"
                style={{
                  maxWidth: "100%",
                  // marginBottom: "1rem",
                  mixBlendMode: "multiply",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ResetPassword;
