import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

export default function (hours: number, format: string): string {
    if (!format || !hours) return "";
    
    dayjs.extend(duration);
    const dirationDays = dayjs.duration(hours, "hours");
    
    return dirationDays.format(format);
}