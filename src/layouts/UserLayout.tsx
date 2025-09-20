import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import UserTopBar from "@/components/Topbar/UserTopbar"

const UserLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        if (user.role !== "USER") {
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
      <UserTopBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default UserLayout