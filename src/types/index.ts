

type AdminProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    tags: string,
    price: number,
    stock: number
}

type AddProductType = {
    name: string,
    description: string,
    category: string,
    tags: string,
    price: number,
    stock: number
}


export type { AdminProductType, AddProductType }

//   "id": "string",
//   "name": "string",
//   "description": "string",
//   "category": "string",
//   "tags": "string",
//   "price": 0,
//   "stock": 0