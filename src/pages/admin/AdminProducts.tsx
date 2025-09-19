import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
     
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Plus, Trash2 } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, { useEffect, useRef, useState } from "react"
// import { addNewProduct, deleteProduct, getAllProducts } from "@/api/api"
import { toast } from "sonner"
import Loading from "@/components/Loading"
import type { AdminProductType } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { addNewProduct, deleteProduct, getAllProducts } from "@/api/api"


const AdminProducts = () => {
    const [products, setProducts] = useState<AdminProductType[]>([])
    const [loading, setLoading] = useState(true)
    const [addModel, showAddModel] = useState(false)

    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLInputElement>(null)
    const tagsRef = useRef<HTMLInputElement>(null)
    const stockRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)

    const fetchdata = async () => {
        try {
            const response = await getAllProducts()
            if (response.status === 200) {
                setProducts(response.data)
            }
        } catch (error) {
            toast.error("Error while fetching Products")
        } finally {
            setLoading(false)
        }
    }
    const handleDelete = async (id: string) => {
        try {
            const response = await deleteProduct(id)
            if (response.status === 200) {
                toast.success("Product Deleted !")
                fetchdata()
            }
        } catch (error) {
            toast.error("Error while fetching Products")
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newproduct = {
            name: nameRef.current?.value || "",
            description: descriptionRef.current?.value || "",
            category: categoryRef.current?.value || "",
            tags: tagsRef.current?.value || "",
            stock: Number(stockRef.current?.value),
            price: Number(priceRef.current?.value),
        }
        try {
            const response = await addNewProduct(newproduct)
            if (response.status === 200) {
                toast.success("Product Added")
                fetchdata()
            }
        } catch (error) {
            toast.error("Error while adding Product !")
        } finally {
            showAddModel(false)
        }
    }
    useEffect(() => {
        fetchdata()
    }, [])

    if (loading) {
        return <Loading />
    }
    return (
        <div className="mt-4 border-2 round-sm h-full w-full flex justify-center items-start flex-col">
            <div className="flex w-[98svw] h-12 justify-between items-center text-lg shadow-lg px-2 text-primary">
                <div className="w-1/2 font-bold ">
                    Admin Propducts
                </div>
                <div className="w-1/2 flex justify-end items-center">
                    <Button className="bg-green-600 hover:bg-green-500 rounded-sm" onClick={() => { showAddModel(true) }}>
                        <Plus /> Add Product
                    </Button>
                </div>
            </div>
            {(!loading && products.length === 0) ?
                (
                    <div> no products available </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-primary ">
                            <TableRow>
                                <TableHead className="w-[100px] text-white">Name</TableHead>
                                <TableHead className="text-white">Description</TableHead>
                                <TableHead className="text-white">Category</TableHead>
                                <TableHead className="text-white">Tags</TableHead>
                                <TableHead className="text-white">Stock</TableHead>
                                <TableHead className="text-white">Price</TableHead>
                                <TableHead className="text-white text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.tags}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell className="flex w-full justify-end items-center gap-2">
                                        <Button className="bg-blue-600 hover:bg-blue-500 cursor-pointer">
                                            <Pencil />
                                        </Button>
                                        <Button className="bg-red-600 hover:bg-red-500 cursor-pointer" onClick={() => handleDelete(product.id)}>
                                            <Trash2 />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                )
            }

            <AlertDialog open={addModel}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add Product</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Phone"
                                            ref={nameRef}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            id="description"
                                            type="text"
                                            placeholder="Test Product"
                                            ref={descriptionRef}
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Input
                                            id="Cescription"
                                            type="text"
                                            placeholder="Electronics"
                                            ref={categoryRef}
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <Input
                                            id="tags"
                                            type="text"
                                            placeholder="Tag1,Tag2"
                                            ref={tagsRef}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            placeholder="100.00"
                                            ref={priceRef}
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            placeholder="10"
                                            ref={stockRef}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row flex-1">
                                    <Button className="bg-red-600 w-1/2 hover:bg-red-500" onClick={() => showAddModel(false)}>
                                        Cancel
                                    </Button>
                                    <Button className="bg-green-600 hover:bg-green-500 w-1/2" type="submit">
                                        Add
                                    </Button>
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

        </div >
    )
}

export default AdminProducts