````tsx
"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import brandList from "@/data/brand_list.json";
import categoryList from "@/data/category_list.json";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { formatPriceIDR } from "@/helpers/currency/currencyFormat";
import { getSkinTypes } from "@/helpers/data/skinTypes";
import { Product } from "@/types/product.types";
import { IconDots, IconSearch, IconStar } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

type FetchProductsParams = {
    pageParam?: number;
    keyword?: string;
    category?: string;
    brand?: string;
    priceRange?: string;
    sort?: string;
};

type ProductsResponse = {
    page: number;
    totalPages: number;
    items: Product[];
};

async function fetchProducts({
    pageParam = 1,
    keyword = "",
    category = "",
    brand = "",
    priceRange = "",
    sort = ""
}: FetchProductsParams): Promise<ProductsResponse> {
    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if (priceRange === "0-100") {
        minPrice = 0;
        maxPrice = 100;
    } else if (priceRange === "100-200") {
        minPrice = 100;
        maxPrice = 200;
    } else if (priceRange === "200+") {
        minPrice = 200;
    }

    const res = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            page: pageParam,
            limit: 12,
            keyword,
            category,
            brand,
            minPrice,
            maxPrice,
            sort
        })
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export default function Home() {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [sort, setSort] = useState("");

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery<ProductsResponse>({
        queryKey: ["products", keyword, category, brand, priceRange, sort],
        queryFn: async ({ pageParam = 1 }) =>
            fetchProducts({
                pageParam,
                keyword,
                category,
                brand,
                priceRange,
                sort
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1;
            }
            return undefined;
        }
    });

    const products = data?.pages?.flatMap((page) => page.items ?? []) ?? [];

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);

    const resetFilters = () => {
        setKeyword("");
        setCategory("");
        setBrand("");
        setPriceRange("");
        setSort("");
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Katalog Produk Skincare</h1>
                <p className="text-sm text-muted-foreground">
                    Temukan produk skincare terbaik
                </p>
            </div>

            <div className="border rounded-lg p-4 bg-muted/20 space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Cari produk skincare..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />

                    <Button>
                        <IconSearch className="w-4 h-4 mr-2" />
                        Cari
                    </Button>
                </div>

                <div className="grid md:grid-cols-4 gap-3">
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Semua Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Kategori</SelectItem>
                            {categoryList?.map((categoryItem) => (
                                <SelectItem key={categoryItem} value={categoryItem}>
                                    {categoryItem}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={brand} onValueChange={setBrand}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Semua Brand" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Brand</SelectItem>
                            {brandList?.map((brandItem) => (
                                <SelectItem key={brandItem} value={brandItem}>
                                    {brandItem}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Range Harga" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Harga</SelectItem>
                            <SelectItem value="0-100">0 - 100K</SelectItem>
                            <SelectItem value="100-200">100k - 200k</SelectItem>
                            <SelectItem value="200+">200k+</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sort} onValueChange={setSort}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Urutan: Terbaru" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Urutkan</SelectItem>
                            <SelectItem value="latest">Terbaru</SelectItem>
                            <SelectItem value="price_low">Harga Terendah</SelectItem>
                            <SelectItem value="price_high">Harga Tertinggi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-end">
                    <Button variant="outline" onClick={resetFilters}>
                        Reset Filter
                    </Button>
                </div>
            </div>

            <div className="text-sm text-muted-foreground">
                Menampilkan {products.length} produk
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                    <Card
                        key={product.id}
                        className="overflow-hidden pt-0 hover:shadow-lg transition-shadow"
                    >
                        <div className="aspect-square bg-muted relative group">
                            <div className="absolute inset-0 flex justify-between p-2 z-10">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 bg-white/70 backdrop-blur"
                                >
                                    <IconDots className="w-4 h-4" />
                                </Button>

                                <Badge className="text-[10px]">
                                    {product.category}
                                </Badge>
                            </div>

                            <Image
                                src={product?.image || "/placeholder.svg"}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                                width={200}
                                height={200}
                                alt={product.name}
                            />
                        </div>

                        <CardContent className="space-y-2 pt-4">
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
                                {product.brand}
                            </p>

                            <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[36px]">
                                {product.name}
                            </h3>

                            <div className="flex flex-wrap gap-1">
                                {getSkinTypes(product?.skin)
                                    .slice(0, 2)
                                    .map((type) => (
                                        <Badge
                                            key={type}
                                            variant="secondary"
                                            className="text-[10px] px-2 py-[2px]"
                                        >
                                            {type}
                                        </Badge>
                                    ))}
                            </div>

                            <div className="flex items-center gap-1">
                                <IconStar
                                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                                />
                                <span className="text-xs font-medium">
                                    {product.rating}
                                </span>
                            </div>

                            <div className="text-base font-semibold">
                                {formatPriceIDR(product?.price || 0)}
                            </div>
                        </CardContent>

                        <CardFooter className="pt-0">
                            <Link className="w-full cursor-pointer" href={`/produk/${product.id}`}>
                                <Button className="w-full" variant="secondary">
                                    Lihat Detail
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
                {isFetchingNextPage && (
                    <p className="text-sm text-muted-foreground">Loading more...</p>
                )}
            </div>

            {isLoading && <p>Loading...</p>}
        </div>
    );
}
````