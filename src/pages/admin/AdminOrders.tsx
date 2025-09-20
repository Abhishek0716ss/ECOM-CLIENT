import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from "react"
import { getAllOrders, updateOrderStatus, deleteOrder } from "@/api/api"
import { toast } from "sonner"
import Loading from "@/components/Loading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { OrderType } from "@/types"



const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>([])
  const [loading, setLoading] = useState(true)
  const [editModel, showEditModel] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)
  const [editStatus, setEditStatus] = useState<OrderType["status"]>("PENDING")

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders()
      if (response.status === 200) {
        setOrders(response.data)
      }
    } catch {
      toast.error("Error while fetching orders")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteOrder(id)
      if (response.status === 200) {
        toast.success("Order Deleted!")
        fetchOrders()
      }
    } catch {
      toast.error("Error while deleting order")
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrder) return
    try {
      const response = await updateOrderStatus(selectedOrder.id, editStatus)
      if (response.status === 200) {
        toast.success("Order Status Updated")
        fetchOrders()
      }
    } catch {
      toast.error("Error while updating order status!")
    } finally {
      showEditModel(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="mt-4 border-2 round-sm h-full w-full flex flex-col">
      <div className="flex w-[98svw] h-12 justify-between items-center text-lg shadow-lg px-2 text-primary">
        <div className="w-1/2 font-bold">Admin Orders</div>
      </div>

      {orders.length === 0 ? (
        <div>No orders available</div>
      ) : (
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white">User ID</TableHead>
              <TableHead className="text-white">Total Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Created At</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.userId}</TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    onClick={() => {
                      setSelectedOrder(order)
                      setEditStatus(order.status)
                      showEditModel(true)
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-500"
                    onClick={() => handleDelete(order.id)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Edit Status Modal */}
      <AlertDialog open={editModel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Order Status</AlertDialogTitle>
            <AlertDialogDescription>
              <form onSubmit={handleEdit}>
                <div className="flex flex-col gap-4">
                  <Select value={editStatus} onValueChange={(val: OrderType["status"]) => setEditStatus(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                      <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="button" className="bg-red-600 w-1/2" onClick={() => showEditModel(false)}>Cancel</Button>
                  <Button type="submit" className="bg-green-600 w-1/2">Update</Button>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AdminOrders