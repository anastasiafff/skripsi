import fs from "fs"
import Papa from "papaparse"

const csv = fs.readFileSync("./data/skincare.csv", "utf8")

const parsed = Papa.parse(csv, {
  header: true,
  skipEmptyLines: true
})

const cleaned = parsed.data.map((r: any, i: number) => ({
  id: i + 1,
  category: r.Label?.trim(),
  brand: r.brand?.trim(),
  name: r.name?.trim(),
  price: Number(r.price),
  rating: Number(r.rank),
  ingredients: r.ingredients?.split(",") ?? [],
  skin: {
    combination: r.Combination === "1",
    dry: r.Dry === "1",
    normal: r.Normal === "1",
    oily: r.Oily === "1",
    sensitive: r.Sensitive === "1",
  }
}))

fs.writeFileSync(
  "./data/skincare.json",
  JSON.stringify(cleaned)
)

console.log("JSON dataset generated")