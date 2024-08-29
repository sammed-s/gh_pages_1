import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Subtitle2 = ({ title, mb }) => {
  return (
    <>
      <Typography
        variant="subtitle2"
        component="div"
        gutterBottom
        style={{ marginBottom: mb }}
      >
        {title}
      </Typography>
    </>
  );
};

Subtitle2.propTypes = {
  title: PropTypes.string,
};

export default Subtitle2;
