import { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { EmailIcon } from "../../assets";
import { InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchShareAnalysisPage } from "../../redux/actions/navbarActions";
import { BeatLoader } from "react-spinners";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const ShareAnalysisPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.navbar.isLoading);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(emailValue));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEmailValid) {
      dispatch(fetchShareAnalysisPage(email));
    }
  };
  return (
    <>
      <Container>
        <EmailIcon />
      </Container>
      <form onSubmit={handleSubmit}>
        <InputLabel sx={{ color: "#424242", fontSize: "0.8rem" }}>
          Share analysis page link with guide/supervisor for review.
        </InputLabel>
        <TextField
          label="Enter email address"
          style={{ marginTop: "5px" }}
          variant="outlined"
          type="email"
          size="small"
          value={email}
          onChange={handleEmailChange}
          required
          fullWidth
          error={email !== "" && !isEmailValid}
          helperText={
            email !== "" && !isEmailValid ? "Invalid email address" : ""
          }
          inputProps={{
            style: {
              padding: "12px 14px",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isEmailValid || isLoading}
        >
          {isLoading ? <BeatLoader color="#fff" size={12} /> : "Send"}
        </Button>
      </form>
    </>
  );
};

export default ShareAnalysisPage;
