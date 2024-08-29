import { Box, Card, Grid, Paper, Skeleton } from "@mui/material";
import { Body1, Body2, CardView, RadialBarChart } from "../component";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAiMatch } from "../redux/actions/aiActions";
import { useNavigate, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  fetchSimilarityData,
  fetchSourceMatch,
} from "../redux/actions/similarityActions";

const elevation2 =
  "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)";

const Header = styled(Box)`
  background-color: #d2ddfb;
  border-top: 1px solid #d0e2ff;
  border-left: 1px solid #d0e2ff;
  border-right: 1px solid #d0e2ff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${elevation2};
`;

const Footer = styled(Box)`
  background-color: #d2ddfb;
  border-top: 1px solid #d0e2ff;
  border-left: 1px solid #d0e2ff;
  border-right: 1px solid #d0e2ff;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${elevation2};
`;

const ScrollContainer = styled(Box)`
  height: calc(100vh - 11.6rem);
  overflow-y: auto;
  @media (min-height: 390px) and (max-height: 410px) {
    height: 100vh;
  }
`;

const ScrollContainer1 = styled(Box)`
  height: calc(100vh - 18.6rem);
  overflow-y: auto;

  @media (min-height: 390px) and (max-height: 410px) {
    height: 100vh;
  }
`;

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
    transform: scale(1.01);
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
  margin-right: 0.3rem;
  font-size: 1rem;
  color: #1a73e8;
`;

const AiGuidelines = [
  "The DrillBit AI detection model has been developed to identify AI generated text from tools like CHATGPT.",
  "It is designed to provide a percentage estimation of AI generated content and highlight specific sections in a document.",
  "In the absence of specific guidelines from the UGC or academic institutions regarding the utilization of AI tools in academic writing, DrillBit AI model serves as a preliminary indicator of AI generated text within a document.",
];

const AIPageResult = () => {
  const fileInfo = useSelector((state) => state.sourcematch.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { similarity } = useSelector((state) => state.similarity.data);
  const handleRedirect = (path) => {
    navigate(path);
  };
  const { paperId, qKey, token, aiPercentage } = useParams();

  const data = { qKey, paperId, token };

  const renderButton = (title, score, path) => (
    <Grid item xs={12}>
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

  useEffect(() => {
    dispatch(fetchAiMatch(data));
    dispatch(fetchSimilarityData(paperId));
    dispatch(fetchSourceMatch(data));
  }, []);

  const { aiData } = useSelector((state) => state.aidata);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8.2}>
          <Grid container>
            <Grid item xs={12} md={12} display={"flex"}>
              <Grid item xs={12} md={2} display={"flex"} ml={0.3}>
                <Body2 title={"Paper ID"} variant={"body2"} fw={500} />
                {fileInfo?.submission?.paper_id !== undefined ? (
                  <Body2
                    title={`: ${fileInfo?.submission?.paper_id}`}
                    variant={"body2"}
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    sx={{ ml: 1 }}
                    width="50%"
                    height="1.5rem"
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6} display={"flex"}>
                <Body2 title={"Author Name"} variant={"body2"} fw={500} />
                {fileInfo?.submission?.name !== undefined ? (
                  <Body2
                    title={`: ${fileInfo?.submission?.name}`}
                    variant={"body2"}
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    sx={{ ml: 1 }}
                    width="50%"
                    height="1.5rem"
                  />
                )}
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                display={"flex"}
                justifyContent={"end"}
                mr={0.3}
              >
                <Body2 title={"Submission Date"} variant={"body2"} fw={500} />
                {fileInfo?.submission?.date_up !== undefined ? (
                  <Body2
                    title={`: ${fileInfo?.submission?.date_up}`}
                    variant={"body2"}
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    sx={{ ml: 1 }}
                    width="50%"
                    height="1.5rem"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Header></Header>
          <CardView elevation={2} sourcePage={true}>
            <ScrollContainer>
              <div dangerouslySetInnerHTML={{ __html: aiData }} />
            </ScrollContainer>
          </CardView>
          <Footer></Footer>
        </Grid>
        <Grid item xs={12} md={3.8} mt={1}>
          <ButtonContainer container spacing={1}>
            {renderButton(
              "Similarity Score",
              similarity !== undefined ? similarity + "%" : "--",
              `/analysis/${paperId}/${qKey}/${token}`,
            )}
          </ButtonContainer>
          <ButtonContainer>
            <Paper elevation={2}>
              <Grid container>
                <Grid item md={6} sm={6}>
                  <RadialBarChart name={"AI"} value={aiPercentage} />
                </Grid>
                <Grid item md={1} sm={1}></Grid>
              </Grid>
            </Paper>
          </ButtonContainer>
          <Paper elevation={2} sx={{ padding: "0.5rem", mt: "0.5rem" }}>
            <ScrollContainer1>
              {AiGuidelines.map((data, i) => {
                return (
                  <Card
                    sx={{ m: "0.1rem", mb: "0.5rem", p: "0.65rem" }}
                    key={i}
                  >
                    <Body2 title={data} variant={"body2_1"} />
                  </Card>
                );
              })}
            </ScrollContainer1>
            {/* </CardView> */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AIPageResult;
