export function formatDateInNew(inputDate) {
  // Convert the input date to a Date object
  const dateObject = new Date(inputDate);

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract the month, day, and year from the Date object
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  // Format the date in the desired format
  return `${month} ${day}, ${year}`;
}

export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};
