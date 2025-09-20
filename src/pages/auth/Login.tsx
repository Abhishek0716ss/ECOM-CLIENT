import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Link, useNavigate } from "react-router-dom"
import { authLogin } from "@/api/api"
import { useRef } from "react"
import { toast } from "sonner"

const Login = () => {
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const loginData = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || ""
    }
    try {
      const response = await authLogin(loginData)
      if (response.status === 200) {
        toast.success("Login successful!")
        localStorage.setItem("user", JSON.stringify(response.data))

        const role = response.data.role
        if (role === "ADMIN") {
          navigate("/admin/products")
        } else if (role === "USER") {
          navigate("/user/products")
        } else {
          navigate("/") 
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data || "Login failed")
    }
  }

  return (
    <div className="w-svw h-[90vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/register">Sign Up</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" ref={emailRef} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="**********" ref={passwordRef} required />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-6">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login