import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Menu,
  MenuItem,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { persistor } from "../../store.jsx"
import { adminLinks, branchManagerLinks, userLinks } from "../../components/Navbar/NavlinksConfig";

export const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:550px)");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenus, setOpenMenus] = useState({}); 

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

const handleLogout = () => {
  dispatch(logout());
  persistor.purge();
  navigate("/");
};

  const handleParentClick = (text) => {
    setOpenMenus((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  let navLinks = [];
  if (role === "admin") navLinks = adminLinks;
  else if (role === "branchManager") navLinks = branchManagerLinks;
  else navLinks = userLinks;

  const renderMenuItems = () =>
    navLinks.map(({ text, children }) => (
      <React.Fragment key={text}>
        <ListItem
          button
          onClick={() => handleParentClick(text)}
          sx={{ fontWeight: "bold" }}
        >
          <ListItemText
            primaryTypographyProps={{ fontWeight: "bold" }}
            primary={text}
          />
          {children && (openMenus[text] ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
  
        {children && (
          <Collapse in={openMenus[text]} timeout="auto" unmountOnExit>
            <List sx={{ pl: 4 }}>
              {children.map((child) => (
                <ListItem
                  button
                  key={child.label}
                  onClick={() => {
                    toggleDrawer(false);
                    navigate(child.path);
                  }}
                >
                  <ListItemText primary={child.label} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  
  return (
    <Box sx={{ display: "flex" }}>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
          PaperProps={{ sx: { width: 200 } }}
        >
          <List className={styles.sidebar}>
            <Typography
              variant="h5"
              className={styles.logo}
            >
              <ManageAccountsIcon sx={{fontSize: "35px"}} /> FMS
            </Typography>
            {renderMenuItems()}
          </List>
        </Drawer>
      ) : (
        <Box className={styles.sidebar}>
          <Typography
            variant="h5"
            title="Food Management System"
            className={styles.logo}
          >
            <ManageAccountsIcon sx={{fontSize: "35px"}} /> FMS
          </Typography>
          <List>{renderMenuItems()}</List>
        </Box>
      )}

      <AppBar
        position="fixed"
        className={styles.appbar}
        sx={{
          ml: isMobile ? 0 : 200,
          width: isMobile ? "100%" : "calc(100% - 200px)",
        }}
      >
        <Toolbar className={styles.toolbar}>
          {isMobile && (
            <IconButton
              onClick={() => toggleDrawer(true)}
              className={styles.iconBtn}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box />

          <IconButton onClick={handleUserMenu} className={styles.iconBtn}>
            <AccountCircle style={{ color: "#780606" }} fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
