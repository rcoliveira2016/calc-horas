export default function (hoursOrMinutes: string): number {
    let [horas, minutos] = hoursOrMinutes.split(":").map(Number);
    let horasDecimais = horas + minutos / 60;

    return Math.round(horasDecimais * 100) / 100;;
}
