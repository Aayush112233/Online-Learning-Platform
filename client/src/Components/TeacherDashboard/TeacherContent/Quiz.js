import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddIcon from "@mui/icons-material/Add";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormValidation from "../../../Validator/auth.Validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { API } from "../../../BaseURLProvider";
import { Context } from "../../../Context/ContextConfig";
import { useNavigate } from "react-router-dom";
import { LinkOffOutlined, LinkOutlined } from "@mui/icons-material";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Quiz() {
  const [value, setValue] = React.useState(0);
  const [allQuiz, setQuiz] = React.useState([]);
  const { user, update } = React.useContext(Context);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    register: quizForm,
    handleSubmit: quizSubmit,
    formState: { errors: quizError },
    setvalue,
  } = useForm({
    resolver: yupResolver(FormValidation.QuiztValidator),
  });

  React.useEffect(() => {
    getMyQuiz();
  }, [user]);

  const getMyQuiz = () => {
    API.get(`/teacher/getQuiz/${user._id}`)
      .then((res) => {
        setQuiz(res.data.quiz);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuizSubmit = (data) => {
    API.post("/teacher/postQuiz", data)
      .then((res) => {
        toast.success("The Quiz Posted Successfully");
        setValue("title", "");
        setValue("description", "");
        setValue("link", "");
        getMyQuiz();
      })
      .catch((err) => {
        toast.error("Failed to post quiz");
      });
  };
  return (
    <>
      <Box
        sx={{
          width: {
            md: "70%",
            xs: "90%",
          },
          margin: "auto",
          p: 1,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          centered
        >
          <Tab icon={<AddIcon />} label="Add Quiz Link" {...a11yProps(0)} />
          <Tab
            icon={<AddToDriveIcon />}
            label="Link Quiz Informations"
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography variant="h6" mb={2} fontWeight="bold"></Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!quizError.title}
                label="Title"
                {...quizForm("title")}
                helperText={quizError.title ? quizError.title.message : ""}
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                error={!!quizError.link}
                label="Link"
                {...quizForm("link")}
                helperText={quizError.link ? quizError.link.message : ""}
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="filled-basic"
                multiline
                rows={4}
                error={!!quizError.description}
                label="Description"
                {...quizForm("description")}
                helperText={
                  quizError.description ? quizError.description.message : ""
                }
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              xs={12}
              md={6}
              item
            >
              <Button
                variant="contained"
                onClick={quizSubmit(handleQuizSubmit)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">S.N</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Go To Quiz</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allQuiz?.map((item, index) => {
                  const SN = index + 1;
                  return (
                    <>
                      <StyledTableRow>
                        <StyledTableCell align="center">{SN}</StyledTableCell>
                        <StyledTableCell align="center">
                          {item.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.description}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            onClick={() => {
                              window.open(item.link);
                            }}
                            color={"primary"}
                          >
                            <LinkOutlined color="primary" />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
    </>
  );
}
