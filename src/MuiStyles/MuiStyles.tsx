import { styled } from "@mui/material/styles";
import { Button, Select } from "@mui/material";

const ButtonWithShadow = styled(Button)({
  color: "#ffffff",
  backgroundColor: "rgb(23, 37, 84)",
  "&:hover": {
    backgroundColor: "#0068d2",
  },
  padding: "0.5rem 1rem",
  boxShadow:
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  borderRadius: "1rem",
});

const AnswerButton = styled(Button)({
  color: "#ffffff",
  backgroundColor: "rgb(23, 37, 84)",
  "&:hover": {
    backgroundColor: "#0068d2",
  },
  padding: "0.5rem 1rem",
  boxShadow:
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  borderRadius: "1rem",
});

export interface StyledSelectProps {
  renderValue: (value: any) => any;
}

const StyledSelect = styled(Select)({
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  padding: "8px 12px",
  border: "1px solid #ccc",
  outline: "none",
  transition: "border-color 0.2s",
  "&:hover": {
    borderColor: "#aaa",
  },
});

export { ButtonWithShadow, StyledSelect, AnswerButton };
