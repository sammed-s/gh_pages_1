import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const MainHeading = ({ title, mb, variant }) => {
  return (
    <>
      <Typography
        variant={variant}
        component="div"
        gutterBottom
        style={{ marginBottom: mb }}
      >
        {title}
      </Typography>
    </>
  );
};

MainHeading.propTypes = {
  title: PropTypes.string,
};

export default MainHeading;
