import { TabMenu } from "../../component";
import FileMetadata from "./fileInfoSection/FileMetadata";
import SubmissionDetails from "./fileInfoSection/SubmissionDetails";
import TextInformation from "./fileInfoSection/TextInformation";

const FileInfo = () => {
  const menuButton = [
    { label: "Submission Details", width: "33.3%" },
    { label: "Text Information", width: "33.3%" },
    { label: "File Metadata", width: "33.3%" },
  ];
  const components = [
    <SubmissionDetails key={1} />,
    <TextInformation key={2} />,
    <FileMetadata key={3} />,
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

export default FileInfo;
