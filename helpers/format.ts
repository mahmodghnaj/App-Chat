const fulldays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (someDateTimeStamp: any) => {
  var dt = new Date(someDateTimeStamp),
    date = dt.getDate(),
    month = months[dt.getMonth()],
    timeDiff = someDateTimeStamp - Date.now(),
    diffDays = new Date().getDate() - date,
    diffMonths = new Date().getMonth() - dt.getMonth(),
    diffYears = new Date().getFullYear() - dt.getFullYear();

  if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
    return "Today";
  } else if (diffYears === 0 && diffDays === 1) {
    return "Yesterday";
  } else if (diffYears === 0 && diffDays === -1) {
    return "Tomorrow";
  } else if (diffYears === 0 && diffDays < -1 && diffDays > -7) {
    return fulldays[dt.getDay()];
  } else if (diffYears >= 1) {
    return (
      month + " " + date + ", " + new Date(someDateTimeStamp).getFullYear()
    );
  } else {
    return month + " " + date;
  }
};
export const formatAMPM = (d: any) => {
  const date = new Date(d);
  let hours: any = date.getHours();
  let minutes: any = date.getMinutes();
  let ampm: any = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
