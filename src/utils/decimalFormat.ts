export default function decimalFormat(number: number) {
    const result = Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).formatToParts(number)

    const fraction = result.find(x => x.type == "fraction");

    return +(Math.floor(number) + "." + fraction.value.substring(0, 2))

}