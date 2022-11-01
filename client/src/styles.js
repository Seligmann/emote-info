import { styled } from "@mui/material/styles";
import {TextField} from "@material-ui/core";

export const StyledTextField = styled(TextField)(({}) => ({
  "& .MuiFormLabel-root": {
    color: "#e3e3e3"
  },
  "& .MuiInputBase-input": {
    color: "#e3e3e3"
  }
}));
