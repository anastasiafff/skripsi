import { ProductDetail } from "./components/productDetail";

export default async function Product({
    params,
}: {
    params: Promise<{ slug: number }>
}) {
    const { slug } = await params
    return (
        <ProductDetail
            slug={slug}
        />
    )
}
