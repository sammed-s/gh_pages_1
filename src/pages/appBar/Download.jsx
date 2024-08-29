import { useState } from "react";
import styled from "styled-components";
import { PDFDownloadIcon, HTMLDownloadIcon } from "../../assets";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDownloadHTML,
  fetchDownloadReport,
  fetchDownloadSummary,
} from "../../redux/actions/navbarActions";
import { originalFileName } from "../../redux/features/sourceMatchSlice";
import { BeatLoader } from "react-spinners";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const ContainerWrapper = styled.div`
  text-align: center;
  background: ${({ selected }) => (selected ? "#b3c3ff" : "#d9e1ff")};
  border-radius: 10px;
  padding: 20px 40px;
  margin: 7px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? "2px solid #3f51b5" : "none")};

  &:hover {
    background: #c1d1ff;
  }
`;

const Download = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const fileName = useSelector(originalFileName);
  const { isLoading } = useSelector((state) => state.navbar);
  const qKey = sessionStorage.getItem("qKey");
  const paperId = sessionStorage.getItem("paperId");
  const data = { qKey, paperId, fileName };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption === "PDF") {
      dispatch(fetchDownloadReport(data));
    }
    if (selectedOption === "HTML") {
      dispatch(fetchDownloadHTML(data));
    }
    if (selectedOption === "SUMMARY") {
      dispatch(fetchDownloadSummary(data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <ContainerWrapper
          selected={selectedOption === "PDF"}
          onClick={() => handleSelect("PDF")}
        >
          <PDFDownloadIcon />
        </ContainerWrapper>
        <ContainerWrapper
          selected={selectedOption === "HTML"}
          onClick={() => handleSelect("HTML")}
        >
          <HTMLDownloadIcon />
        </ContainerWrapper>
      </Container>
      <Container>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!selectedOption || isLoading}
        >
          {isLoading ? <BeatLoader color="#fff" size={12} /> : "Download"}
        </Button>
      </Container>
    </form>
  );
};

export default Download;
