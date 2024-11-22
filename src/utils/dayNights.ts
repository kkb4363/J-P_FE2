export const formatDayNights = (start: string, end: string) => {
  const startDay = new Date(start);
  const endDay = new Date(end);

  const nights = Math.floor(
    ((endDay as any) - (startDay as any)) / (1000 * 60 * 60 * 24)
  );
  const days = nights + 1;

  const startString = start.split("-")[1] + "." + start.split("-").pop();
  const endString = end.split("-")[1] + "." + end.split("-").pop();

  return {
    nights,
    days,
    startString,
    endString,
  };
};
