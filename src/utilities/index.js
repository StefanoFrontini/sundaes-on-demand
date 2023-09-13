/**
 * @function formatCurrency
 * @param {number} currency
 * @returns {string}
 *
 * @example
 *   formatCurrency(0)
 *   // => $0.00
 */

export function formatCurrency(currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
}
