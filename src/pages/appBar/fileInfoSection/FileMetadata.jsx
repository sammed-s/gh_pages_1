import { useSelector } from "react-redux";
import { CommonList } from "../../../component";

function FileMetadata() {
  const {
    fileDetailsEntity: {
      fileName,
      fileAuthor,
      subject,
      keywords,
      createdDate,
      modifiedDate,
      application,
      pdfProducer,
      version,
      fileSize,
      pageWidthAndHeight,
      totalPages,
    },
  } = useSelector((state) => state.sourcematch.data.fileInformationEntity);

  const fileMetadata = [
    { label: "File Name", value: fileName },
    { label: "Author Name", value: fileAuthor },
    { label: "Subject", value: subject },
    { label: "Keywords", value: keywords },
    { label: "Created Date", value: createdDate },
    { label: "Modified Date", value: modifiedDate },
    { label: "Application", value: application },
    { label: "PDF Producer", value: pdfProducer },
    { label: "Version", value: version },
    { label: "File Size", value: fileSize },
    { label: "Page Width & Height", value: pageWidthAndHeight },
    { label: "Total Pages", value: totalPages },
  ];

  return <CommonList data={fileMetadata} />;
}

export default FileMetadata;
