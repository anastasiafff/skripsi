type Product = {
  id: number
  category: string
  brand: string
  name: string
  price: number
  rating: number
  skin: {
    combination: boolean
    dry: boolean
    normal: boolean
    oily: boolean
    sensitive: boolean
  }
}

type Weights = {
  price: number
  rating: number
  skin: number
}

export function runTopsis(
  products: Product[],
  weights: Weights,
  skinType: string
) {

  /* ======================
     STEP 1: MATRIX
  ====================== */

  const matrix = products.map((p) => {

    const skinScore = p.skin?.[skinType as keyof typeof p.skin] ? 1 : 0

    return {
      product: p,
      price: p.price,
      rating: p.rating,
      skin: skinScore
    }
  })

  /* ======================
     STEP 2: NORMALIZATION
  ====================== */

  const sqrtPrice = Math.sqrt(matrix.reduce((s, v) => s + v.price ** 2, 0))
  const sqrtRating = Math.sqrt(matrix.reduce((s, v) => s + v.rating ** 2, 0))
  const sqrtSkin = Math.sqrt(matrix.reduce((s, v) => s + v.skin ** 2, 0))

  const normalized = matrix.map((m) => ({
    product: m.product,
    price: m.price / sqrtPrice,
    rating: m.rating / sqrtRating,
    skin: sqrtSkin === 0 ? 0 : m.skin / sqrtSkin
  }))

  /* ======================
     STEP 3: WEIGHTED
  ====================== */

  const weighted = normalized.map((n) => ({
    product: n.product,
    price: n.price * weights.price,
    rating: n.rating * weights.rating,
    skin: n.skin * weights.skin
  }))

  /* ======================
     STEP 4: IDEAL
  ====================== */

  const idealBest = {
    price: Math.min(...weighted.map(v => v.price)), // cost
    rating: Math.max(...weighted.map(v => v.rating)),
    skin: Math.max(...weighted.map(v => v.skin))
  }

  const idealWorst = {
    price: Math.max(...weighted.map(v => v.price)),
    rating: Math.min(...weighted.map(v => v.rating)),
    skin: Math.min(...weighted.map(v => v.skin))
  }

  /* ======================
     STEP 5: DISTANCE
  ====================== */

  const scored = weighted.map((w) => {

    const dPlus = Math.sqrt(
      (w.price - idealBest.price) ** 2 +
      (w.rating - idealBest.rating) ** 2 +
      (w.skin - idealBest.skin) ** 2
    )

    const dMinus = Math.sqrt(
      (w.price - idealWorst.price) ** 2 +
      (w.rating - idealWorst.rating) ** 2 +
      (w.skin - idealWorst.skin) ** 2
    )

    const score = dMinus / (dPlus + dMinus)

    return {
      ...w.product,
      topsisScore: score
    }
  })

  /* ======================
     STEP 6: SORT
  ====================== */

  return scored.sort((a, b) => b.topsisScore - a.topsisScore)
}
