import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const VerticalTabs = (props) => {
  const theme = useTheme();

  const [value, setValue] = useState(0);

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  console.log("Vertical data", props.datas);

  console.log(props.dat);
  return (
    <>
      <div>
        <Box sx={{ width: "100%" }}>
          <Tabs
            orientation={`${isMatch ? "horizontal" : "vertical"}`}
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            indicatorColor="none"
          >
            {props.datas.map((e, index) => {
              return (
                <LinkTab
                  onClick={() => {
                    console.log("props", e);
                    props.changeSem(e);
                  }}
                  className={`${
                    value === index
                      ? "!bg-[#ff3c3c] !opacity-90 !rounded-md !shadow-md !shadow-[grey] !outline-none "
                      : "!text-blue-700 "
                  } !text-white  !font-medium`}
                  value={index}
                  label={e}
                />
              );
            })}
          </Tabs>
        </Box>
      </div>
    </>
  );
};

export default VerticalTabs;
