import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Subtitle1 = ({ title, mb }) => {
  return (
    <>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom
        style={{ marginBottom: mb }}
      >
        {title}
      </Typography>
    </>
  );
};

Subtitle1.propTypes = {
  title: PropTypes.string,
};

export default Subtitle1;
