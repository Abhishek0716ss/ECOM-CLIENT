import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Link } from "react-router-dom"

const Register = () => {
    return (
        <div className="w-svw h-[90vh] flex justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Register your account</CardTitle>
                    <CardDescription>
                        Enter your details below to register to your account
                    </CardDescription>
                    <CardAction>
                        <Link to='/'>Login</Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="mohan"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" placeholder="******" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="adress"
                                    type="text"
                                    placeholder="Mysuru"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Signup
                    </Button>

                </CardFooter>
            </Card>
        </div>
    )
}

export default Register