import {
  Box,
  Grid,
  IconButton,
  Popper,
  Typography,
  Tooltip,
} from "@mui/material";
import styled, { css } from "styled-components";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { scrollToElement } from "../../../utils";

const StyledPopper = styled(Popper)`
  min-width: 390px;
  max-width: 400px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
`;

const Arrow = styled(Box)`
  position: absolute;
  width: 0;
  height: 0;
  ${({ placement }) =>
    placement === "top" &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #fff;
      top: 115.5px;
    `}
  ${({ placement }) =>
    placement === "bottom" &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #fff;
      top: -4px;
    `}
`;

const StyledIconButton = styled(IconButton)`
  padding: 0.001rem !important;
  border: 0.01rem solid #666666 !important;
  margin-right: 0.15rem !important;

  &:disabled {
    border-color: rgba(0, 0, 0, 0.26) !important;
  }
`;

const Line = styled.div`
  height: 0.104rem !important;
  background: linear-gradient(to right, #d4f1f4, #014dfb, #014dfb, #d4f1f4);
  width: 100%;
`;

const PopperContent = styled(Grid)`
  background-color: #f3f4fa;
  padding: 0.125rem !important;
`;

const SecondarySourceTypography = styled(Typography)`
  font-size: 0.6rem !important;
  line-height: 0.525rem !important;
  color: black;
`;

const SourceTypography = styled(Typography)`
  font-size: 0.8975rem !important;
  display: flex;
  flex-direction: column;
  line-height: 1.625rem !important;
`;

const CurrentIndexTypography = styled(Typography)`
  font-size: 0.55rem !important;
  margin-right: 0.5rem !important;
`;

const PopperFooterTypography = styled(Typography)`
  font-size: 0.575rem !important;
  line-height: 0.0025rem !important;
  color: black;
`;

const truncateText = (text) => {
  if (text.length > 20) {
    return `${text.substring(0, 38)}...`;
  }
  return text;
};

const SideBySideModal = ({
  anchorEl,
  arrowRef,
  popperRef,
  cardData,
  placement,
  currentIndex,
  totalElements,
  setAnchorEl,
  setCardData,
}) => {
  const handleClose = () => {
    setAnchorEl(null);
    setCardData(null);
  };
  const handlePrevClick = () => {
    handleClose();
    scrollToElement(cardData, "prev", anchorEl, setAnchorEl, setCardData);
  };

  const handleNextClick = () => {
    handleClose();
    scrollToElement(cardData, "next", anchorEl, setAnchorEl, setCardData);
  };

  return (
    <>
      <StyledPopper
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        disablePortal={true}
        modifiers={[
          {
            name: "flip",
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "arrow",
            enabled: true,
            options: {
              element: arrowRef.current,
            },
          },
        ]}
        ref={popperRef}
      >
        {cardData && (
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 10,
              p: 0.5,
            }}
          >
            <Arrow ref={arrowRef} placement={placement} />
            <PopperContent container>
              <Grid md={9}>
                <SecondarySourceTypography variant="caption">
                  {cardData?.secondarySource}
                </SecondarySourceTypography>
                <SourceTypography
                  variant="body"
                  className={"col" + cardData?.location}
                >
                  {truncateText(cardData?.source)}
                </SourceTypography>
              </Grid>
              <Grid
                md={3}
                display={"flex"}
                justifyContent="end"
                alignItems="center"
              >
                <CurrentIndexTypography>
                  {currentIndex + 1}/{totalElements}
                </CurrentIndexTypography>
                <Tooltip arrow title="Prev">
                  <StyledIconButton
                    size="small"
                    onClick={handlePrevClick}
                    disabled={currentIndex <= 0}
                  >
                    <KeyboardArrowLeftIcon fontSize="small" />
                  </StyledIconButton>
                </Tooltip>
                <Tooltip arrow title="Next">
                  <StyledIconButton
                    size="small"
                    onClick={handleNextClick}
                    disabled={currentIndex >= totalElements - 1}
                  >
                    <KeyboardArrowRightIcon fontSize="small" />
                  </StyledIconButton>
                </Tooltip>
              </Grid>
            </PopperContent>

            <Line />
            <PopperFooterTypography variant="caption">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              obcaecati eaque veritatis architecto, iusto dolor soluta iste
              nulla qui cum nam totam repudiandae pariatur laborum quasi velit
              quo laudantium deleniti!
            </PopperFooterTypography>
          </Box>
        )}
      </StyledPopper>
    </>
  );
};

export default SideBySideModal;
