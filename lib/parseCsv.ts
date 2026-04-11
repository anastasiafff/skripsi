import Papa from "papaparse"

export type SkincareProduct = {
  Label: string
  brand: string
  name: string
  price: string
  rank: string
  ingredients: string
}

export async function loadCSV(): Promise<SkincareProduct[]> {
  const res = await fetch("/data/skincare.csv")
  const text = await res.text()

  return new Promise((resolve) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data as SkincareProduct[])
      }
    })
  })
}