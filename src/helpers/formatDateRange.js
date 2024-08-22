export function formatDateRange(dateRange) {
  // Split the input string by ' - ' to get the start and end dates
  const [firstDateStr, secondDateStr] = dateRange.split(" - ");

  // Parse the dates from the strings
  const firstDate = new Date(firstDateStr);
  const secondDate = new Date(secondDateStr);

  const optionsSameYear = { month: "long", day: "numeric" };
  const optionsDifferentYear = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  // Format the first date according to whether the years are the same or different
  const firstDateFormatted = firstDate.toLocaleDateString(
    undefined,
    firstDate.getFullYear() === secondDate.getFullYear()
      ? optionsSameYear
      : optionsDifferentYear
  );

  // Always format the second date with the full year
  const secondDateFormatted = secondDate.toLocaleDateString(
    undefined,
    optionsDifferentYear
  );

  if (firstDate.getFullYear() === secondDate.getFullYear()) {
    return `${firstDateFormatted} - ${secondDateFormatted}`;
  } else {
    return `${firstDateFormatted} ${firstDate.getFullYear()} - ${secondDateFormatted}`;
  }
}
