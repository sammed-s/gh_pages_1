import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Body1 from "../typography/Body1";

const StyledButton = styled(Button)`
  background: ${(props) =>
    props.$selected ? "#3672FF" : "#F2F6FE"} !important;
  border-radius: 0.3125rem !important;
  margin: 0.15rem !important;
  width: 48.7%;
  text-transform: none !important;

  @media (min-width: 300px) and (max-width: 400px) {
    width: 48.6% !important;
  }

  @media (min-width: 900px) and (max-width: 1210px) {
    width: 46% !important;
  }

  @media (max-width: 375px) {
    width: 100% !important;
  }
`;

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const TabMenu2 = ({ menuButton, components, handleAPI }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleAPI(newValue);
  };

  return (
    <>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {menuButton.map((item, index) => (
          <StyledButton
            key={index}
            onClick={(event) => handleChange(event, index)}
            {...a11yProps(index)}
            disabled={item.isDisabled}
            $selected={value === index}
          >
            <Body1
              title={item.label}
              variant={"body_2"}
              color={value === index ? "#fff" : "#000"}
            />
          </StyledButton>
        ))}
      </Box>
      {components.map((component, index) => (
        <TabPanel key={index} value={value} index={index}>
          {component}
        </TabPanel>
      ))}
    </>
  );
};

export default TabMenu2;
