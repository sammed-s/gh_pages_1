import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { DrillBitLogo } from "../../assets";
import AppNav from "../../pages/appBar/AppNav";

const StyledAppBar = styled(AppBar)`
  background-color: #ffffff;
`;

const StyledToolbar = styled(Toolbar)`
  padding: 0 1rem !important;
`;

const StyledDivider = styled(Divider)`
  margin-right: 0.7rem !important;
`;

const Line = styled.div`
  height: 0.104rem !important;
  background: linear-gradient(to right, #d4f1f4, #014dfb, #014dfb, #d4f1f4);
  width: 100%;
`;

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar variant="dense">
          <Box flexGrow={1} display="flex" alignItems="center">
            <DrillBitLogo />
          </Box>
          <Box display={{ xs: "none", md: "flex" }}>
            <StyledDivider orientation="vertical" flexItem />
            <AppNav />
          </Box>
          <Box display={{ xs: "flex", md: "none" }}>
            <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
        <Line />
      </StyledAppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <AppNav mb={true} />
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
