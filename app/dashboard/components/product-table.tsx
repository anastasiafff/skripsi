'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { ProductColumn } from './product-column'

type Product = {
    id: number
    name: string
    brand: string
    category: string
    price: number
    rating: number
    status: 'active' | 'inactive'
}

const dummyProducts: Product[] = [
    { id: 1, name: 'Product A', brand: 'Brand X', category: 'Category 1', price: 100, rating: 4.5, status: 'active' },
    { id: 2, name: 'Product B', brand: 'Brand Y', category: 'Category 2', price: 200, rating: 4.0, status: 'inactive' },
    { id: 3, name: 'Product C', brand: 'Brand Z', category: 'Category 1', price: 150, rating: 3.8, status: 'active' },
    { id: 4, name: 'Product D', brand: 'Brand X', category: 'Category 3', price: 250, rating: 4.7, status: 'active' },
]

export const ProductTable = () => {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')

    const filteredData = useMemo(() => {
        return dummyProducts.filter(p => {
            return (
                p.name.toLowerCase().includes(search.toLowerCase()) &&
                (selectedCategory ? p.category === selectedCategory : true) &&
                (selectedBrand ? p.brand === selectedBrand : true)
            )
        })
    }, [search, selectedCategory, selectedBrand])



    const table = useReactTable({
        data: filteredData,
        columns: ProductColumn,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <Card className="p-6 space-y-4">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Data Product</h2>
                <Button>Tambah Product</Button>
            </div>

            <hr />

            {/* Filters */}
            <div className="flex flex-wrap flex-row  gap-4">
                <Input
                    placeholder="Search product..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="flex-1 min-w-[200px]"
                />

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Semua Kategori</SelectItem>
                        <SelectItem value="Category 1">Category 1</SelectItem>
                        <SelectItem value="Category 2">Category 2</SelectItem>
                        <SelectItem value="Category 3">Category 3</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Semua Brand" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Semua Brand</SelectItem>
                        <SelectItem value="Brand X">Brand X</SelectItem>
                        <SelectItem value="Brand Y">Brand Y</SelectItem>
                        <SelectItem value="Brand Z">Brand Z</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Card>
    )
}
