"use client"

import categoryList from "@/data/category_list.json"
import skinList from "@/data/skin_list.json"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import {
    IconRotateClockwise,
    IconSearch,
    IconSparkles
} from "@tabler/icons-react"

import { Controller, useForm } from "react-hook-form"
import { FormValues } from "../page"

export function RecommendationForm({
    onSubmit,
}: {
    onSubmit: (data: FormValues) => void
}) {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            category: "",
            skin: "",
            price: "",
            rating: ""
        }
    })

    return (
        <div className="w-full">

            {/* HERO */}
            <div className="bg-slate-600 text-white py-14">
                <div className="max-w-4xl mx-auto text-center space-y-4 px-6">
                    <IconSearch className="w-7 h-7 opacity-80 mx-auto" />
                    <h1 className="text-3xl font-semibold">
                        Cari Rekomendasi Skincare
                    </h1>
                    <p className="text-sm text-white/80 max-w-xl mx-auto">
                        Dapatkan rekomendasi produk skincare terbaik berdasarkan kategori,
                        tipe kulit, budget, dan rating yang Anda inginkan.
                    </p>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-3xl mx-auto px-6 -mt-10 space-y-6 mb-5">

                {/* INFO */}
                <Card className="bg-slate-600 text-white">
                    <CardContent className="py-4 text-sm flex gap-3 items-start">
                        <IconSparkles className="w-5 h-5 mt-0.5 opacity-80" />
                        <p>
                            <span className="font-medium">Cara Menggunakan</span><br />
                            Pilih kategori produk, tipe kulit, tentukan budget, dan minimum rating.
                            Sistem akan menghitung rekomendasi terbaik menggunakan metode TOPSIS.
                        </p>
                    </CardContent>
                </Card>

                {/* FORM */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            🎯 Kriteria Pencarian
                        </CardTitle>
                        <CardDescription>
                            Tentukan kriteria produk yang Anda butuhkan
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >

                            {/* CATEGORY */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Kategori Produk *</label>
                                <Controller
                                    control={control}
                                    name="category"
                                    rules={{ required: "Kategori wajib dipilih" }}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="-- Pilih Kategori --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoryList.map(cat => (
                                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
                            </div>

                            {/* SKIN */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tipe Kulit *</label>
                                <Controller
                                    control={control}
                                    name="skin"
                                    rules={{ required: "Tipe kulit wajib dipilih" }}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="-- Pilih Tipe Kulit --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {skinList.map(s => (
                                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.skin && <p className="text-red-500 text-xs">{errors.skin.message}</p>}
                            </div>

                            {/* PRICE */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Budget / Range Harga *</label>
                                <Controller
                                    control={control}
                                    name="price"
                                    rules={{ required: "Range harga wajib dipilih" }}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="-- Pilih Range Harga --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0-100">Rp 0 - 100k</SelectItem>
                                                <SelectItem value="100-200">Rp 100k - 200k</SelectItem>
                                                <SelectItem value="200-300">Rp 200k - 300k</SelectItem>
                                                <SelectItem value="300+">Rp 300k+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
                            </div>

                            {/* RATING */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Minimum Rating *</label>
                                <Controller
                                    control={control}
                                    name="rating"
                                    rules={{ required: "Rating wajib dipilih" }}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="-- Pilih Rating --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="4">4.0★ ke atas</SelectItem>
                                                <SelectItem value="4.3">4.3★ ke atas</SelectItem>
                                                <SelectItem value="4.5">4.5★ ke atas</SelectItem>
                                                <SelectItem value="4.7">4.7★ ke atas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.rating && <p className="text-red-500 text-xs">{errors.rating.message}</p>}
                            </div>

                            {/* BUTTON */}
                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => reset()}>
                                    <IconRotateClockwise className="w-4 h-4 mr-2" />
                                    Reset
                                </Button>
                                <Button type="submit" className="flex-1">
                                    Dapatkan Rekomendasi
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
