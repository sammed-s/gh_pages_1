import { useSelector } from "react-redux";
import { CommonTable2 } from "../../../component";

function TextInformation() {
  const { textInformationEntity } = useSelector(
    (state) => state.sourcematch.data.fileInformationEntity,
  );

  const columns = [
    { label: "Sl.No", field: "slno", headerWidth: "10%", bodyWidth: "10%" },
    { label: "Font Size", field: "size", headerWidth: "23%", bodyWidth: "23%" },
    { label: "Name", field: "fontName", headerWidth: "32%", bodyWidth: "35%" },
    { label: "Color", field: "color", headerWidth: "18%", bodyWidth: "20%" },
    { label: "Usage", field: "usage", headerWidth: "30%", bodyWidth: "5%" },
  ];

  return (
    <CommonTable2
      columns={columns}
      data={textInformationEntity}
      isFileInfo={true}
    />
  );
}

export default TextInformation;
