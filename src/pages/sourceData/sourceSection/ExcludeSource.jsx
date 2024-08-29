import { useEffect, useState } from "react";
import { CommonTable } from "../../../component";
import { handleExcludeIncludeHtml } from "../../../utils";
import {
  fetchIncludeSources,
  fetchSimilarityData,
} from "../../../redux/actions/similarityActions";
import { useDispatch, useSelector } from "react-redux";

const ExcludeSource = ({ includedSource, sourceData }) => {
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

  const handleIncludeClick = (i) => {
    setSingleExcludeSources([i]);
    dispatch(fetchIncludeSources([i.toString()]));
  };

  const handleExcludeInclude = () => {
    dispatch(fetchIncludeSources(excludedSources));
  };

  return (
    <>
      <CommonTable
        rows={sourceData}
        includedSource={includedSource}
        handleIncludeClick={handleIncludeClick}
        handleExcludeInclude={handleExcludeInclude}
      />
    </>
  );
};

export default ExcludeSource;
