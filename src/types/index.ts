export type AdminProductType = {
  id: string
  name: string
  description: string
  category: string
  tags: string
  stock: number
  price: number
}

export type AdminUserType = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

export type AdminOrderType = {
  id: string
  userId: string
  productNames: string[]
  totalAmount: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
}
