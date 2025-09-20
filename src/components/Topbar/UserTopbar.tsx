import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Power, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
}  from "@/components/ui/hover-card"
import type { CartItem } from "@/types"

const CART_KEY = "cart"

const UserTopBar = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const u = JSON.parse(storedUser)
        setUserName(u?.name ?? "")
      }
    } catch {}

    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setCartItems(Array.isArray(parsed) ? parsed : [])
      }
    } catch {
      setCartItems([])
    }

    const onCartUpdated = (e: Event) => {
      try {
        const custom = e as CustomEvent
        if (custom?.detail && Array.isArray(custom.detail)) {
          setCartItems(custom.detail)
          return
        }
      } catch {}

      try {
        const stored = localStorage.getItem(CART_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setCartItems(Array.isArray(parsed) ? parsed : [])
        } else {
          setCartItems([])
        }
      } catch {
        setCartItems([])
      }
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : []
          setCartItems(Array.isArray(parsed) ? parsed : [])
        } catch {
          setCartItems([])
        }
      }
    }

    window.addEventListener("cart-updated", onCartUpdated)
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener("cart-updated", onCartUpdated)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  const handleCheckout = () => {
    navigate("/user/checkout")
  }

  const totalQty = cartItems.reduce((acc, it) => acc + (it.qty || 0), 0)
  const grandTotal = cartItems.reduce((acc, it) => acc + (it.qty || 0) * (it.price || 0), 0)

  return (
    <div className="h-14 w-svw text-primary bg-white 
      flex justify-center items-center border-b border-violet-600 shadow-sm
      shadow-purple-600 px-4">
      <div className="w-[50%] h-full flex flex-row justify-start items-center gap-4">
        <NavLink to="/user/products" className="h-full flex justify-center items-center font-bold text-xl px-3">Products</NavLink>
        <NavLink to="/user/orders" className="h-full flex justify-center items-center font-bold text-xl px-3">Orders</NavLink>
        {/* <NavLink to="/user/profile" className="h-full flex justify-center items-center font-bold text-xl px-3">Profile</NavLink> */}
      </div>
      <div className="w-[50%] h-full flex flex-row justify-end items-center gap-4">
        {userName && <span className="font-semibold text-lg">{userName}</span>}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col border-b pb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-600">x{item.qty}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Price: ₹{item.price} (Total: ₹{item.price * item.qty})
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-gray-500">Cart is empty</span>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="mt-2">
                <div className="text-sm text-gray-700 mb-2 px-2">Subtotal: ₹{grandTotal}</div>
                <Button className="w-full bg-violet-600 hover:bg-violet-500" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            )}
          </HoverCardContent>
        </HoverCard>
        <Button className="bg-red-500 hover:bg-red-400 cursor-pointer" onClick={handleLogout}>
          <Power />
        </Button>
      </div>
    </div>
  )
}

export default UserTopBar