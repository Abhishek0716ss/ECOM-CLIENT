import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const WebLayout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser)
                if (user.role === "USER") {
                    toast.success(`Welcome back ${user.name}`)
                    navigate("/user/products")
                } else if (user.role === "ADMIN") {
                    toast.success(`Welcome back Admin`)
                    navigate("/admin/products")
                }

            } catch (err) {
                navigate("/")
            }
        } 
    }, [navigate])

    return (
        <Outlet />
    )
}

export default WebLayout