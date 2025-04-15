export default function (
  decimalTime: number,
  options?: { showNegative?: boolean; hideZero?: boolean },
): string {
  if (options?.hideZero && decimalTime === 0) {
    return ''
  }
  const { hours, minutes } = decimalToHoursMinutos(
    options?.showNegative ? decimalTime : Math.abs(decimalTime),
  )

  const hoursFormat = Math.abs(hours).toString().padStart(2, '0')
  const minutesFormat = Math.abs(minutes).toString().padStart(2, '0')
  const negative = options?.showNegative && hours < 0 ? '-' : ''
  return negative + hoursFormat + ':' + minutesFormat
}
