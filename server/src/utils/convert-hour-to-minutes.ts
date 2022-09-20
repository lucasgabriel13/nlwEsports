export function convertHourToMinute(hourString: string){
  const [hours, minutes] = hourString.split(':').map(Number);
  const minutesAMount = hours * 60 + minutes;

  return minutesAMount;
}