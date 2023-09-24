import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import { API } from "../../../BaseURLProvider";
import { Download } from "@mui/icons-material";
import VerifiedIcon from "@mui/icons-material/Verified";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { toast } from "react-toastify";

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

const handleSubmit = (data) => {
  API.get(`/user/student-documents/${data}/download`, { responseType: "blob" })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "document.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => {});
};
const VerifyTeacher = () => {
  const [documentDetail, setDocument] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredList, setFilteredLists] = React.useState();

  React.useEffect(() => {
    getAllTeacher();
  }, []);

  console.log("The document", documentDetail)

  const handleSearchChange = (event) => {

    const { value } = event.target;
    setSearchValue(value);
    // Filter courses based on search value
    const filtered = documentDetail.filter((item) =>
    item.user_detail[0]?.firstName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredLists(filtered);
  };

  const getAllTeacher = () => {
    API.get("/teacher/getAllDocuments")
      .then((res) => {
        setDocument(res.data.document);
        setFilteredLists(res.data.document);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVerify = (id, email) => {
    const data = {
      status: true,
      email: email,
    };
    API.put(`/teacher/changeStatus/${id}`, data)
      .then((res) => {
        toast.success("Set as verified");
        getAllTeacher();
      })
      .catch((err) => {
        toast.error("Failed to update status");
      });
  };

  const NoRows = () => {
    if (documentDetail.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={8} sx={{ textAlign: "center" }}>
            No data available
          </TableCell>
        </TableRow>
      );
    }
  };


  const handleUnVerify = (id) => {
    const data = {
      status: false,
    };
    API.put(`/teacher/changeStatus/${id}`, data)
      .then((res) => {
        toast.success("Techer is set as unverified");
        getAllTeacher();
      })
      .catch((err) => {
        toast.error("Failed to update status");
      });
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PersonSearchTwoToneIcon
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
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: {
            xs: "100%",
            md: "60%",
          },
          margin: "auto",
          mt: 3,
        }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Subject</StyledTableCell>
              <StyledTableCell align="center">Document</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList?.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell align="center">
                  {item.user_detail[0]?.firstName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.user_detail[0]?.lastName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.course[0]?.courseName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.isVerified ? "Verified" : "Not Verified"}
                </StyledTableCell>
                <StyledTableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Download
                      sx={{ cursor: "pointer" }}
                      variant="contained"
                      onClick={() => {
                        handleSubmit(item._id);
                      }}
                    >
                      Downlaod
                    </Download>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    {item.isVerified ? (
                      <Tooltip title="Click to marks as not verify">
                        <NotInterestedIcon
                          onClick={() => {
                            handleUnVerify(item._id);
                          }}
                          sx={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Click to verity">
                        <VerifiedIcon
                          onClick={() => {
                            handleVerify(item._id, item.user_detail[0].email);
                          }}
                          sx={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <NoRows />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VerifyTeacher;
