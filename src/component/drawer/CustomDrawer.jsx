import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const CustomDrawer = ({
  isOpen,
  onClose,
  children,
  anchor = "left",
  drawerWidth = 240,
  customStyles = {},
  drawerHeight,
}) => {
  const toggleDrawer = () => {
    onClose();
  };

  const isLeftOrRight = anchor === "left" || anchor === "right";

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={toggleDrawer}
        size="small"
        sx={{
          ...(isLeftOrRight
            ? { marginRight: isOpen ? 0 : -9 }
            : { marginBottom: isOpen ? 0 : -9 }),
          zIndex: 1300,
          backgroundColor: "white",
          padding: "0.06rem !important",
          position: "absolute",
          left: isOpen ? "6%" : "1.1%",
          top: "50%",
          disableRipple: true,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        {isOpen ? (
          anchor === "left" ? (
            <KeyboardArrowLeftIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )
        ) : anchor === "left" ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowLeftIcon />
        )}
      </IconButton>

      <Drawer
        anchor={anchor}
        open={isOpen}
        onClose={onClose}
        variant="persistent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            ...customStyles,
            height: drawerHeight,
            backgroundColor: "#f3f4fa",
            border: "none",
          },
        }}
      >
        <Box sx={{ width: drawerWidth, paddingLeft: 1 }}>{children}</Box>
      </Drawer>
    </Box>
  );
};

CustomDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  drawerWidth: PropTypes.number,
  customStyles: PropTypes.object,
  drawerHeight: PropTypes.string,
};

export default CustomDrawer;
