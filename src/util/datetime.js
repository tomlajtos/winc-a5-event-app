// TODO: add jsDOC comments
//
// function to format date-time unti strings from single digit to double digit (i.e. 1 to 01)
const addZeroToDT = (unit) => (unit < 10 ? `0${unit}` : unit);

// TODO: add jsDOC comments
export const formatDateAndTime = (dateStr) => {
  const date = new Date(dateStr);
  const longDateOpt = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const shortDateOpt = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const numericDateOpt = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const timeOpt = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
    // timeZoneName: "shortOffset",
  };

  const numericDate = date.toLocaleDateString("en-GB", numericDateOpt);
  const shortDate = date.toLocaleString("en-GB", shortDateOpt);
  const longDate = date.toLocaleDateString("en-GB", longDateOpt);
  const time = date.toLocaleTimeString("en-GB", timeOpt);

  return {
    numericDate: numericDate,
    longDate: longDate,
    date: shortDate,
    time: time,
  };
};

// TODO: add jsDOC comments
//
// function to generate date-time str compatible with <input type=datetime-local>
// str to be used as default value for input element
export const generateDateTimeStr = (dateStr, dur) => {
  const xtraHr = (dur?.h ?? 0) * (60 * 60 * 1000);
  const xtraMin = (dur?.m ?? 0) * (60 * 1000);
  const timeStamp = new Date(dateStr).getTime() + xtraHr + xtraMin;

  const year = new Date(timeStamp).getFullYear();
  const month = new Date(timeStamp).getMonth() + 1;
  let day = new Date(timeStamp).getDate();
  let hour = new Date(timeStamp).getHours();
  let minute = new Date(timeStamp).getMinutes();

  return `${year}-${addZeroToDT(month)}-${addZeroToDT(day)}T${addZeroToDT(
    hour,
  )}:${addZeroToDT(minute)}`;
};
