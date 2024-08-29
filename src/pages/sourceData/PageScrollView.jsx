import { Box } from "@mui/material";
import { Caption } from "../../component";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { PageScrollViewSkeleton } from "../../component";

const ScrollContainer = styled(Box)`
  height: calc(100vh - 6.9rem);
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 2rem;
`;

const StyledPaper = styled(Box)`
  margin-bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 6.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  ${(props) =>
    props.isSelected &&
    `
    border: 0.4px solid #3672FF;
    border-radius: 1px;
  `}
  &:hover {
    transform: scale(1.05);
  }
`;

const ContentBox = styled(Box)`
  width: 3.5625rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 0.3rem;
  margin-top: 0.5rem;
  ${(props) =>
    `
    box-shadow: ${props.isSelected ? "0px 4px 10px rgba(54,114,255,0.52) !important" : "0px 4px 10px rgba(0, 0, 0, 0.18)"} ;
  `}
`;

const PageScrollView = ({ activeTab, setActiveTab, totalPages }) => {
  const pages = useSelector((state) => state.pagescroll.data);

  const handleClick = (index) => {
    const activePage = document.querySelector(`#page_${index}`);
    const targetElement = document.querySelector(`#pg_${index}`);

    if (activePage) {
      activePage.scrollIntoView({ behavior: "smooth", block: "center" });
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
          setActiveTab(index);
        }, 300);
      }
    }
  };

  return (
    <ScrollContainer>
      {totalPages !== 0 ? (
        Array.from({ length: totalPages }, (_, i) => (
          <StyledPaper
            key={i}
            id={`page_${i + 1}`}
            onClick={() => handleClick(i + 1)}
          >
            <ContentBox isSelected={activeTab === i + 1}>
              {pages[i] ? (
                <img
                  src={`data:image/jpeg;base64,${pages[i]}`}
                  alt={`page ${i + 1}`}
                  width="100%"
                  height="100%"
                />
              ) : (
                <Caption title={"Preview unavailable"} variant={"caption_1"} />
              )}
            </ContentBox>
            <Caption variant="caption_1" title={i + 1}></Caption>
          </StyledPaper>
        ))
      ) : (
        <PageScrollViewSkeleton />
      )}
    </ScrollContainer>
  );
};

export default PageScrollView;
