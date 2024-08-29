import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Caption = ({ title, mb, variant, color }) => {
  return (
    <>
      <Typography
        variant={variant}
        component="div"
        gutterBottom
        color={color ? color : "#707070"}
        style={{ marginBottom: mb }}
      >
        {title}
      </Typography>
    </>
  );
};

Caption.propTypes = {
  title: PropTypes.string,
};

export default Caption;
