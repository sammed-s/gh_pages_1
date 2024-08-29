import { useState, useEffect } from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Skeleton,
} from "@mui/material";
import styled from "styled-components";
import { DialogModal } from "../../component";
import useNavItems from "./useNavItems";
import { useSelector } from "react-redux";

const StyledIconButton = styled(IconButton)`
  margin: 0 0.32rem !important;
`;

const AppNav = ({ mb }) => {
  const {
    data: {
      fileInformationEntity,
      totalPercentage,
      role,
      sourceListParent,
      submission,
    },
  } = useSelector((state) => state.sourcematch);
  const isSuccessEmailNotification = useSelector(
    (state) => state.navbar.isSuccess,
  );
  const navItems = useNavItems();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fulWidth, setfulWidth] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMaxWidth, setDialogMaxWidth] = useState("md");
  const [filteredIcons, setFilteredIcons] = useState([]);

  const handleOpenDialog = (component, title, size, fulWidth) => {
    setSelectedComponent(component);
    setDialogTitle(title);
    setDialogMaxWidth(size);
    setfulWidth(fulWidth);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedComponent(null);
    setDialogTitle("");
  };

  useEffect(() => {
    const filtered = [];
    const addedLabels = new Set();
    const navItem = (icon) => {
      if (!addedLabels.has(icon.label)) {
        filtered.push(icon);
        addedLabels.add(icon.label);
      }
    };

    if (totalPercentage === "doc:error" || totalPercentage === "doc_error") {
      navItem(navItems[0]); // Email Notification
      navItem(navItems[1]); // QR Code
      navItem(navItems[3]); // Digital Receipt
      navItem(navItems[5]); // Download
      navItem(navItems[7]); // Share analysis page
    }

    if (role === "student" && sourceListParent?.length > 0) {
      navItem(navItems[1]); // QR Code
      navItem(navItems[4]); // File Information
      navItem(navItems[5]); // Download
    }

    if (
      (role === "instructor" || role === "admin") &&
      sourceListParent?.length > 0
    ) {
      navItem(navItems[0]); // Email Notification
      navItem(navItems[1]); // QR Code
      navItem(navItems[2]); // Save To Repository
      navItem(navItems[3]); // Digital Receipt
      navItem(navItems[4]); // File Information
      navItem(navItems[5]); // Download
      navItem(navItems[6]); // Settings
      navItem(navItems[7]); // Share analysis page
    }

    if (
      (role === "lim-instructor" || role === "lim-admin") &&
      sourceListParent?.length > 0
    ) {
      navItem(navItems[0]); // Email Notification
      navItem(navItems[1]); // QR Code
      navItem(navItems[2]); // Save To Repository
      navItem(navItems[3]); // Digital Receipt
      navItem(navItems[4]); // File Information
      navItem(navItems[5]); // Download
      if (submission?.lang !== "Regional") {
        navItem(navItems[6]); // Settings
      }
      navItem(navItems[7]); // Share analysis page
    }

    if (role === "consortium" && sourceListParent?.length > 0) {
      navItem(navItems[1]); // QR Code
      navItem(navItems[2]); // Save To Repository
      navItem(navItems[3]); // Digital Receipt
      navItem(navItems[4]); // File Information
      navItem(navItems[5]); // Download
      if (submission?.lang !== "Regional") {
        navItem(navItems[6]); // Settings
      }
      navItem(navItems[7]); // Share analysis page
    }

    setFilteredIcons(filtered);
  }, [totalPercentage, role, sourceListParent, submission?.lang]);

  useEffect(() => {
    if (dialogTitle !== "Settings" && isSuccessEmailNotification) {
      handleCloseDialog();
    }
  }, [isSuccessEmailNotification]);

  return (
    <>
      {fileInformationEntity === undefined || filteredIcons.length === 0 ? (
        mb ? (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={`skeleton-listitem-${i}`}
                width={220}
                height={47}
                style={{ margin: "0 0.56rem" }}
              />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={`skeleton-iconbutton-${i}`}
                variant="circular"
                width={33}
                height={35}
                style={{ margin: "0 0.56rem" }}
              />
            ))}
          </>
        )
      ) : (
        filteredIcons.map((item, index) => {
          const handleClick = () =>
            handleOpenDialog(
              item.component,
              item.label,
              item.size,
              item.fulWidth,
            );

          return mb ? (
            <ListItem button key={index} onClick={handleClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ) : (
            <Tooltip key={index} title={item.label} arrow>
              <StyledIconButton color="inherit" onClick={handleClick}>
                {item.icon}
              </StyledIconButton>
            </Tooltip>
          );
        })
      )}

      <DialogModal
        isOpen={dialogOpen}
        handleClose={handleCloseDialog}
        fullWidth={fulWidth}
        maxWidth={dialogMaxWidth}
        headingTitle={dialogTitle}
        variant="heading"
      >
        {selectedComponent}
      </DialogModal>
    </>
  );
};

export default AppNav;
