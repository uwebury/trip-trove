import toast from "react-hot-toast";

// Formats date from MongoDB for shorter display on cards:
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

// Formats date so it can be called as defaultValue:
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

// Validates that end date on form is after start date:
export function validateTripDates(tripData) {
  const startDate = new Date(tripData.start);
  const endDate = new Date(tripData.end);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (startDate < today) {
    toast.error("Start date cannot be in the past");
    return false;
  }

  if (endDate < startDate) {
    toast.error("End date cannot be before start date");
    return false;
  }

  return true;
}
