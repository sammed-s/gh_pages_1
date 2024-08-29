import { Card as MuiCard, Grid, TextField } from "@mui/material";
import styled from "styled-components";
import Body2 from "../typography/Body2";
import Body1 from "../typography/Body1";

const StyledCard = styled(MuiCard)`
  padding: 0.3rem;
  margin: 0.5rem 0;
`;

const StyledTextField = styled(TextField)`
  .MuiInputBase-input {
    font-size: 0.9rem;
    font-style: normal;
    line-height: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.0094rem;
  }
`;

const CommonList = ({ data }) => {
  return (
    <StyledCard elevation={3}>
      {data?.map((item) => (
        <>
          <Grid container spacing={2} alignItems="center" sx={{ padding: 1 }}>
            <Grid item xs={4.5}>
              <Body2 title={item.label} variant={"body2"} />
            </Grid>
            <Grid item xs={7.5}>
              {item.value !== null && item.value !== undefined ? (
                <Body1 title={item.value} variant={"body"} />
              ) : (
                <StyledTextField
                  variant="outlined"
                  fullWidth
                  placeholder="Type here..."
                  size="small"
                />
              )}
            </Grid>
          </Grid>
        </>
      ))}
    </StyledCard>
  );
};

export default CommonList;
