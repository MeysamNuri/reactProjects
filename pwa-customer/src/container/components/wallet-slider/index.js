import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import "./wallet-slider.less";
import {
  getSliderStartDate,
  getSliderEndDate,
  setPageNumber,
} from "../../pages/wallet/action";
import { useDispatch, useSelector } from "react-redux";
import { setLoadMore } from "../../actions/MainActions";
import moment from "moment";
import momentj from "moment-jalaali";

const useStyles = makeStyles({
  root: {
    width: "80%",
  },
});

const daysName = [
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
  "یکشنبه",
];

function calculateDaysBetweenTwoDate(start, end) {
  if (start && end) {
    let a = moment(end);
    let b = moment(start);
    return a.diff(b, "days");
  }
  return 0;
}

function addDaysToDate(days, date) {
  if (days > 0 && date) {
    return moment(date).add(days, "d").format();
  }
  return date;
}
function dateInJalaali(date) {
  const dayOfWeek = daysName[moment(date).isoWeekday() - 1];
  return dayOfWeek + " " + momentj(date).format("jYYYY/jMM/jDD");
}
function convertToDate(time) {
  if (time) {
    return moment(time).format("YYYY-MM-DD");
  }
  return "";
}

function WalletSlider({ startDate, setLoading }) {
  const d = new Date();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 0]);

  // ============= change slider function =======================

  const valuetext = (value) => {
    return `${value}`;
  };

  // ============= start date in jalali =======================
  const startDateFormated = moment(startDate, "YYYY-MM-DD");

  // ============= now date in jalali =======================
  const nowDate = moment(d, "YYYY-MM-DD");

  // ============= days between start date and now date =======================
  const calculateDaysBetweenTwoDate = (start, end) => {
    if (start && end) {
      let a = moment(end);
      let b = moment(start);
      return a.diff(b, "days");
    }
    return 0;
  };

  const daysBetween = calculateDaysBetweenTwoDate(startDateFormated, nowDate);

  useEffect(() => {
    setValue([0, daysBetween]);
  }, [daysBetween]);

  const start_date = addDaysToDate(daysBetween - value[1], startDateFormated);
  const end_date = addDaysToDate(daysBetween - value[0], startDateFormated);

  useEffect(() => {
    dispatch(getSliderStartDate(convertToDate(start_date)));
    dispatch(getSliderEndDate(convertToDate(end_date)));
    if(start_date !== end_date){
      setLoading(true)
    }
  }, [start_date, end_date]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setLoadMore(false));
    dispatch(setPageNumber(1));
  };

  return (
    <div className={classes.root}>
      <div className="slider-title">
        <div>
          <p>از</p>
          <span>{startDate !== null ? dateInJalaali(start_date) : ""}</span>
        </div>
        <div>
          <p>تا </p>
          <span>{startDate !== null ? dateInJalaali(end_date) : ""}</span>
        </div>
      </div>

      <Slider
        value={value}
        onChange={handleChange}
        min={0}
        max={daysBetween}
      />
    </div>
  );
}

export default WalletSlider;
