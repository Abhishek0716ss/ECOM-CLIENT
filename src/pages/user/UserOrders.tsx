import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import Loading from "@/components/Loading"
import { getOrdersByUser } from "@/api/api"

type OrderItem = {
  productId: string
  name: string
  price: number
  category: string
  quantity: number
}

type Order = {
  id: string
  userId: string
  totalAmount: number
  createdAt: string
  status: string
  items: OrderItem[]
}

const UserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const userId = user?.uid || ""

  const fetchOrders = async () => {
    if (!userId) {
      toast.error("No user logged in")
      setLoading(false)
      return
    }
    try {
      const response = await getOrdersByUser(userId)
      if (response.status === 200) {
        console.log("API Data:", response.data)
        setOrders(response.data)
      }
    } catch {
      toast.error("Error fetching your orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="mt-4 border-2 round-sm h-full w-[95svw] flex flex-col">
      <div className="flex w-full h-12 justify-between items-center text-lg shadow-lg px-2 text-primary">
        <div className="w-1/2 font-bold">My Orders</div>
      </div>

      {orders.length === 0 ? (
        <div className="p-4 text-center">You don’t have any orders yet.</div>
      ) : (
        <div className="p-4 flex flex-col gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow-md p-4 flex flex-col gap-4"
            >
              {/* Order Summary */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <div className="font-semibold text-lg">
                    Order ID: {order.id}
                  </div>
                  <div className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Status: {order.status}
                  </div>
                </div>
                <div className="font-bold text-primary text-lg">
                  Total: ${order.totalAmount.toFixed(2)}
                </div>
              </div>

              {/* Items Table */}
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>${item.price.toLocaleString()}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        ${(item.price * item.quantity).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserOrders