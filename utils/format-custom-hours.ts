export default function (decimalHours: number, format: string): string {
  if (!format || !decimalHours) return ''

  const totalHours = Math.floor(decimalHours)
  const totalMinutes = Math.round((decimalHours - totalHours) * 60)
  const totalDays = Math.floor(decimalHours / 24)
  const totalWeeks = Math.floor(totalDays / 7)

  const days = (totalDays % 30).toString().padStart(2, '0')

  const weeks = totalWeeks.toString().padStart(2, '0')
  const hours = totalHours.toString().padStart(2, '0')
  const minutes = Math.floor(totalMinutes % 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor((decimalHours * 3600) % 60)
    .toString()
    .padStart(2, '0')

  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
    totalDays % 7
  ]
  const dayOfWeekFull = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][totalDays % 7]
  console.log(hours, minutes)
  return format.replace(
    /\[([^\]]+)\]|DD|HH|H|mm|m|SS|DDD|DDDD|WW/g,
    (match, escapedText) => {
      if (escapedText) return escapedText // Retorna o texto entre colchetes sem modificar

      switch (match) {
        case 'DD':
          return days
        case 'WW':
          return weeks
        case 'HH':
          return hours
        case 'H':
          return parseInt(hours).toString()
        case 'mm':
          return minutes
        case 'm':
          return parseInt(minutes).toString()
        case 'SS':
          return seconds
        case 'DDD':
          return dayOfWeek
        case 'DDDD':
          return dayOfWeekFull
        default:
          return match
      }
    },
  )
}
