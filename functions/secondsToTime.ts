export default function getTimeFromSeconds(timeInSeconds: number, sportID: string) {

    var hours = 0
    var minutes = 0
    var seconds = 0

    switch (sportID) {
        case "FOOT":
            minutes = Math.trunc(timeInSeconds / 60)
            timeInSeconds -= minutes * 60
            seconds = timeInSeconds
            return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        default:
            minutes = Math.trunc(timeInSeconds / 60)
            timeInSeconds -= minutes * 60
            seconds = timeInSeconds
            hours = Math.trunc(minutes / 60)
            minutes -= hours * 60

            return hours > 0 ?
                `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` :
                `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    }
}