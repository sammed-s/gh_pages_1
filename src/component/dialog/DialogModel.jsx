import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Heading from "../typography/Heading";
import { Tooltip } from "@mui/material";

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title">
      <Paper {...props} />
    </Draggable>
  );
}

const DialogModal = ({
  isOpen,
  handleClose,
  children,
  fullWidth,
  maxWidth,
  headingTitle,
  variant,
}) => {
  return (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Heading title={headingTitle} variant={variant} mb={0} />
          <Tooltip title="Close" arrow>
            <IconButton
              aria-label="Close"
              size="small"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon fontSize="0.4rem" />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogModal;
