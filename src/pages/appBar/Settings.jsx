import { useState, useEffect } from "react";
import { CommonTable2 } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { fetchExcludeIncludeData } from "../../redux/actions/navbarActions";
import {
  handleExcludeIncludeHtml,
  handleExcludeIncludeSettings,
} from "../../utils";

const Settings = () => {
  const [tableData, setTableData] = useState([]);
  const [isSelected, isSetSelected] = useState();
  const dispatch = useDispatch();
  const columns = [
    { label: "Types", field: "name", headerWidth: "30%", bodyWidth: "31%" },
    { label: "Total Content", field: "total", bodyWidth: "22%" },
    { label: "Similarity %", field: "similarity", bodyWidth: "20%" },
    { label: "Sources", field: "source", bodyWidth: "15%" },
    { label: "Yes / No", field: "exclude", bodyWidth: "8%" },
  ];
  const excludeSettings = useSelector(
    (state) => state.sourcematch.data.excludeSettings1,
  );
  const excludeThreshold = useSelector(
    (state) => state.navbarsettings.data.exclude_threshold,
  );
  const sourceList = useSelector(
    (state) => state.sourcematch.data.sourceListParent,
  );
  const { isSuccess } = useSelector((state) => state.navbar);

  const { quotes, reference, smallSources } =
    handleExcludeIncludeSettings(sourceList);

  useEffect(() => {
    if (excludeSettings) {
      const formattedData = excludeSettings.map((item) => {
        let message = "";

        if (item.name === "Exclude Quotes" && !item.exclude && !item.include) {
          message = "There are no quotes in this document.";
        } else if (
          item.name === "Exclude Reference / Bibliography" &&
          !item.exclude &&
          !item.include
        ) {
          message = "There are no references / bibliography in this document.";
        } else if (
          item.name === `Exclude < ${excludeThreshold} words` &&
          !item.exclude &&
          !item.include
        ) {
          message = `There are no less than ${excludeThreshold} words in this document.`;
        }

        return {
          ...item,
          message,
          checked: item.exclude || item.include,
        };
      });

      setTableData(formattedData);
    }
  }, [excludeSettings]);

  useEffect(() => {
    if (isSelected === "Q1") {
      handleExcludeIncludeHtml(true, quotes);
    } else if (isSelected === "Q0") {
      handleExcludeIncludeHtml(false, quotes);
    } else if (isSelected === "R1") {
      handleExcludeIncludeHtml(true, reference);
    } else if (isSelected === "R0") {
      handleExcludeIncludeHtml(false, reference);
    } else if (isSelected === "F1") {
      handleExcludeIncludeHtml(true, smallSources);
    } else if (isSelected === "F0") {
      handleExcludeIncludeHtml(false, smallSources);
    }
  }, [isSuccess]);

  const handleToggleChange = (event, rowIndex) => {
    const updatedData = [...tableData];
    const item = updatedData[rowIndex];

    if (item.exclude === false && item.include === false) {
      return;
    }

    const isChecked = event.target.checked;
    item.checked = isChecked;

    if (item.name === "Exclude Quotes") {
      if (isChecked) {
        isSetSelected("Q1");
        dispatch(fetchExcludeIncludeData("Q1"));
      } else {
        isSetSelected("Q0");
        dispatch(fetchExcludeIncludeData("Q0"));
      }
    } else if (item.name === "Exclude Reference / Bibliography") {
      if (isChecked) {
        isSetSelected("R1");
        dispatch(fetchExcludeIncludeData("R1"));
      } else {
        isSetSelected("R0");
        dispatch(fetchExcludeIncludeData("R0"));
      }
    } else if (item.name === `Exclude < ${excludeThreshold} words`) {
      if (isChecked) {
        isSetSelected("F1");
        dispatch(fetchExcludeIncludeData("F1"));
      } else {
        isSetSelected("F0");
        dispatch(fetchExcludeIncludeData("F0"));
      }
    }
    setTableData(updatedData);
  };

  return (
    <>
      <CommonTable2
        columns={columns}
        data={tableData}
        onToggleChange={handleToggleChange}
      />
    </>
  );
};

export default Settings;
