export const formatUnixToHour = (unix) => {
  const date = new Date(unix * 1000); // convert seconds → ms
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};
