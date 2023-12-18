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
import LogoutIcon from "@mui/icons-material/Logout";
import DrawerComponent from "../DrawerComponent/AdminDrawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { authActions } from "../../store/auth";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export default function AdminNavbar() {
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const dispatch = useDispatch();

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
    Cookies.remove("user");
    Cookies.remove("admin");
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="!bg-[#A9A9A9]">
        <Toolbar>
          <div className="py-4">
            <img src={eupheus_logo} className="mr-2 w-[150px]" alt="logo" />
          </div>
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
                    to="/admin/dashboard"
                    end
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
                    to="/admin/users"
                  >
                    <Button className="!text-white  !text-lg !px-8   !py-3 !rounded-[30px]">
                      Users
                    </Button>
                  </NavLink>
                  <NavLink
                    key={3}
                    className={({ isActive }) =>
                      isActive
                        ? "activeNav !rounded-[30px]"
                        : "!rounded-[30px] inactive"
                    }
                    to="/admin/all_books"
                  >
                    <Button className="!text-white  !text-lg !px-8   !py-3 !rounded-[30px]">
                      Books
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
