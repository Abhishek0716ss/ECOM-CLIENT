import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Link, useNavigate } from "react-router-dom"
import { authRegister } from "@/api/api"
import { useRef } from "react"
import { toast } from "sonner"

const Register = () => {
  const navigate = useNavigate()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const streetRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const ziptRef = useRef<HTMLInputElement>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const registerData = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      street: streetRef.current?.value || "",
      city: cityRef.current?.value || "", 
      zip: ziptRef.current?.value || "",
    }

    try {
      const response = await authRegister(registerData)
      if (response.status === 201) {
        toast.success("Registration successful!")
        navigate("/")
      }
    } catch (error: any) {
      toast.error(error.response?.data || "Registration failed")
    }
  }

  return (
    <div className="w-svw h-[90vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your details below to register your account
          </CardDescription>
          <CardAction>
            <Link to="/">Login</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Mohan" ref={nameRef} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" ref={emailRef} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="******" ref={passwordRef} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="street">Street</Label>
                <Input id="street" type="text" placeholder="Mysuru" ref={streetRef} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" type="text" placeholder="Mysuru" ref={cityRef} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zip">Zip</Label>
                <Input id="zip" type="text" placeholder="Mysuru" ref={ziptRef} required />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-6">
              <Button type="submit" className="w-full">
                Signup
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register