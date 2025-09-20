import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import AdminTopBar from "@/components/Topbar/AdminTopbar"

const AdminLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        if (user.role !== "ADMIN") {
          navigate("/") 
        }
      } catch (err) {
        navigate("/") 
      }
    } else {
      navigate("/") 
    }
  }, [navigate])

  return (
    <div className="flex justify-start items-center flex-col">
      <AdminTopBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout