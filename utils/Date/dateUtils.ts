export function timeIn12Format(date: Date) {
  const currentDate = new Date(date);

  // Get the time string
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  return formattedTime;
}
