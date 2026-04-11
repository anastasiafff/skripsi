import fs from "fs"

const dataset = JSON.parse(
  fs.readFileSync("./data/skincare.json", "utf8")
)

/* =========================
   COLLECT SKIN TYPES
========================= */

const skinSet = new Set<string>()

dataset.forEach((p: any) => {
  if (!p.skin) return

  Object.keys(p.skin).forEach((skinType) => {
    skinSet.add(skinType)
  })
})

const skinList = [...skinSet].sort()

/* =========================
   SAVE FILE
========================= */

fs.writeFileSync(
  "./data/skin_list.json",
  JSON.stringify(skinList, null, 2)
)

console.log("Skin list generated")