import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Heading = ({ title, mb, color, variant }) => {
  return (
    <>
      <Typography
        variant={variant}
        component="div"
        gutterBottom
        color={color ? color : "#424242"}
        style={{ marginBottom: mb }}
      >
        {title}
      </Typography>
    </>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
};

export default Heading;
