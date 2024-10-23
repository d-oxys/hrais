export function formatCurrency(number: string | number, locale = "en-US") {
  return number.toLocaleString(locale);
}
