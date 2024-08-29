import styled from "styled-components";
import { Grid, Paper, Skeleton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useParams } from "react-router-dom";
import { Body1, Body2, RadialBarChart } from "../../component";
import { DotIcon } from "../../assets";
import SourceHeader from "./sourceSection/SourceHeader";
import { useSelector } from "react-redux";

const ButtonContainer = styled(Grid)`
  width: 100%;
  margin: 0.5rem auto;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.1rem;
  background-color: #e0efff;
  border: 1px solid #d0e2ff;
  border-radius: 0.3rem;
  cursor: pointer;
  transition:
    transform 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  &:hover {
    transform: scale(1.03);
    background-color: #e0efff;
  }
  &:focus {
    outline: none;
  }
`;

const TextGrid = styled(Grid)`
  display: flex;
  align-items: center;
  margin-left: 0.3rem !important;
`;

const ArrowIcon = styled.span`
  margin-left: auto;
  font-size: 1rem;
  color: #1a73e8;
`;

const StatusContainer = styled(Grid)`
  display: flex;
  align-items: center;
  min-width: ${({ minWidth }) => minWidth};
`;

const DotItem = styled(Grid)`
  margin-top: 0.2rem !important;
  display: flex;
`;

const SourceSection = ({ data }) => {
  const navigate = useNavigate();

  const { similarity, ai } = useSelector((state) => state.similarity.data);
  const { isLoading } = useSelector((state) => state.sourcematch);

  const { paperId, qKey, token } = useParams();

  const handleRedirect = (path) => {
    navigate(path);
  };

  const renderButton = (title, score, path) => (
    <Grid item xs={6}>
      <StyledButton onClick={() => handleRedirect(path)}>
        <TextGrid container spacing={1} alignItems="center">
          <Grid item>
            <Body1 title={title} variant={"body"} />
          </Grid>
          <Grid item>
            <Body1 title={score} variant={"body_1"} color={"#014EFE"} />
          </Grid>
        </TextGrid>
        <ArrowIcon>
          <ArrowForwardIosIcon fontSize="0.2rem" />
        </ArrowIcon>
      </StyledButton>
    </Grid>
  );

  const renderStatus = (color, title, percent) => (
    <StatusContainer container spacing={1} alignItems="center">
      <Grid item>
        <DotIcon props={color} />
      </Grid>
      <DotItem item>
        <Body2 title={title} variant={"body2_1"} />
      </DotItem>
      <Grid item textAlign="end">
        <Typography variant="body2_1" fontSize={"0.55rem"}>
          {percent}
        </Typography>
      </Grid>
    </StatusContainer>
  );

  return (
    <>
      <ButtonContainer container spacing={1}>
        {renderButton(
          "AI score",
          data?.submission?.ai !== undefined ? ai + "%" : "--",
          `/AI/${data?.submission?.ai}/${paperId}/${qKey}/${token}`,
        )}
        {renderButton(
          "QA score",
          data?.submission?.qa !== undefined
            ? data?.submission?.qa + "%"
            : "--",
          "/QA/:qaPercentage/:paperId/:qKey/:token",
        )}
      </ButtonContainer>
      <ButtonContainer>
        <Paper elevation={2}>
          <Grid container>
            <Grid
              item
              md={6}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {!isLoading && similarity ? (
                <RadialBarChart name={"Similarity"} value={similarity} />
              ) : (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={115}
                  height={115}
                />
              )}
            </Grid>
            <Grid item md={1} sm={1}></Grid>
            <Grid item md={5} sm={5}>
              {renderStatus("#228B22", "Satisfactory", "(0-10%)")}
              {renderStatus("#014DFA", "Upgrade", "(11-40%)")}
              {renderStatus("#FFC300", "Poor", "(41-60%)")}
              {renderStatus("#FA0101", "Unacceptable", "(61-100%)")}
            </Grid>
          </Grid>
        </Paper>
      </ButtonContainer>
      <Paper elevation={2}>
        <SourceHeader />
      </Paper>
    </>
  );
};

export default SourceSection;
