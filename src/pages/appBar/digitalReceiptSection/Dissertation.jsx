import {
  DigitalReceiptHeader,
  DigitalReceiptBody,
  DigitalReceiptFooter,
} from "../../../component";
import { useSelector } from "react-redux";

const Dissertation = () => {
  const customerLogo = useSelector(
    (state) => state.sourcematch.data.customerLogo,
  );
  const {
    qrCode,
    submission: { college_name },
  } = useSelector((state) => state.sourcematch.data);

  const {
    submission: { name, mail_id, title, percent, paper_id, date_up },
  } = useSelector((state) => state.sourcematch.data);

  const submissionDetails = [
    { label: "Author Name", value: name },
    { label: "Course of Study" },
    { label: "Name of Guide" },
    { label: "Department" },
    { label: "Acceptable Maximum Limit" },
    { label: "Submitted By", value: mail_id },
    { label: "Paper Title", value: title },
    { label: "Similarity", value: `${percent}%` },
    { label: "Paper ID", value: paper_id },
    { label: "Submission Date", value: date_up },
  ];

  const titles = [
    "Sign of Student",
    "Head of the Department",
    "Sign of Guide",
    "University Librarian",
    "Director of Post Graduate Studies",
  ];

  return (
    <>
      <DigitalReceiptHeader
        title={"Dissertation"}
        customerLogo={customerLogo}
        qrCode={qrCode}
        collegeName={college_name}
      />
      <DigitalReceiptBody data={submissionDetails} />
      <DigitalReceiptFooter titles={titles} />
    </>
  );
};

export default Dissertation;
