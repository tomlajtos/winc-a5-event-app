export const getData = async (endpoint) => {
  const baseUrl = "http://localhost:3003";
  const events = await fetch(`${baseUrl}/${endpoint}`);

  return {
    events: await events.json(),
  };
};

export const formatDateAndTime = (dateStr) => {
  const date = new Date(dateStr);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
    // timeZoneName: "shortOffset",
  };

  const fullDate = date.toLocaleDateString("en-GB", dateOptions);
  const fullTime = date.toLocaleTimeString("en-GB", timeOptions);

  return { date: fullDate, time: fullTime };
};
