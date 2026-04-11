export type Product = {
  id: number
  category: string
  brand: string
  name: string
  price: number
  rating: number
  ingredients: string[]
  skin: {
    combination: boolean
    dry: boolean
    normal: boolean
    oily: boolean
    sensitive: boolean
  }
}
