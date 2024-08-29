import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  IconButton,
  Box,
  TableHead,
  Typography,
  Card,
  Button,
} from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LinkIcon from "@mui/icons-material/Link";
import Caption from "../typography/Caption";
import styled, { keyframes } from "styled-components";
import "../../index.css";
import { checkboxChange, scrollToRow } from "../../utils";
import Body1 from "../typography/Body1";
import { useSelector } from "react-redux";
import CommonTableSkeleton from "../skeleton/CommonTableSkeleton";

const BpIcon = styled("span")(() => ({
  borderRadius: 3,
  width: 14,
  height: 14,
  boxShadow:
    "inset 0 0 0 0.0625rem rgba(16,22,26,.2), inset 0 -0.0625rem 0 rgba(16,22,26,.1)",
  backgroundColor: "#f5f8fa",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "0.125rem auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#3672FF",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 14,
    height: 14,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

const EllipsisBox = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
`;

const truncateText = (text) => {
  if (text.length > 20) {
    return `${text.substring(0, 23)}...`;
  }
  return text;
};

const Cell = styled(TableCell)`
  max-width: ${(props) => props.width} !important;
  padding: 0.0625rem !important;
`;

const PercentageBar = styled.div`
  display: flex;
  width: 100%;
  height: 1.5625rem;
  background-color: #f0f0f0;
  border-radius: 0.8125rem;
  overflow: hidden;
  position: relative;
`;

const FilledSegment = styled.div`
  flex: 1;
  background-color: ${(props) =>
    props.filled ? "rgba(1, 77, 250, 0.4)" : "#ccc"};
  transition: background-color 0.3s ease-in-out;
`;

const PercentageLabel = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: ${(props) => (props.percent > 55 ? "#fff" : "#000")} !important;
  font-size: 0.75rem;
`;

const ExpandableTableCell = styled(TableCell)`
  padding: 0.1rem;
`;

const Row = styled(TableRow)`
  max-height: 0.875rem !important;
  cursor: ${(props) =>
    props.includedSource && props?.isDisabled ? "pointer" : "default"};
  &.highlighted {
    background-color: #ffff99 !important;
  }
  &:hover {
    transform: scale(1.01);
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 0.06rem !important;
  border: 0.01rem solid #666666 !important;
`;

const StyledLinkButton = styled(IconButton)`
  padding: 0.2rem !important;
  border: 0.01rem solid #666666 !important;
`;

const ExcludeButton = styled(IconButton)`
  background-color: #00c04d !important;
  color: #fff !important;
  padding: 0.06rem !important;
  &:hover {
    background-color: green !important;
  }
  &:focus {
    background-color: #00c04d !important;
  }
`;

const IncludeButton = styled(IconButton)`
  background-color: #f94449 !important;
  color: #fff !important;
  padding: 0.06rem !important;
  &:hover {
    background-color: red !important;
  }
  &:focus {
    background-color: #f94449 !important;
  }
`;

const StyledBodyCard = styled(Card)`
  margin-top: 0.3rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  width: 100%;
  background-color: #f1f7f7 !important;
  transition: transform 3s ease-in-out;
`;

const StyledAlternateCard = styled(Card)`
  margin-top: 0.3rem;
  width: 100%;
  transition: transform 3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
`;

const StyledHeaderCard = styled(Card)`
  width: 100%;
`;

const ScrollContainer = styled(Box)`
  position: relative;
  height: calc(
    100vh -
      ${(props) =>
        !props.selectedCheckboxes?.length > 0 ? "19.99rem" : "22.8rem"}
  );
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  @media (min-height: 390px) and (max-height: 410px) {
    height: 100vh;
  }
`;

const slideInFromTop = keyframes`
from {
  transform: translateY(-10%);
  opacity: 0;
}
to {
  transform: translateY(0);
  opacity: 1;
}
`;

const StyledButton = styled(Button)`
  position: absolute;
  background: ${(props) =>
    props.tabIndex === true ? "red" : "green"} !important;
  border-radius: 0.3125rem !important;
  margin: 0.15rem !important;
  width: 98.6%;
  text-transform: none !important;
  animation: ${slideInFromTop} 0.5s ease-in-out;
`;

const CommonTable = ({
  rows,
  scrollToElement,
  includedSource,
  handleExcludeClick,
  handleIncludeClick,
  handleExcludeInclude,
}) => {
  const [selectedAll, isSelectedAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const handleExpandClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const { isSuccess, isLoading } = useSelector((state) => state.sourcematch);

  const handleClick = (e, isDisabled, row) => {
    e.stopPropagation();
    if (!isDisabled) {
      scrollToElement(e, row);
    }
  };

  useEffect(() => {
    const handleElementClick = (event) => {
      const location = event.detail;
      scrollToRow(location);
    };
    document.addEventListener("elementClicked", handleElementClick);
    return () => {
      document.removeEventListener("elementClicked", handleElementClick);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      isSelectedAll(false);
      setSelectedCheckboxes([]);
    }
  }, [isSuccess]);

  const handleCheckboxChange = (id, selectAll) => {
    const result = checkboxChange(
      id,
      rows,
      selectAll,
      includedSource,
      selectedCheckboxes,
    );
    if (result) {
      setSelectedCheckboxes(result.updatedSelectedCheckboxes);
      isSelectedAll(result.selectedAll);
      const event = new CustomEvent("checkboxSelected", {
        detail: {
          selectedCheckboxes: result.updatedSelectedCheckboxes,
        },
      });
      document.dispatchEvent(event);
    }
  };

  return (
    <>
      <ScrollContainer selectedCheckboxes={selectedCheckboxes}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <StyledHeaderCard elevation={2}>
                <TableRow>
                  <Cell width="10.7%" sx={{ textAlign: "center" }}>
                    <Checkbox
                      icon={<BpIcon />}
                      checkedIcon={<BpCheckedIcon />}
                      checked={selectedAll}
                      onChange={() => handleCheckboxChange(null, true)}
                      disabled={rows?.sourceListParent === undefined}
                    />
                  </Cell>
                  <Cell width="0%" sx={{ textAlign: "center" }}>
                    <Caption title={""} variant={"caption_1"} />
                  </Cell>
                  <Cell width="61%">
                    <Caption title={"Primary Source"} variant={"caption_1"} />
                  </Cell>
                  <Cell width="0%" sx={{ textAlign: "center" }}>
                    <Caption title={""} variant={"caption_1"} />
                  </Cell>
                  <Cell width="7%" sx={{ textAlign: "center" }}>
                    <Caption
                      title={includedSource ? "Exclude" : "Include"}
                      variant={"caption_1"}
                    />
                  </Cell>
                </TableRow>
              </StyledHeaderCard>
            </TableHead>
            {!isLoading && rows?.sourceListParent !== undefined ? (
              <>
                <TableBody>
                  {rows?.sourceListParent?.map((row, index) => {
                    const allZeroSourceIdentity =
                      includedSource &&
                      row?.sourceList.every(
                        (source) => source.sourceIdentity === "0",
                      );
                    if (allZeroSourceIdentity) {
                      return null;
                    }
                    return (
                      <React.Fragment key={index}>
                        {row?.sourceList
                          .filter((source) =>
                            includedSource
                              ? source.type === "primarySource" &&
                                source.sourceIdentity === "0"
                                ? row.sourceList.length > 1
                                : source.sourceIdentity === "1" &&
                                  source.type !== "alternateSource"
                              : source.sourceIdentity === "0",
                          )
                          .map((source, sourceIndex) => {
                            const isPrimaryDisabled =
                              includedSource &&
                              source.type === "primarySource" &&
                              source.sourceIdentity === "0" &&
                              row.sourceList.length > 1 &&
                              row.sourceList.some(
                                (s) =>
                                  s.sourceIdentity === "2" ||
                                  s.type === "alternateSource",
                              );
                            return (
                              <StyledBodyCard key={sourceIndex} elevation={2}>
                                <Row
                                  onClick={(e) =>
                                    handleClick(e, isPrimaryDisabled, source)
                                  }
                                  includedSource={includedSource}
                                  isDisabled={!isPrimaryDisabled}
                                  className={`.col${source.location}`}
                                >
                                  <Cell width="5%">
                                    <Checkbox
                                      icon={<BpIcon />}
                                      checkedIcon={<BpCheckedIcon />}
                                      disabled={isPrimaryDisabled}
                                      checked={selectedCheckboxes.includes(
                                        source.location,
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(source.location)
                                      }
                                      onClick={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  </Cell>
                                  <Cell width="10%">
                                    <Typography
                                      variant="body"
                                      fontSize={"1rem"}
                                      className={"col" + source.location}
                                    >
                                      {source.location}
                                    </Typography>
                                  </Cell>
                                  <Cell width="50%">
                                    <EllipsisBox>
                                      <Typography
                                        variant="body"
                                        fontSize={"0.82rem"}
                                        className={"col" + source.location}
                                        display={"flex"}
                                        flexDirection={"column"}
                                      >
                                        {truncateText(source.source)}
                                        <Typography
                                          variant="caption"
                                          fontSize={"0.625rem"}
                                          sx={{ lineHeight: "15px" }}
                                          color={"black"}
                                        >
                                          {truncateText(source.secondarySource)}
                                        </Typography>
                                      </Typography>
                                    </EllipsisBox>
                                  </Cell>
                                  <Cell width="21%">
                                    <Box display="flex" alignItems="center">
                                      <PercentageBar>
                                        {[...Array(20)].map((_, i) => (
                                          <FilledSegment
                                            key={i}
                                            filled={
                                              i <
                                              Math.ceil(
                                                source.percent === "<1"
                                                  ? 1
                                                  : source.percent / 5,
                                              )
                                            }
                                          />
                                        ))}
                                        <PercentageLabel
                                          percent={source.percent}
                                        >
                                          <Typography
                                            variant="caption"
                                            fontSize={"0.85rem"}
                                          >
                                            {`${source.percent}%`}
                                          </Typography>
                                        </PercentageLabel>
                                      </PercentageBar>
                                    </Box>
                                  </Cell>
                                  <Cell
                                    width="10%"
                                    sx={{ textAlign: "center" }}
                                  >
                                    <>
                                      {includedSource ? (
                                        <>
                                          {row.sourceList.length > 1 ? (
                                            <StyledIconButton
                                              aria-label="expand row"
                                              size="small"
                                              onClick={(event) => {
                                                event.stopPropagation();
                                                handleExpandClick(index);
                                              }}
                                            >
                                              {expandedRow === index ? (
                                                <KeyboardArrowDownIcon />
                                              ) : (
                                                <KeyboardArrowRightIcon />
                                              )}
                                            </StyledIconButton>
                                          ) : (
                                            <ExcludeButton
                                              aria-label="expand row"
                                              onClick={(event) => {
                                                event.stopPropagation();
                                                handleExcludeClick(
                                                  source.location,
                                                );
                                              }}
                                            >
                                              <KeyboardArrowRightIcon />
                                            </ExcludeButton>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <IncludeButton
                                            aria-label="expand row"
                                            size="large"
                                            onClick={(event) => {
                                              event.stopPropagation();
                                              handleIncludeClick(
                                                source.location,
                                              );
                                            }}
                                          >
                                            <KeyboardArrowLeftIcon />
                                          </IncludeButton>
                                        </>
                                      )}
                                    </>
                                  </Cell>
                                </Row>

                                {expandedRow === index && (
                                  <ExpandableTableCell colSpan={5}>
                                    {row.sourceList
                                      .filter(
                                        (source) =>
                                          includedSource &&
                                          source.sourceIdentity !== "0",
                                      )
                                      .map((subSource, subSourceIndex) => {
                                        const isAlternateDisabled =
                                          includedSource &&
                                          source.sourceIdentity === "1" &&
                                          row.sourceList.length > 1 &&
                                          (subSource.sourceIdentity === "2" ||
                                            subSource.type ===
                                              "alternateSource");
                                        return (
                                          <StyledAlternateCard
                                            key={sourceIndex}
                                            elevation={2}
                                          >
                                            <Row
                                              key={subSourceIndex}
                                              includedSource={includedSource}
                                              isDisabled={!isAlternateDisabled}
                                            >
                                              <Cell width="5%">
                                                <Checkbox
                                                  icon={<BpIcon />}
                                                  checkedIcon={
                                                    <BpCheckedIcon />
                                                  }
                                                  checked={selectedCheckboxes.includes(
                                                    subSource.location,
                                                  )}
                                                  onChange={() =>
                                                    handleCheckboxChange(
                                                      subSource.location,
                                                    )
                                                  }
                                                  disabled={isAlternateDisabled}
                                                  onClick={(event) =>
                                                    event.stopPropagation()
                                                  }
                                                />
                                              </Cell>
                                              <Cell width="45%">
                                                <EllipsisBox>
                                                  <Typography
                                                    variant="body"
                                                    fontSize={"0.82rem"}
                                                    className={
                                                      "col" + subSource.location
                                                    }
                                                    display={"flex"}
                                                    flexDirection={"column"}
                                                  >
                                                    {truncateText(
                                                      subSource.source,
                                                    )}
                                                    <Typography
                                                      variant="caption"
                                                      fontSize={"0.625rem"}
                                                      sx={{
                                                        lineHeight: "15px",
                                                      }}
                                                      color={"black"}
                                                    >
                                                      {truncateText(
                                                        subSource.secondarySource,
                                                      )}
                                                    </Typography>
                                                  </Typography>
                                                </EllipsisBox>
                                              </Cell>
                                              <Cell width="18%">
                                                <Box
                                                  display="flex"
                                                  alignItems="center"
                                                >
                                                  <PercentageBar>
                                                    {[...Array(20)].map(
                                                      (_, i) => (
                                                        <FilledSegment
                                                          key={i}
                                                          filled={
                                                            i <
                                                            Math.ceil(
                                                              subSource.percent ===
                                                                "<1"
                                                                ? 1
                                                                : subSource.percent /
                                                                    5,
                                                            )
                                                          }
                                                        />
                                                      ),
                                                    )}
                                                    <PercentageLabel
                                                      percent={
                                                        subSource.percent
                                                      }
                                                    >
                                                      <Typography
                                                        variant="caption"
                                                        fontSize={"0.85rem"}
                                                        sx={{
                                                          lineHeight: "15px",
                                                        }}
                                                      >
                                                        {`${subSource.percent}%`}
                                                      </Typography>
                                                    </PercentageLabel>
                                                  </PercentageBar>
                                                </Box>
                                              </Cell>
                                              <Cell width="10%" align="center">
                                                <StyledLinkButton
                                                  aria-label="expand row"
                                                  size="small"
                                                  href={subSource.link}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  <LinkIcon fontSize="small" />
                                                </StyledLinkButton>
                                              </Cell>
                                            </Row>
                                          </StyledAlternateCard>
                                        );
                                      })}
                                  </ExpandableTableCell>
                                )}
                              </StyledBodyCard>
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </>
            ) : (
              <CommonTableSkeleton />
            )}
          </Table>
        </TableContainer>
      </ScrollContainer>
      {selectedCheckboxes?.length > 0 && (
        <StyledButton
          tabIndex={includedSource}
          onClick={handleExcludeInclude}
          disabled={isLoading}
        >
          {isLoading ? (
            <BeatLoader color="#fff" size={12} />
          ) : (
            <Body1
              title={includedSource === true ? "Exclude" : "Include"}
              variant={"body_2"}
              color={"#fff"}
            />
          )}
        </StyledButton>
      )}
    </>
  );
};

export default CommonTable;
