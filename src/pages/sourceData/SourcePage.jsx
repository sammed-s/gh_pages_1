import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { extractLocation } from "../../utils";
import SideBySideModal from "./sourcePageSection/SideBySideModal";
import { SourcePageSkeleton } from "../../component";

const ScrollContainer = styled(Box)`
  height: calc(100vh - 12.5rem);
  overflow-y: auto;
  position: relative;

  @media (min-height: 390px) and (max-height: 410px) {
    height: 100vh;
  }
`;

const SourcePageContainer = styled.div`
  #source_page {
    cursor: pointer;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SourcePage = ({ setTotalPages }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [placement, setPlacement] = useState("bottom");
  const arrowRef = useRef(null);
  const popperRef = useRef(null);
  const observerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const open = Boolean(anchorEl);
  const htmlContent = useSelector((state) => state.sourcebody.htmlData);
  const settingsSuccess = useSelector((state) => state.navbar.isSuccess);
  const { isSuccess } = useSelector((state) => state.sourcematch);

  useEffect(() => {
    const handleElementScrolled = (event) => {
      const { targetElement, data } = event.detail;
      setAnchorEl(targetElement);
      setCardData(data);
    };

    const handleElementScrolledFromMatchedSource = (event) => {
      const { targetElement, data } = event.detail;
      setAnchorEl(targetElement);
      setCardData(data);
    };

    document.addEventListener("elementScrolled", handleElementScrolled);
    document.addEventListener(
      "elementScrolledFromMatchedSource",
      handleElementScrolledFromMatchedSource,
    );

    return () => {
      document.removeEventListener("elementScrolled", handleElementScrolled);
      document.removeEventListener(
        "elementScrolledFromMatchedSource",
        handleElementScrolledFromMatchedSource,
      );
    };
  }, [setAnchorEl, setCardData]);

  useEffect(() => {
    if (cardData) {
      const elementBaseClasses = [
        `s_r_c_${cardData?.location}_`,
        `Qs_r_c_${cardData?.location}_`,
        `Rs_r_c_${cardData?.location}_`,
      ];
      const foundElements = [];
      let suffix = 1;
      while (true) {
        let foundInThisIteration = false;
        for (const baseClass of elementBaseClasses) {
          const className = `${baseClass}${suffix}`;
          const elements = document.getElementsByClassName(className);
          if (elements.length > 0) {
            foundElements.push(elements[0]);
            foundInThisIteration = true;
          }
        }
        if (!foundInThisIteration) {
          break;
        }
        suffix++;
      }
      setTotalElements(foundElements.length);
      setCurrentIndex(foundElements.findIndex((el) => el === anchorEl));
    }
  }, [cardData, anchorEl]);

  useEffect(() => {
    if (popperRef.current) {
      const popperElement = popperRef.current;

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.attributeName === "data-popper-placement") {
            const currentPlacement = popperElement.getAttribute(
              "data-popper-placement",
            );
            setPlacement(currentPlacement);
          }
        }
      });

      observer.observe(popperElement, { attributes: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [open]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(() => {}, {
      root: scrollContainerRef.current,
      threshold: 0.1,
    });

    const elementsToObserve = document.querySelectorAll(
      "#source_page > div, #source_page > p",
    );

    setTotalPages(elementsToObserve.length);

    elementsToObserve.forEach((element, index) => {
      element.id = `pg_${index + 1}`;
      observerRef.current.observe(element);
    });

    const mutationObserver = new MutationObserver(() => {
      observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(() => {}, {
        root: scrollContainerRef.current,
        threshold: 0.1,
      });

      elementsToObserve.forEach((element) => {
        observerRef.current.observe(element);
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observerRef.current.disconnect();
      mutationObserver.disconnect();
    };
  }, [htmlContent]);

  useEffect(() => {
    if (isSuccess || settingsSuccess) {
      setAnchorEl(null);
      setCardData(null);
    }
  }, [isSuccess, settingsSuccess]);

  const handleElementClick = (e) => {
    setAnchorEl(null);
    setCardData(null);
    const element = e.target;
    const location = extractLocation(element);
    if (location) {
      const event = new CustomEvent("elementClicked", { detail: location });
      document.dispatchEvent(event);
    }
  };
  return (
    <>
      <ScrollContainer id="scroll-container" ref={scrollContainerRef}>
        <SourcePageContainer onClick={handleElementClick}>
          {htmlContent ? (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                id="source_page"
              />
            </>
          ) : (
            <SourcePageSkeleton />
          )}
        </SourcePageContainer>
        <SideBySideModal
          anchorEl={anchorEl}
          arrowRef={arrowRef}
          popperRef={popperRef}
          cardData={cardData}
          placement={placement}
          currentIndex={currentIndex}
          totalElements={totalElements}
          setAnchorEl={setAnchorEl}
          setCardData={setCardData}
        />
      </ScrollContainer>
    </>
  );
};

export default SourcePage;
