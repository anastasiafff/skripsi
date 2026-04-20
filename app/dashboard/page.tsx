import { CardInformation } from "@/components/card-information";
import { Button } from "@/components/ui/button";
import { IconShoppingCart } from "@tabler/icons-react";
import { ProductTable } from "./components/product-table";


export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 m-4">
      <div className="flex flex-1  flex-row justify-between items-center bg-muted/50 border rounded-xl p-4 h-max min-h-min o">
        <h1 className="text-3xl">Dashboard</h1>
        <div className="flex flex-row gap-2">
          <Button variant={'secondary'}>Export Data</Button>
          <Button>Tambah Produk</Button>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <CardInformation
          title="Total Orders"
          total={120}
          icon={<IconShoppingCart className="w-5 h-5" />}
        />
        <CardInformation
          title="Total Orders"
          total={120}
          icon={<IconShoppingCart className="w-5 h-5" />}
        />
        <CardInformation
          title="Total Orders"
          total={120}
          icon={<IconShoppingCart className="w-5 h-5" />}
        />
        <CardInformation
          title="Total Orders"
          total={120}
          icon={<IconShoppingCart className="w-5 h-5" />}
        />
      </div>

      <div className="min-h-[100vh] flex-1 ">
        <ProductTable />
      </div>
    </div >
  )
}
