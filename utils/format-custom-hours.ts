import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

export default function (hours: number, format: string): string {
    if (!format) return "";
    
    dayjs.extend(duration);
    return dayjs.duration(hours, "hours").format(format);
}