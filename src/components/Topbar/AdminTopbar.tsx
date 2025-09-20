import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Power } from "lucide-react"
import { useEffect, useState } from "react"

const AdminTopBar = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUserName(user.name || "")
      } catch (err) {
        console.error("Invalid user data in localStorage", err)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user") 
    navigate("/")
  }

  return (
    <div className="h-14 w-svw text-primary bg-white 
      flex justify-center items-center border-b border-violet-600 shadow-sm
      shadow-purple-600 px-4">
      <div className="w-[50%] h-full flex flex-row justify-start items-center gap-4">
        <NavLink to="/admin/products" className="h-full flex justify-center items-center font-bold text-xl px-3">Products</NavLink>
        <NavLink to="/admin/users" className="h-full flex justify-center items-center font-bold text-xl px-3">Users</NavLink>
        <NavLink to="/admin/orders" className="h-full flex justify-center items-center font-bold text-xl px-3">Orders</NavLink>
      </div>
      <div className="w-[50%] h-full flex flex-row justify-end items-center gap-4">
        {userName && <span className="font-semibold text-lg">{userName}</span>}
        <Button
          className="bg-red-500 hover:bg-red-400 cursor-pointer"
          onClick={handleLogout}
        >
          <Power />
        </Button>
      </div>
    </div>
  )
}

export default AdminTopBar