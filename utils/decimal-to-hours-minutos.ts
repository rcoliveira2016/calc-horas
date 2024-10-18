export default function (decimal: number): {hours: number, minutes: number} {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);

  return {
    hours, minutes
  }
}
