export default function formatPrice(
  value: number,
  locale: string = "uz-UZ",
  currency: string = "UZS"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
}
