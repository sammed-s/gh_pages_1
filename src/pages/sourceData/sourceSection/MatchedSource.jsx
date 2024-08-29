import { useEffect, useState } from "react";
import { CommonTable } from "../../../component";
import { scrollToElement, handleExcludeIncludeHtml } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExcludeSources,
  fetchSimilarityData,
} from "../../../redux/actions/similarityActions";

const MatchedSource = ({ includedSource, sourceData }) => {
  const [excludedSources, setExcludesSources] = useState([]);
  const [singleExcludeSources, setSingleExcludeSources] = useState([]);
  const dispatch = useDispatch();
  const isSuccess = useSelector((state) => state.sourcematch.isSuccess);

  useEffect(() => {
    const handleElementSelected = (event) => {
      const { selectedCheckboxes } = event.detail;
      setExcludesSources(selectedCheckboxes);
    };
    document.addEventListener("checkboxSelected", handleElementSelected);

    return () => {
      document.removeEventListener("checkboxSelected", handleElementSelected);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchSimilarityData(sessionStorage.getItem("paperId")));
      handleExcludeIncludeHtml(
        includedSource,
        excludedSources.length === 0 ? singleExcludeSources : excludedSources,
      );
    }
  }, [dispatch, isSuccess]);

  const handleScrollToElement = (e, data) => {
    const result = scrollToElement(data, null, null);
    if (result) {
      const event = new CustomEvent("elementScrolledFromMatchedSource", {
        detail: result,
      });
      document.dispatchEvent(event);
    }
  };

  const handleExcludeClick = (i) => {
    setSingleExcludeSources([i]);
    dispatch(fetchExcludeSources([i.toString()]));
  };

  const handleExcludeInclude = () => {
    dispatch(fetchExcludeSources(excludedSources));
  };

  return (
    <>
      <CommonTable
        rows={sourceData}
        scrollToElement={handleScrollToElement}
        handleExcludeClick={handleExcludeClick}
        handleExcludeInclude={handleExcludeInclude}
        includedSource={includedSource}
      />
    </>
  );
};

export default MatchedSource;
