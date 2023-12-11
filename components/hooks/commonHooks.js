// commonHooks.js

import { useState, useEffect } from "react";

export const useDateTime = () => {
  const [dateString, setDateString] = useState("");
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const currentTimestamp = new Date();

      const optionsDate = { year: "numeric", month: "long", day: "numeric" };
      const formattedDateString = currentTimestamp.toLocaleDateString(
        "en-US",
        optionsDate
      );

      const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
      const formattedTimeString = currentTimestamp.toLocaleTimeString(
        "en-US",
        optionsTime
      );

      setDateString(formattedDateString);
      setTimeString(formattedTimeString);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return { dateString, timeString };
};
