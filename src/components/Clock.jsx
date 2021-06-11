import React, { useEffect, useState } from "react";
import { formatDate } from "../utility/date";
import "./Clock.css";

const Clock = () => {
  const [lightTheme, setLightTheme] = useState(true);
  const [battery, setBattery] = useState(0);
  const [network, setNetwork] = useState("");
  const [period, setPeriod] = useState("am");
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const classes = {
    seconds: {
      transform: `rotate(${time.seconds * 6}deg)`,
    },
    minutes: {
      transform: `rotate(${time.minutes * 6}deg)`,
    },
    hours: {
      transform: `rotate(${time.hours * 30 + time.minutes / 2}deg)`,
    },
  };

  const setBatteryPercentage = () => {
    navigator.getBattery().then((b) => {
      const batteryLevel = b.level * 100;
      batteryLevel === battery || setBattery(Math.round(batteryLevel));
    });
  };

  const setClock = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const meridiem = hours > 24 ? "am" : "pm";
    setTime({ hours, minutes, seconds });
    setPeriod(meridiem);
  };

  const changeTheme = () => {
    setLightTheme((prev) => !prev);
  };

  const setNetworkConnection = () => {
    const connectionType = navigator.connection.effectiveType;
    network === connectionType || setNetwork(connectionType);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setClock();
      setBatteryPercentage();
      setNetworkConnection();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <div className={`mainBox ${lightTheme ? "light" : "dark"}`}>
        <div className="notification-bar">
          <div className="network">
            <span className="connection-type">{network}</span>
            <i class="fas fa-signal"></i>
          </div>
          <div className="battery">
            <span className="percentage">{battery}%</span>
            <i className="fa fa-battery-half"></i>
          </div>
        </div>
        <div className="clockBox">
          <div className="hr" style={classes.hours}></div>
          <div className="min" style={classes.minutes}></div>
          <div className="sec" style={classes.seconds}></div>
          <div className="med">{period}</div>
        </div>
        <div className="info">
          <div className="temp">
            <span className="degree">22&#xb0;</span>
            <i className="fa fa-certificate"></i>
          </div>
          <div className="basic">
            <span className="city">New Delhi</span>
            <span className="date">{formatDate(new Date())}</span>
          </div>
          <button className="mode" onClick={changeTheme}>
            Change Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clock;
