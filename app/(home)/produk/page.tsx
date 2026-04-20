"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import brandList from "@/data/brand_list.json";
import categoryList from "@/data/category_list.json";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { formatPriceIDR } from "@/helpers/currency/currencyFormat";
import { getSkinTypes } from "@/helpers/data/skinTypes";
import { Product } from "@/types/product.types";
import { IconDots, IconSearch, IconStar } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

async function fetchProducts({ pageParam = 1, keyword = "", category = "", brand = "", priceRange = "", sort = "" }: any) {
  let minPrice;
  let maxPrice;

  if (priceRange === "0-100") {
    minPrice = 0;
    maxPrice = 100;
  }

  if (priceRange === "100-200") {
    minPrice = 100;
    maxPrice = 200;
  }

  if (priceRange === "200+") {
    minPrice = 200;
  }

  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: pageParam,
      limit: 12,
      keyword,
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
    }),
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil produk");
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["products", keyword, category, brand, priceRange, sort],

    queryFn: ({ pageParam }) =>
      fetchProducts({
        pageParam,
        keyword,
        category,
        brand,
        priceRange,
        sort,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
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
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Katalog Produk Skincare</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Temukan produk skincare terbaik untuk perawatan kulit Anda.</p>
      </div>

      {/* Search + Filters */}
      <div className="border rounded-lg p-6 bg-blue-50 dark:bg-blue-800 space-y-6 shadow-lg">
        {/* Search */}
        <div className="flex gap-4">
          <Input
            placeholder="Cari produk skincare..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
          />

          <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            <IconSearch className="w-4 h-4 mr-2" />
            Cari
          </Button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-6">
          <Select onValueChange={setCategory} value={category === "" ? "Semua Kategori" : category}>
            <SelectTrigger className="w-full rounded-lg shadow-lg">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categoryList?.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setBrand} value={brand === "" ? "Semua Brand" : brand}>
            <SelectTrigger className="w-full rounded-lg shadow-lg">
              <SelectValue placeholder="Semua Brand" />
            </SelectTrigger>
            <SelectContent>
              {brandList?.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="0-100" value={priceRange === "" ? "0-100" : priceRange} onValueChange={(e) => setPriceRange(e)}>
            <SelectTrigger className="w-full rounded-lg shadow-lg">
              <SelectValue placeholder="Range Harga" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-100">0 - 100K</SelectItem>
              <SelectItem value="100-200">100k - 200k</SelectItem>
              <SelectItem value="200+">200k+</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSort} value={sort}>
            <SelectTrigger className="w-full rounded-lg shadow-lg">
              <SelectValue placeholder="Urutan: Terbaru" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Terbaru</SelectItem>
              <SelectItem value="price_low">Harga Terendah</SelectItem>
              <SelectItem value="price_high">Harga Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={resetFilters} className="px-6 py-3 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
            Reset Filter
          </Button>
        </div>
      </div>

      {/* Result */}
      <div className="text-sm text-gray-600 dark:text-gray-300">Menampilkan {products.length} produk</div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: Product, index) => (
          <Card key={index} className="overflow-hidden pt-0 hover:shadow-2xl transition-shadow rounded-xl">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative group rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex justify-between p-2 z-10">
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/70 backdrop-blur">
                  <IconDots className="w-4 h-4" />
                </Button>

                <Badge className="text-[10px] bg-blue-500 text-white">{product.category}</Badge>
              </div>

              <Image src={product?.image || "/placeholder.svg"} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" width={200} height={200} alt={product.name} />
            </div>

            <CardContent className="space-y-2 pt-4">
              {/* Brand */}
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{product.brand}</p>

              {/* Product Name */}
              <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[36px]">{product.name}</h3>

              {/* Skin Type */}
              <div className="flex flex-wrap gap-1">
                {getSkinTypes(product?.skin)
                  .slice(0, 2)
                  .map((type) => (
                    <Badge key={type} variant="secondary" className="text-[10px] px-2 py-[2px]">
                      {type}
                    </Badge>
                  ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <IconStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />

                <span className="text-xs font-medium">{product.rating}</span>
              </div>

              {/* Price */}
              <div className="text-base font-semibold">{formatPriceIDR(product?.price || 0)}</div>
            </CardContent>

            <CardFooter className="pt-0">
              <Link className="w-full cursor-pointer" href={`/produk/${product.id}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Lihat Detail</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <p className="text-sm text-muted-foreground">Memuat lebih banyak...</p>}
      </div>

      {isLoading && <p>Memuat...</p>}
    </div>
  );
}
