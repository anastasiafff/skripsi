import rawDataset from "@/data/skincare.json"
import { NextResponse } from "next/server"

const dataset = JSON.parse(JSON.stringify(rawDataset))

export async function POST(req: Request) {

  const body = await req.json()

  const {
    id,
    page = 1,
    limit = 12,
    keyword = "",
    category,
    brand,
    minPrice,
    maxPrice,
    minRating,
    sort
  } = body

  let data = [...dataset]

  /* =========================
   FILTER BY ID
========================= */

if (id) {
  data = data.filter((p: any) => p.id === Number(id))
}
  /* =========================
     SEARCH
  ========================= */

  
  if (keyword) {
    const q = keyword.toLowerCase()

    data = data.filter((p: any) =>
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q)
    )
  }

  /* =========================
     CATEGORY
  ========================= */

  if (category) {
    data = data.filter((p: any) => p.category === category)
  }

  /* =========================
     BRAND
  ========================= */

  if (brand) {
    data = data.filter((p: any) => p.brand === brand)
  }

  /* =========================
     PRICE RANGE
  ========================= */

  if (minPrice !== undefined) {
    data = data.filter((p: any) => p.price >= minPrice)
  }

  if (maxPrice !== undefined) {
    data = data.filter((p: any) => p.price <= maxPrice)
  }

  /* =========================
     RATING
  ========================= */

  if (minRating !== undefined) {
    data = data.filter((p: any) => p.rating >= minRating)
  }

  /* =========================
     SORTING
  ========================= */

  if (sort === "latest") {
    data = data.sort((a: any, b: any) => b.id - a.id)
  }

  if (sort === "price_low") {
    data = data.sort((a: any, b: any) => a.price - b.price)
  }

  if (sort === "price_high") {
    data = data.sort((a: any, b: any) => b.price - a.price)
  }

  if (sort === "rating") {
    data = data.sort((a: any, b: any) => b.rating - a.rating)
  }

  /* =========================
     PAGINATION
  ========================= */

  const total = data.length

  const start = (page - 1) * limit
  const end = start + limit

  const items = data.slice(start, end)

  return NextResponse.json({
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  })
}