import rawDataset from "@/data/skincare.json";
import weights from "@/data/topsis_weights.json";
import { runTopsis } from "@/helpers/topsis/topsis";
import { NextResponse } from "next/server";

const dataset = JSON.parse(JSON.stringify(rawDataset));

export async function POST(req: Request) {
  const body = await req.json();
  const { category, skin, price, rating, limit = 10 } = body;

  let data = [...dataset];

  /* CATEGORY FILTER */
  if (category) data = data.filter((p) => p.category === category);

  /* PRICE RANGE */
  if (price) {
    const [min, max] = price.split("-");
    if (max) {
      data = data.filter((p) => p.price >= Number(min) && p.price <= Number(max));
    } else {
      data = data.filter((p) => p.price >= Number(min.replace("+", "")));
    }
  }

  /* MIN RATING */
  if (rating) data = data.filter((p) => p.rating >= Number(rating));

  /* RUN TOPSIS */
  const ranked = runTopsis(data, weights as any, skin);

  // FLAG BEST RESULT
  const items = ranked.slice(0, limit).map((p, i) => ({
    ...p,
    isTopResult: i === 0, // item pertama/top skor
  }));

  return NextResponse.json({
    total: ranked.length,
    items,
  });
}
