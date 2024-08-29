import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Title = ({ title, mb, variant, color }) => {
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

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
