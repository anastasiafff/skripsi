import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'

export type Product = {
    id: number
    name: string
    brand: string
    category: string
    price: number
    rating: number
    status: 'active' | 'inactive'
}

// Columns TanStack Table
export const ProductColumn: ColumnDef<Product>[] = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'name',
        header: 'Nama Product'
    },
    {
        accessorKey: 'brand',
        header: 'Brand'
    },
    {
        accessorKey: 'category',
        header: 'Kategori'
    },
    {
        accessorKey: 'price',
        header: 'Harga',
        cell: info => `$${info.getValue<number>()}`
    },
    {
        accessorKey: 'rating',
        header: 'Rating'
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: info => (
            <span className={info.getValue() === 'active' ? 'text-green-600' : 'text-red-600'}>
                {info.getValue()}
            </span>
        )
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: () => <Button size="sm" variant="outline">Edit</Button>
    }
]
