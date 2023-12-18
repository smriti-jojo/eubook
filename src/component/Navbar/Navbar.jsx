import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import eupheus_logo from "../../assets/eupheus_logo.png";
import { Tab, Tabs } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import PasswordIcon from "@mui/icons-material/Password";
import LogoutIcon from "@mui/icons-material/Logout";
import DrawerComponent from "../DrawerComponent/UserDrawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Navbar() {
  const [value, setValue] = React.useState();
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  let { id } = useParams();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("id");
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("admin");
    Cookies.remove("user");

    dispatch(authActions.logout());
    navigate("/");
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Person2Icon />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <PasswordIcon />
        </IconButton>
        <p>Password Change</p>
      </MenuItem> */}
      <MenuItem onClick={logout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="fixed" className="!bg-[#A9A9A9]">
        <Toolbar
          className=" py-3 "
          sx={{ marginLeft: "8vw", marginRight: "8vw" }}
        >
          <img
            className="w-[220px]  rounded-sm"
            alt="logo"
            src="https://skool.ai/bucket/assets/images/logo/eupheus.png"
          />

          {isMatch ? (
            <DrawerComponent />
          ) : (
            <>
              <div className="flex justify-between w-full">
                <div className=" flex gap-[2rem] mx-[2rem] ">
                  <NavLink
                    key={1}
                    className={({ isActive }) =>
                      isActive
                        ? "activeNav !rounded-[30px]"
                        : "!rounded-[30px] inactive"
                    }
                    to="/home"
                  >
                    <Button className="!text-white   !text-lg !px-8   !py-3   ">
                      Home
                    </Button>
                  </NavLink>
                  <NavLink
                    key={2}
                    className={({ isActive }) =>
                      isActive
                        ? "activeNav !rounded-[30px]"
                        : "!rounded-[30px] inactive"
                    }
                    to="/all_books"
                  >
                    <Button className="!text-white  !text-lg !px-8   !py-3 !rounded-[30px]">
                      Library
                    </Button>
                  </NavLink>
                </div>
              </div>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
