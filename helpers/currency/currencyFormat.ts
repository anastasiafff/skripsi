export function formatPriceIDR(price: number): string {
  if (!price && price !== 0) return "Rp 0"

  const value = price * 1000

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value)
}