export const marketsOddSizes = {
    "MR12": "grow",
    "HCTG": "grow",
    "MRES": "grow"
}

export default function OddSquareSize(type: string) {
    return marketsOddSizes[type] ? marketsOddSizes[type] : "grow"
}