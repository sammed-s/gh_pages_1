import { TabMenu2 } from "../../../component";
import MatchedSource from "./MatchedSource";
import ExcludeSource from "./ExcludeSource";
import { useSelector } from "react-redux";

const SourceHeader = () => {
  const data = useSelector((state) => state.sourcematch.data);

  const menuButton = [
    { label: "Matched sources" },
    { label: "Excluded sources" },
  ];
  const components = [
    <MatchedSource key={1} sourceData={data} includedSource={true} />,
    <ExcludeSource key={2} sourceData={data} includedSource={false} />,
  ];

  const handleTabChange = () => {};

  return (
    <>
      <TabMenu2
        menuButton={menuButton}
        components={components}
        handleAPI={handleTabChange}
      />
    </>
  );
};

export default SourceHeader;
