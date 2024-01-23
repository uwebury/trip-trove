export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const formatDateForInput = (isoDateString) => {
  if (!isoDateString) return "";

  // Create a Date object from the ISO string
  const date = new Date(isoDateString);

  // Adjust for timezone offset to ensure the correct date is used
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() - userTimezoneOffset);

  // Format the date as "YYYY-MM-DD"
  return adjustedDate.toISOString().split("T")[0];
};
