"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatPriceIDR } from "@/helpers/currency/currencyFormat"
import { IconStar } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

type params = {
    pageParam?: number
    id: number
}

async function fetchProducts({
    pageParam = 1,
    id = 0,
}: params) {
    const res = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            page: pageParam,
            limit: 1,
            id,
        }),
    })

    if (!res.ok) {
        throw new Error("Failed fetch products")
    }

    return res.json()
}

const images = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
]

export const ProductDetail = ({
    slug,
}: {
    slug: number
}) => {
    const [selectedImage, setSelectedImage] = useState(images[0])

    const { data, isLoading } = useQuery({
        queryKey: ["product_detail", slug],
        queryFn: () =>
            fetchProducts({
                id: slug,
            }),
    })

    const product = data?.items?.[0]

    

    const renderStars = (rating: number) => {
        const fullStars = Math.round(rating)

        return [...Array(5)].map((_, i) => (
            <IconStar
                key={i}
                size={16}
                className={
                    i < fullStars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }
            />
        ))
    }

    const getSkinTypes = () => {
        if (!product?.skin) return []

        return Object.entries(product.skin)
            .filter(([_, value]) => value)
            .map(([key]) => key)
    }

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-10 text-center">
                Loading product...
            </div>
        )
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto p-10 text-center">
                Product not found
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">

            {/* Breadcrumb */}
            <div className="text-sm text-muted-foreground">
                Home / Produk / {product.category} / {product.name}
            </div>

            {/* Product Card */}
            <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-8">

                    {/* LEFT IMAGE */}
                    <div className="space-y-4">

                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                                src={selectedImage}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(img)}
                                    className={`border rounded-md overflow-hidden w-20 h-20 ${selectedImage === img ? "ring-2 ring-primary" : ""
                                        }`}
                                >
                                    <img src={img} className="object-cover w-full h-full" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT INFO */}
                    <div className="space-y-4">

                        <Badge variant="secondary">{product.category}</Badge>

                        <div>
                            <p className="text-xs text-muted-foreground uppercase">
                                {product.brand}
                            </p>

                            <h1 className="text-2xl font-semibold">
                                {product.name}
                            </h1>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex">
                                {renderStars(product.rating)}
                            </div>

                            <span className="text-muted-foreground">
                                {product.rating} rating
                            </span>
                        </div>

                        <Separator />

                        {/* Price */}
                        <div className="text-2xl font-bold">
                            {formatPriceIDR(product.price)}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground">
                            Produk skincare premium yang membantu merawat kesehatan kulit,
                            memberikan hidrasi optimal, dan membantu memperbaiki skin barrier
                            dengan formula berkualitas tinggi.
                        </p>

                        <Separator />

                        {/* Product Info */}
                        <div className="text-sm space-y-2">

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Kategori</span>
                                <span>{product.category}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Brand</span>
                                <span>{product.brand}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Ingredients</span>
                                <span>{product.ingredients.length}</span>
                            </div>

                            <div className="flex justify-between items-start">
                                <span className="text-muted-foreground">Cocok Untuk</span>

                                <div className="flex flex-wrap gap-1 justify-end">
                                    {getSkinTypes().map((skin) => (
                                        <Badge key={skin} variant="outline">
                                            {skin}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Stok</span>
                                <span className="text-green-600 font-medium">
                                    Tersedia
                                </span>
                            </div>
                        </div>

                        <Button className="w-full mt-4">
                            Tulis Review
                        </Button>

                    </div>
                </div>
            </Card>

            {/* Tabs */}
            <Card className="p-6">

                <Tabs defaultValue="deskripsi">

                    <TabsList>
                        <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
                        <TabsTrigger value="ingredients">
                            Ingredients ({product.ingredients.length})
                        </TabsTrigger>
                        <TabsTrigger value="review">
                            Review
                        </TabsTrigger>
                    </TabsList>

                    {/* DESKRIPSI */}
                    <TabsContent value="deskripsi" className="space-y-4 mt-6">

                        <h3 className="font-semibold">Tentang Produk</h3>

                        <p className="text-sm text-muted-foreground">
                            Produk skincare berkualitas tinggi yang diformulasikan untuk
                            memberikan perawatan optimal bagi kulit. Dengan kandungan bahan
                            aktif yang dipilih secara khusus untuk membantu menjaga
                            kelembapan, meningkatkan elastisitas, dan memperkuat skin
                            barrier.
                        </p>

                    </TabsContent>

                    {/* INGREDIENTS */}
                    <TabsContent
                        value="ingredients"
                        className="mt-6 text-sm text-muted-foreground"
                    >

                        <ul className="grid md:grid-cols-2 gap-2">
                            {product.ingredients.map((ing: string, i: number) => (
                                <li key={i} className="list-disc ml-4">
                                    {ing.trim()}
                                </li>
                            ))}
                        </ul>

                    </TabsContent>

                    {/* REVIEW */}
                    <TabsContent
                        value="review"
                        className="mt-6 text-sm text-muted-foreground"
                    >
                        Belum ada review untuk produk ini.
                    </TabsContent>

                </Tabs>

            </Card>
        </div>
    )
}
