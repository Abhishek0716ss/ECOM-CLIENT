import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { placeOrder } from "@/api/api"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

type CartItem = {
  id: string
  name: string
  price: number
  qty: number
}

type User = {
  name: string
  uid: string
  email: string
  street: string
  city: string
  zip: string
}

const CART_KEY = "cart"

const UserCheckout = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      }
      const storedCart = localStorage.getItem(CART_KEY)
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart)
        if (Array.isArray(parsedCart)) setCartItems(parsedCart)
      }
    } catch {
      setCartItems([])
    }
  }, [])

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const handleDeleteItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id)
    setCartItems(updated)
    localStorage.setItem(CART_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: updated }))
  }

  const handlePlaceOrder = async () => {
    if (!user?.uid || cartItems.length === 0) return
    setLoading(true)
    try {
      const products: Record<string, number> = {}
      cartItems.forEach((item) => {
        products[item.id] = item.qty
      })
      console.log(user.uid, products)
      await placeOrder(user.uid, products)
      toast.success("Order Completed")
      localStorage.removeItem(CART_KEY)
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: [] }))
      setCartItems([])
      setSuccess(true)

      setTimeout(() => {
        navigate("/user/orders")
      }, 1500)
    } catch (err) {
      console.error("Order failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 border-2 round-sm h-full w-[95svw]">
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3">{item.qty}</td>
                      <td className="p-3">₹{item.price * item.qty}</td>
                      <td className="p-3 text-center">
                        <Button
                          variant="ghost"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-gray-500">
                      Your cart is empty.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {cartItems.length > 0 && (
            <div className="flex justify-end mt-4 font-bold text-lg">
              Total Amount: ₹{totalAmount}
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {user ? (
                <>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <div className="text-sm text-gray-500">
                    {user.street}, {user.city} - {user.zip}
                  </div>
                </>
              ) : (
                <div className="text-gray-500">User details not found</div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-violet-600 hover:bg-violet-500"
                disabled={loading || cartItems.length === 0}
                onClick={handlePlaceOrder}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
            </CardFooter>
          </Card>
          {success && (
            <p className="text-green-600 mt-4 text-center">
              Order placed successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserCheckout