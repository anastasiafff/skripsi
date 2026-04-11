import { Product } from "@/types/product.types"

export function cleanDataset(rows: any[]): Product[] {
  return rows
    .filter((r) => r.name && r.price && r.rank)
    .map((r) => ({
      category: r.Label?.trim(),
      brand: r.brand?.trim(),
      name: r.name?.trim(),

      price: Number(r.price) || 0,
      rating: Number(r.rank) || 0,

      ingredients: r.ingredients
        ? r.ingredients.split(",").map((i: string) => i.trim())
        : [],

      skin: {
        combination: r.Combination === "1",
        dry: r.Dry === "1",
        normal: r.Normal === "1",
        oily: r.Oily === "1",
        sensitive: r.Sensitive === "1",
      },
    }))
}