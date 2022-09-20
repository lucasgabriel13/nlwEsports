export function covertMinutesToHourString(minutesAMount: number) {
  const hour = String(Math.floor(minutesAMount / 60)).padStart(2,'0');
  const minutes = String(minutesAMount % 60).padStart(2,'0');

  return `${hour}:${minutes}`;
}