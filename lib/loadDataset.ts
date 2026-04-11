import { Product } from "@/types/product.types"
export async function loadDataset(): Promise<Product[]> {
  const res = await fetch("/data/skincare.json")

  if (!res.ok) {
    throw new Error("Failed to load dataset")
  }

  return res.json()
}