import PropTypes from "prop-types";
import { Card, CardContent } from "@mui/material";

const CardView = ({ children, variant, elevation, sourcePage }) => {
  return (
    <>
      <Card
        variant={variant}
        elevation={elevation}
        sx={sourcePage ? { border: "none", borderRadius: 0 } : {}}
      >
        <CardContent>{children}</CardContent>
      </Card>
    </>
  );
};

CardView.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  elevation: PropTypes.number,
  sourcePage: PropTypes.bool,
};

export default CardView;
