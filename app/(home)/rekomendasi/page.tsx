"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPriceIDR } from "@/helpers/currency/currencyFormat"
import { useState } from "react"
import { RecommendationForm } from "./components/rekomendasiForm"


export type FormValues = {
    category: string;
    skin: string;
    price: string;
    rating: string
}

type Product = {
    id: number
    name: string
    brand: string
    category: string
    price: number
    rating: number
    topsisScore: number
    ingredients: string[]
    skin: Record<string, boolean>
    isTopResult?: boolean
}
export default function RecommendationPage() {
    const [result, setResult] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState<Record<number, boolean>>({})

    const handleSubmit = async (data: FormValues) => {
        try {
            setLoading(true)
            const res = await fetch("/api/recommendation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Failed to fetch recommendation")
            const json = await res.json()
            setResult(json.items || [])
        } catch (err) {
            console.error(err)
            setResult([])
        } finally {
            setLoading(false)
        }
    }

    const toggleExpand = (id: number) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }
    return (
        <div className="space-y-8">

            {/* FORM */}
            <RecommendationForm onSubmit={handleSubmit} />

            {/* RESULT */}
            <div className="max-w-7xl mx-auto px-6">

                {loading && <p className="text-center text-gray-500">Loading...</p>}

                {!loading && result.length === 0 && (
                    <p className="text-center text-gray-500">Belum ada rekomendasi.</p>
                )}

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">

                    {!loading && result.map((p) => {
                        const showAll = expanded[p.id]
                        const ingredientsToShow = showAll ? p.ingredients : p.ingredients.slice(0, 5)

                        return (
                            <div
                                key={p.id}
                                className={`
                            border rounded-lg shadow-lg p-4 flex flex-col relative
                            ${p.isTopResult ? "bg-yellow-50 border-yellow-400 col-span-3" : "bg-white"}
                        `}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="font-semibold text-lg line-clamp-2">{p.name}</h2>
                                    {p.isTopResult && <Badge variant="destructive">Top Result</Badge>}
                                </div>

                                <div className="flex justify-between items-start mb-2 absolute bottom-4 right-4">
                                    <Badge variant="destructive">Score {p.topsisScore.toFixed(3)}</Badge>
                                </div>

                                {/* Brand, Category, Rating */}
                                <p className="text-sm text-muted-foreground">{p.brand}</p>
                                <p className="text-sm text-muted-foreground">
                                    Kategori: {p.category} | Rating: {p.rating.toFixed(1)}★
                                </p>
                                <p className="font-bold mt-1">{formatPriceIDR(p.price)}</p>

                                {/* Top Result Details */}
                                {p.isTopResult && (
                                    <div className="mt-3 text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                                        {/* Ingredients */}
                                        <div className="col-span-3">
                                            <span className="font-medium">Ingredients:</span>
                                            <ul className="list-disc ml-6 space-y-1 grid grid-cols-3">
                                                {ingredientsToShow.map((ing, i) => (
                                                    <li key={i}>{ing}</li>
                                                ))}
                                            </ul>
                                            {p.ingredients.length > 5 && (
                                                <Button
                                                    variant="secondary"
                                                    type="button"
                                                    onClick={() => toggleExpand(p.id)}
                                                    className="mt-1 text-xs text-blue-600 hover:underline w-full"
                                                >
                                                    {showAll ? "Show Less" : `+${p.ingredients.length - 5} more`}
                                                </Button>
                                            )}
                                        </div>

                                        {/* Skin type */}
                                        <div className="col-span-3 sm:col-span-1">
                                            <span className="font-medium ">Cocok untuk kulit:</span>
                                            <p className="capitalize">
                                                {Object.entries(p.skin)
                                                    .filter(([_, val]) => val)
                                                    .map(([key]) => key)
                                                    .join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )
                    })}

                </div>

            </div>
        </div>
    )
}
