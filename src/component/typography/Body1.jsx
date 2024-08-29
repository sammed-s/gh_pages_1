import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Body1 = ({ title, mb, variant, color }) => {
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

Body1.propTypes = {
  title: PropTypes.string,
};

export default Body1;
