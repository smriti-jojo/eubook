import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerValue({ handledateprops }) {
  const [value, setValue] = React.useState(dayjs(""));

  const handledate = (newValue) => {
    setValue(`${newValue.$y}/${newValue.$M + 1}/${newValue.$D}`);
    let date = `${newValue.$y}/${newValue.$M + 1}/${newValue.$D}`;
    handledateprops(date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          disablePast={true}
          label=""
          // value={value}
          onChange={(newValue) => handledate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
