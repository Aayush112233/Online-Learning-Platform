import { styled } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export const useStyles = styled((theme) => ({
  toolbar: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
  },

  logo: {
    color: "white",
  },
}));
