import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { getAllUsers, addNewUser, deleteUser } from "@/api/api"
import type { AdminUserType } from "@/types"
import Loading from "@/components/Loading"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUserType[]>([])
  const [loading, setLoading] = useState(true)
  const [addModel, showAddModel] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const fetchData = async () => {
    try {
      const res = await getAllUsers()
      setUsers(res.data)
    } catch {
      toast.error("Error fetching users")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id)
      toast.success("User deleted")
      fetchData()
    } catch {
      toast.error("Error deleting user")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      role: "user",
    }
    try {
      await addNewUser(newUser)
      toast.success("User added")
      fetchData()
    } catch {
      toast.error("Error adding user")
    } finally {
      showAddModel(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  if (loading) return <Loading />

  return (
    <div className="mt-4 border-2 h-full w-full flex flex-col">
      <div className="flex justify-between items-center h-12 shadow px-2 text-primary">
        <span className="font-bold">Admin Users</span>
        <Button className="bg-green-600 hover:bg-green-500" onClick={() => showAddModel(true)}>
          <Plus /> Add User
        </Button>
      </div>
      {users.length === 0 ? (
        <div>No users available</div>
      ) : (
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Role</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell className="flex justify-end">
                  <Button className="bg-red-600 hover:bg-red-500" onClick={() => handleDelete(u.id)}>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={addModel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add User</AlertDialogTitle>
            <AlertDialogDescription>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Label>Name</Label>
                  <Input type="text" ref={nameRef} required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" ref={emailRef} required />
                </div>
                <div className="flex gap-2">
                  <Button className="w-1/2 bg-red-600" onClick={() => showAddModel(false)}>Cancel</Button>
                  <Button className="w-1/2 bg-green-600" type="submit">Add</Button>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AdminUsers
