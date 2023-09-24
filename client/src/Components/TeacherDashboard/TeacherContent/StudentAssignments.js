import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Download } from "@mui/icons-material";
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

const handleSubmit = (data) => {
  API.get(`/user/teacher-documents/${data}/download`, { responseType: "blob" })
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

const dateConversion = (dateTime) => {
  const date = new Date(dateTime);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default function StudentAssignments() {
  const [myStudentAssignments, setMyStudentAssignments] = React.useState([]);
  React.useEffect(() => {
    API.get("/teacher/getMyStudentAssignments")
      .then((res) => {
        console.log("the res", res.data.assignments);
        setMyStudentAssignments(res.data.assignments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
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
            <StyledTableCell align="center">S.N</StyledTableCell>
            <StyledTableCell align="center">Assignment Name</StyledTableCell>
            <StyledTableCell align="center">Student Name</StyledTableCell>
            <StyledTableCell align="center">Submitted On</StyledTableCell>
            <StyledTableCell align="center">Remarks</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myStudentAssignments.length > 0 &&
            myStudentAssignments.map((item, index) => {
              const SN = index + 1;
              return (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {SN}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.assignment.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.submittedBy.firstName +
                      " " +
                      item.submittedBy.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dateConversion(item.submittedOn)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.remarks ?? "No Remarks"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
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
                </StyledTableRow>
              );
            })}

          {myStudentAssignments.length === 0 ?? (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                No data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
