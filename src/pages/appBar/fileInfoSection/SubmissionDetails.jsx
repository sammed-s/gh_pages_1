import { useSelector } from "react-redux";
import { CommonList } from "../../../component";

const SubmissionDetails = () => {
  const {
    submissionsDetailsEntity: {
      assignmentName,
      submissionDateAndTime,
      title,
      paper_id,
      fileType,
      downloadableFileName,
      fileSize,
      charCount,
      wordCount,
      totalSentences,
      totalPages,
      totalLines,
    },
  } = useSelector((state) => state.sourcematch.data.fileInformationEntity);

  const submissionDetails = [
    { label: "Folder Name", value: assignmentName },
    { label: "Submission Date & Time", value: submissionDateAndTime },
    { label: "Title", value: title },
    { label: "Paper Id", value: paper_id },
    { label: "Document Type", value: fileType },
    { label: "File Name", value: downloadableFileName },
    { label: "File Size", value: fileSize },
    { label: "Char Count", value: charCount },
    { label: "Word Count", value: wordCount },
    { label: "Total Sentences", value: totalSentences },
    { label: "Total Pages", value: totalPages },
    { label: "Total Lines", value: totalLines },
  ];

  return (
    <>
      <CommonList data={submissionDetails} />
    </>
  );
};

export default SubmissionDetails;
