export default function (decimalTime: number, options?: { showNegative?: boolean }): string {
  const { hours, minutes} = decimalToHoursMinutos(decimalTime);
  const hoursFormat = Math.abs(hours).toString().padStart(2, "0");
  const minutesFormat = Math.abs(minutes).toString().padStart(2, "0");
  const negative = options?.showNegative && hours < 0 ? "-" : "";
  return negative + hoursFormat + ":" + minutesFormat;
}
