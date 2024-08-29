import { TabMenu } from "../../component";
import Article from "./digitalReceiptSection/Article";
import Dissertation from "./digitalReceiptSection/Dissertation";
import Synopsis from "./digitalReceiptSection/Synopsis";
import Thesis from "./digitalReceiptSection/Thesis";

const DigitalReceipt = () => {
  const menuButton = [
    { label: "Synopsis", width: "25%" },
    { label: "Dissertation", width: "25%" },
    { label: "Thesis", width: "25%" },
    { label: "Article", width: "25%" },
  ];
  const components = [
    <Synopsis key={1} />,
    <Dissertation key={2} />,
    <Thesis key={3} />,
    <Article key={4} />,
  ];

  const handleTabChange = () => {};

  return (
    <>
      <TabMenu
        menuButton={menuButton}
        components={components}
        handleAPI={handleTabChange}
      />
    </>
  );
};

export default DigitalReceipt;
