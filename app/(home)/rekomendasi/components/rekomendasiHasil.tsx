"use client"

import {
    Card,
    CardContent
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"


import { IconCheck, IconDroplet, IconFileDollar, IconStar, IconTarget } from "@tabler/icons-react"

export default function RecommendationResult() {
    return (
        <div className="w-full">

            {/* HERO */}
            <div className="bg-slate-600 text-white py-14">
                <div className="max-w-4xl mx-auto text-center space-y-3 px-6">

                    <h1 className="text-3xl font-semibold flex items-center justify-center gap-2">
                        🎉 Produk Terbaik untuk Anda!
                    </h1>

                    <p className="text-sm text-white/80">
                        Berdasarkan kriteria yang Anda pilih, sistem telah menemukan
                        produk skincare paling sesuai menggunakan metode TOPSIS
                    </p>

                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-3xl mx-auto px-6 -mt-10 space-y-6">

                {/* CRITERIA */}
                <div className="flex flex-wrap gap-2 justify-center bg-white border rounded-lg px-4 py-3 shadow-sm">
                    <Badge variant="secondary">Serum</Badge>
                    <Badge variant="secondary">Mid Range Rp 100k - 200k</Badge>
                    <Badge variant="secondary">Min Rating 4.5</Badge>
                </div>

                {/* RESULT CARD */}
                <Card className="overflow-hidden">

                    {/* TOP */}
                    <div className="bg-slate-600 text-white text-center py-10 relative">

                        <Badge className="absolute right-6 top-4 bg-white text-slate-700">
                            🏆 REKOMENDASI TERBAIK
                        </Badge>

                        <div className="flex justify-center mb-4">
                            <div className="bg-white rounded-xl p-4 shadow">
                                <IconDroplet size={32} className="text-sky-500" />
                            </div>
                        </div>

                        <p className="text-xs opacity-80">SERUM</p>

                        <h2 className="text-xl font-semibold">
                            Vitamin C Brightening Serum
                        </h2>

                        <p className="text-sm opacity-80">
                            SOMETHINC
                        </p>

                    </div>

                    <CardContent className="space-y-6 py-6">

                        {/* SCORE */}
                        <div className="bg-muted rounded-lg text-center py-6">
                            <p className="text-xs text-muted-foreground">
                                SKOR TOPSIS
                            </p>

                            <div className="text-4xl font-bold text-slate-700">
                                0.8754
                            </div>

                            <p className="text-xs text-muted-foreground mt-1">
                                Semakin mendekati 1 semakin ideal untuk kebutuhan Anda
                            </p>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-3 gap-4 text-center">

                            <div className="border rounded-lg p-4 space-y-1">
                                <IconTarget className="mx-auto text-red-500" size={20} />
                                <p className="text-xs text-muted-foreground">Kategori</p>
                                <p className="font-medium text-sm">Serum</p>
                            </div>

                            <div className="border rounded-lg p-4 space-y-1">
                                <IconFileDollar className="mx-auto text-amber-500" size={20} />
                                <p className="text-xs text-muted-foreground">Harga</p>
                                <p className="font-medium text-sm">Rp 189K</p>
                            </div>

                            <div className="border rounded-lg p-4 space-y-1">
                                <IconStar className="mx-auto text-yellow-500" size={20} />
                                <p className="text-xs text-muted-foreground">Rating</p>
                                <p className="font-medium text-sm">4.8 / 5.0</p>
                            </div>

                        </div>

                        {/* WHY */}
                        <div className="space-y-3">

                            <p className="font-medium text-sm">
                                ✨ Kenapa Produk Ini Dipilih?
                            </p>

                            <div className="space-y-2 text-sm">

                                <div className="flex gap-2 items-start">
                                    <IconCheck className="text-green-500" size={16} />
                                    <span>Sesuai dengan kategori Serum</span>
                                </div>

                                <div className="flex gap-2 items-start">
                                    <IconCheck className="text-green-500" size={16} />
                                    <span>Harga dalam budget Rp100k - Rp200k</span>
                                </div>

                                <div className="flex gap-2 items-start">
                                    <IconCheck className="text-green-500" size={16} />
                                    <span>Rating tinggi dari customer</span>
                                </div>

                                <div className="flex gap-2 items-start">
                                    <IconCheck className="text-green-500" size={16} />
                                    <span>
                                        Skor TOPSIS tertinggi berdasarkan perhitungan sistem
                                    </span>
                                </div>

                            </div>

                        </div>

                        <Separator />

                        {/* BUTTONS */}
                        <div className="grid grid-cols-2 gap-3">

                            <Button className="w-full">
                                Beli Sekarang
                            </Button>

                            <Button variant="outline">
                                Lihat Detail Produk
                            </Button>

                            <Button variant="secondary">
                                Cari Produk Lain
                            </Button>

                            <Button variant="secondary">
                                Simpan Rekomendasi
                            </Button>

                        </div>

                    </CardContent>

                </Card>

                {/* ABOUT TOPSIS */}
                <Card className="bg-slate-600 text-white">

                    <CardContent className="py-4 text-sm space-y-2">

                        <p className="font-medium flex items-center gap-2">
                            📘 Tentang Metode TOPSIS
                        </p>

                        <p className="text-white/80 text-xs">
                            TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)
                            adalah metode pengambilan keputusan yang menentukan produk
                            paling mendekati solusi ideal berdasarkan kriteria yang dipilih
                            seperti kategori, harga, dan rating.
                        </p>

                    </CardContent>

                </Card>

            </div>

        </div>
    )
}