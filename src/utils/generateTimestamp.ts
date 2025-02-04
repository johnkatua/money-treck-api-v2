export const generateTimestamp = () => {
  const date = new Date();
  let year = date.getFullYear(),
    month = String(date.getMonth() + 1).padStart(2, "0"),
    day = String(date.getDate()).padStart(2, "0"),
    hours = String(date.getHours()).padStart(2, "0"),
    minutes = String(date.getMinutes() + 1).padStart(2, "0"),
    seconds = String(date.getSeconds() + 1).padStart(2, "0")

  return `${year}${month}${day}${hours}${minutes}${seconds}`
} 