import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Body2 = ({ title, mb, variant, color, fw }) => {
  return (
    <>
      <Typography
        variant={variant}
        component="div"
        gutterBottom
        color={color ? color : "#424242"}
        style={{ marginBottom: mb, fontWeight: fw }}
      >
        {title}
      </Typography>
    </>
  );
};

Body2.propTypes = {
  title: PropTypes.string,
};

export default Body2;
