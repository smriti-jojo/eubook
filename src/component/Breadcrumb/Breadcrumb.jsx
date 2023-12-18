import React from "react";
import { Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumb = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color=" blue">
      DashBoard
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="grey"
      href="/material-ui/getting-started/installation/"
    ></Link>,
  ];
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
