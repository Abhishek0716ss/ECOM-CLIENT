import { useEffect, useState } from "react"
import { getAllProducts } from "@/api/api"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CartItem, Product } from "@/types"
import { toast } from "sonner"

const CART_KEY = "cart"

const normalizeItem = (item: any): CartItem => {
  const id = item.id ?? item._id ?? item.productId ?? ""
  const name = item.name ?? item.title ?? ""
  const price = typeof item.price === "number" ? item.price : Number(item.price ?? 0)
  const qty = typeof item.qty === "number" ? item.qty : Number(item.qty ?? 1)
  return { id, name, price, qty }
}

const UserProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        const data = res?.data ?? []
        setProducts(Array.isArray(data) ? data : [])
      })
      .catch(() => setProducts([]))
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          const normalized = parsed.map((it) => normalizeItem(it)).filter((it) => it.id)
          setCartItems(normalized)
        } else {
          setCartItems([])
        }
      }
    } catch {
      setCartItems([])
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const productId = product._id ?? (product as any).id ?? ""
      if (!productId) return prev
      const existingIndex = prev.findIndex((p) => p.id === productId)
      let next: CartItem[]
      if (existingIndex !== -1) {
        next = prev.map((p) => (p.id === productId ? { ...p, qty: p.qty + 1 } : p))
      } else {
        const item: CartItem = {
          id: productId,
          name: product.name ?? "",
          price: typeof product.price === "number" ? product.price : Number(product.price ?? 0),
          qty: 1,
        }
        next = [...prev, item]
      }
      localStorage.setItem(CART_KEY, JSON.stringify(next))
      toast.success("Product Added to Cart")
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: next }))
      return next
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <Card key={product._id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
            )}
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="mt-2 font-semibold text-lg">₹{product.price}</p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-violet-600 hover:bg-violet-500"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default UserProducts