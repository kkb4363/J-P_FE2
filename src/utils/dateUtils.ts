export function formatDateToString(
  date: Date | string,
  schedule: boolean = false
): string {
  let dateObj: Date;

  if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  const year = schedule
    ? dateObj.getFullYear()
    : String(dateObj.getFullYear()).slice(2);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(1, "0");

  if (schedule) {
    return `${year}-${month}-${day}`;
  } else {
    return `${year}.${Number(month)}.${Number(day)}`;
  }
}
