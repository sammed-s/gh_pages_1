import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";

const StyledTab = styled(Tab)`
  background: ${(props) => (props.$selected ? "#3672FF" : "#fff")} !important;
  color: ${(props) => (props.$selected ? "#fff" : "#3672FF")} !important;
  border-radius: ${(props) => props.$selected && "0.3125rem"} !important;
  padding: 0.625rem 1rem !important;
  width: ${(props) => props.$width};
`;

const FlexBox = styled(Card)`
  margin: 0.5rem 0 !important;
  background-color: #f8f8f8 !important;
  border-radius: 0.3125rem !important;
`;

const MarginTopBox = styled(Box)`
  margin: 0.9375rem;
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

const TabMenu = ({ menuButton, components, handleAPI }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleAPI(newValue);
  };

  return (
    <>
      <FlexBox elevation={12}>
        <Tabs value={value} onChange={handleChange} indicatorColor="#fff">
          {menuButton.map((item, index) => (
            <StyledTab
              key={index}
              label={item.label}
              {...a11yProps(index)}
              disabled={item.isDisabled}
              $selected={value === index}
              $width={item.width}
            />
          ))}
        </Tabs>
      </FlexBox>
      <MarginTopBox>
        {components.map((component, index) => (
          <TabPanel key={index} value={value} index={index}>
            {component}
          </TabPanel>
        ))}
      </MarginTopBox>
    </>
  );
};

export default TabMenu;
