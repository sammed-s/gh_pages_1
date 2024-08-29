import { useEffect, useState } from "react";
import styled from "styled-components";
import { Body2, CardView } from "../component";
import {
  Grid,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import PageScrollView from "./sourceData/PageScrollView";
import SourcePage from "./sourceData/SourcePage";
import SourceSection from "./sourceData/SourceSection";
import { CustomDrawer } from "../component";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPageScrollImages,
  fetchSimilarityData,
  fetchSourceBody,
  fetchSourceMatch,
} from "../redux/actions/similarityActions";
import { fetchNavbarSettings } from "../redux/actions/navbarActions";

const elevation2 =
  "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)";

const Header = styled(Box)`
  background-color: #d2ddfb;
  border-top: 1px solid #d0e2ff;
  border-left: 1px solid #d0e2ff;
  border-right: 1px solid #d0e2ff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
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
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${elevation2};
`;

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { paperId, qKey, token } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  sessionStorage.setItem("paperId", paperId);
  sessionStorage.setItem("qKey", qKey);
  sessionStorage.setItem("token", token);

  const data = { qKey, paperId };

  useEffect(() => {
    dispatch(fetchSimilarityData(paperId));
    dispatch(fetchSourceBody(data));
    dispatch(fetchSourceMatch(data));
    dispatch(fetchPageScrollImages(data));
    dispatch(fetchNavbarSettings(data));
  }, []);

  const fileInfo = useSelector((state) => state.sourcematch.data);
  const drawerHeight = "calc(100vh - 5rem)";

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={0.8}></Grid>
      </Grid>
      <Grid container spacing={1}>
        {!isSmallScreen && (
          <Grid
            item
            md={drawerOpen ? 0.7 : 0.1}
            sx={{
              display: !drawerOpen && "flex",
              justifyContent: !drawerOpen && "start",
              alignItems: !drawerOpen && "center",
              textAlign: !drawerOpen && "start",
            }}
          >
            <CustomDrawer
              isOpen={drawerOpen}
              onClose={toggleDrawer}
              anchor="left"
              drawerWidth={90}
              drawerHeight={drawerHeight}
              customStyles={{
                backgroundColor: "white",
                marginTop: "3.7rem",
                overflow: "hidden !important",
              }}
            >
              <PageScrollView
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                totalPages={totalPages}
              />
            </CustomDrawer>
          </Grid>
        )}
        <Grid item xs={12} md={drawerOpen ? 7.5 : 8.1}>
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
          <Header>
            <Typography variant="body" fontSize={"0.75rem"} fontWeight={500}>
              Title
            </Typography>
            {fileInfo?.fileInformationEntity?.submissionsDetailsEntity
              ?.title ? (
              <Typography variant="body" fontSize={"0.75rem"}>
                {`: ${fileInfo?.fileInformationEntity?.submissionsDetailsEntity?.title}`}
              </Typography>
            ) : (
              <Skeleton
                animation="wave"
                sx={{ ml: 1 }}
                width="13%"
                height="1.5rem"
              />
            )}
          </Header>
          <CardView elevation={2} sourcePage={true}>
            <SourcePage setTotalPages={setTotalPages} />
          </CardView>
          <Footer>
            <Grid container>
              <Grid item xs={12} md={6} display={"flex"}>
                <Typography
                  variant="body"
                  fontSize={"0.75rem"}
                  fontWeight={500}
                  ml={0.3}
                >
                  Word Count
                </Typography>
                {fileInfo?.submission?.to_words ? (
                  <Typography variant="body" fontSize={"0.75rem"}>
                    {`: ${fileInfo?.submission?.to_words}`}
                  </Typography>
                ) : (
                  <Skeleton
                    animation="wave"
                    sx={{ ml: 1 }}
                    width="8%"
                    height="1.5rem"
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6} display={"flex"} justifyContent={"end"}>
                <Typography
                  variant="body"
                  fontSize={"0.75rem"}
                  fontWeight={500}
                >
                  Total Sentences
                </Typography>
                {fileInfo?.fileInformationEntity?.submissionsDetailsEntity
                  ?.totalSentences ? (
                  <Typography variant="body" fontSize={"0.75rem"} mr={0.3}>
                    {`: ${
                      fileInfo?.fileInformationEntity?.submissionsDetailsEntity
                        ?.totalSentences
                    }`}
                  </Typography>
                ) : (
                  <Skeleton
                    animation="wave"
                    sx={{ ml: 1 }}
                    width="8%"
                    height="1.5rem"
                  />
                )}
              </Grid>
            </Grid>
          </Footer>
        </Grid>
        <Grid item xs={12} md={3.8} mt={1}>
          <SourceSection data={fileInfo} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
