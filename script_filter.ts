import fs from "fs"

const dataset = JSON.parse(
  fs.readFileSync("./data/skincare.json", "utf8")
)

/* =========================
   CATEGORY LIST
========================= */

const categoryList = [
  ...new Set(
    dataset
      .map((p: any) => p.category?.trim())
      .filter(Boolean)
  )
].sort()

/* =========================
   BRAND LIST
========================= */

const brandList = [
  ...new Set(
    dataset
      .map((p: any) => p.brand?.trim())
      .filter(Boolean)
  )
].sort()

/* =========================
   SAVE FILES
========================= */

fs.writeFileSync(
  "./data/category_list.json",
  JSON.stringify(categoryList, null, 2)
)

fs.writeFileSync(
  "./data/brand_list.json",
  JSON.stringify(brandList, null, 2)
)

console.log("Category list generated")
console.log("Brand list generated")
