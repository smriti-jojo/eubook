import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const UserRoute = () => {
  const isAuth = useSelector((state) => state.auth.user);
  const location = useLocation();

  // console.log(isAuth);
  return (
    <>
      {isAuth ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default UserRoute;
