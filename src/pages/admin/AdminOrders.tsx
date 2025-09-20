// src/pages/admin/AdminOrders.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getAllOrders, deleteOrder, updateOrderStatus } from "@/api/api"
import type { AdminOrderType } from "@/types"
import Loading from "@/components/Loading"

const AdminOrders = () => {
  const [orders, setOrders] = useState<AdminOrderType[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch orders from API
  const fetchData = async () => {
    try {
      const res = await getAllOrders()
      console.log("Orders API response:", res.data) // debug
      setOrders(res.data.data || []) // safe access
    } catch (err) {
      console.error("Error fetching orders:", err)
      toast.error("Error fetching orders")
    } finally {
      setLoading(false)
    }
  }

  // Delete an order
  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id)
      toast.success("Order deleted")
      fetchData()
    } catch (err) {
      console.error("Error deleting order:", err)
      toast.error("Error deleting order")
    }
  }

  // Update order status
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateOrderStatus(id, status)
      toast.success("Order status updated")
      fetchData()
    } catch (err) {
      console.error("Error updating status:", err)
      toast.error("Error updating status")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="mt-4 border-2 h-full w-full flex flex-col">
      <div className="flex justify-between items-center h-12 shadow px-2 text-primary">
        <span className="font-bold">Admin Orders</span>
      </div>

      {orders && orders.length > 0 ? (
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white">User ID</TableHead>
              <TableHead className="text-white">Products</TableHead>
              <TableHead className="text-white">Total</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell>{o.userId}</TableCell>
                <TableCell>{o.productNames?.join(", ")}</TableCell>
                <TableCell>${o.totalAmount}</TableCell>
                <TableCell>
                  <select
                    className="border rounded px-2 py-1"
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </TableCell>
                <TableCell className="flex justify-end">
                  <Button
                    className="bg-red-600 hover:bg-red-500"
                    onClick={() => handleDelete(o.id)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-4 text-center text-gray-500">No orders available</div>
      )}
    </div>
  )
}

export default AdminOrders
