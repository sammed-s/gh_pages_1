import {
  MailIcon,
  QRCodeIcon,
  SaveToRepositoryIcon,
  DigitalReceiptIcon,
  FileInfoIcon,
  DownloadIcon,
  SettingsIcon,
  ShareIcon,
} from "../../assets";
import EmailNotification from "./EmailNotification";
import QRCode from "./QRCode";
import SaveToRepository from "./SaveToRepository";
import DigitalReceipt from "./DigitalReceipt";
import FileInfo from "./FileInfo";
import Download from "./Download";
import Settings from "./Settings";
import ShareAnalysisPage from "./ShareAnalysisPage";

const useNavItems = () => {
  return [
    {
      icon: <MailIcon />,
      label: "Email Notification",
      component: <EmailNotification />,
      size: "xs",
      fulWidth: true,
    },
    {
      icon: <QRCodeIcon />,
      label: "QR Code",
      component: <QRCode />,
      size: "xs",
      fulWidth: false,
    },
    {
      icon: <SaveToRepositoryIcon />,
      label: "Save To Repository",
      component: <SaveToRepository />,
      size: "xs",
      fulWidth: true,
    },
    {
      icon: <DigitalReceiptIcon />,
      label: "Digital Receipt",
      component: <DigitalReceipt />,
      size: "sm",
      fulWidth: true,
    },
    {
      icon: <FileInfoIcon />,
      label: "File Information",
      component: <FileInfo />,
      size: "sm",
      fulWidth: true,
    },
    {
      icon: <DownloadIcon />,
      label: "Download",
      component: <Download />,
      size: "md",
    },
    {
      icon: <SettingsIcon />,
      label: "Settings",
      component: <Settings />,
      size: "md",
      fulWidth: true,
    },
    {
      icon: <ShareIcon />,
      label: "Share analysis page",
      component: <ShareAnalysisPage />,
      size: "xs",
      fulWidth: true,
    },
  ];
};

export default useNavItems;
