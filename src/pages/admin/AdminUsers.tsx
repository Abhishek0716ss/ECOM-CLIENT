import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Plus, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useRef, useState } from "react"
import { getAllUsers, addUser, editUser, deleteUser } from "@/api/api"
import { toast } from "sonner"
import Loading from "@/components/Loading"
import type { AdminUserType } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUserType[]>([])
  const [loading, setLoading] = useState(true)
  const [addModel, showAddModel] = useState(false)
  const [editModel, showEditModel] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUserType | null>(null)
  const [role, setRole] = useState<"ADMIN" | "USER">("USER")
  const [editRole, setEditRole] = useState<"ADMIN" | "USER">("USER")


  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const streetRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const zipRef = useRef<HTMLInputElement>(null)

  // refs for edit form
  const editNameRef = useRef<HTMLInputElement>(null)
  const editEmailRef = useRef<HTMLInputElement>(null)
  const editPasswordRef = useRef<HTMLInputElement>(null)
  const editStreetRef = useRef<HTMLInputElement>(null)
  const editCityRef = useRef<HTMLInputElement>(null)
  const editZipRef = useRef<HTMLInputElement>(null)

  const fetchdata = async () => {
    try {
      const response = await getAllUsers()
      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch {
      toast.error("Error while fetching Users")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUser(id)
      if (response.status === 200) {
        toast.success("User Deleted!")
        fetchdata()
      }
    } catch {
      toast.error("Error while deleting User")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      street: streetRef.current?.value || "",
      city: cityRef.current?.value || "",
      zip: zipRef.current?.value || "",
      roles: role,
    }
    try {
      const response = await addUser(newUser)
      if (response.status === 200) {
        toast.success("User Added")
        fetchdata()
      }
    } catch {
      toast.error("Error while adding User!")
    } finally {
      showAddModel(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    const updatedUser = {
      ...selectedUser,
      name: editNameRef.current?.value || "",
      email: editEmailRef.current?.value || "",
      password: editPasswordRef.current?.value || "",
      street: editStreetRef.current?.value || "",
      city: editCityRef.current?.value || "",
      zip: editZipRef.current?.value || "",
      roles: editRole,
    }
    try {
      const response = await editUser(selectedUser.id, updatedUser)
      if (response.status === 200) {
        toast.success("User Updated")
        fetchdata()
      }
    } catch {
      toast.error("Error while updating User!")
    } finally {
      showEditModel(false)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="mt-4 border-2 round-sm h-full w-full flex flex-col">
      <div className="flex w-[98svw] h-12 justify-between items-center text-lg shadow-lg px-2 text-primary">
        <div className="w-1/2 font-bold">Admin Users</div>
        <div className="w-1/2 flex justify-end items-center">
          <Button
            className="bg-green-600 hover:bg-green-500 rounded-sm"
            onClick={() => {
              showAddModel(true)
              setRole("USER")
            }}
          >
            <Plus /> Add User
          </Button>
        </div>
      </div>

      {users.length === 0 ? (
        <div>No users available</div>
      ) : (
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">City</TableHead>
              <TableHead className="text-white">Role</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.roles}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    onClick={() => {
                      setSelectedUser(user)
                      setEditRole(user.roles)
                      showEditModel(true)
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-500"
                    onClick={() => handleDelete(user.id)}
                  >
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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <Label>Name</Label>
                  <Input ref={nameRef} required />

                  <Label>Email</Label>
                  <Input type="email" ref={emailRef} required />

                  <Label>Password</Label>
                  <Input type="password" ref={passwordRef} required />

                  <Label>Street</Label>
                  <Input ref={streetRef} />

                  <Label>City</Label>
                  <Input ref={cityRef} />

                  <Label>Zip</Label>
                  <Input ref={zipRef} />

                  <Label>Role</Label>
                  <Select value={role} onValueChange={(val: "ADMIN" | "USER") => setRole(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="button" className="bg-red-600 w-1/2" onClick={() => showAddModel(false)}>Cancel</Button>
                  <Button type="submit" className="bg-green-600 w-1/2">Add</Button>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={editModel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit User</AlertDialogTitle>
            <AlertDialogDescription>
              <form onSubmit={handleEdit}>
                <div className="flex flex-col gap-4">
                  <Label>Name</Label>
                  <Input ref={editNameRef} defaultValue={selectedUser?.name} required />

                  <Label>Email</Label>
                  <Input ref={editEmailRef} defaultValue={selectedUser?.email} required />

                  <Label>Password</Label>
                  <Input ref={editPasswordRef} type="password" defaultValue={selectedUser?.password} required />

                  <Label>Street</Label>
                  <Input ref={editStreetRef} defaultValue={selectedUser?.street} />

                  <Label>City</Label>
                  <Input ref={editCityRef} defaultValue={selectedUser?.city} />

                  <Label>Zip</Label>
                  <Input ref={editZipRef} defaultValue={selectedUser?.zip} />

                  <Label>Role</Label>
                  <Select value={editRole} onValueChange={(val: "ADMIN" | "USER") => setEditRole(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="button" className="bg-red-600 w-1/2" onClick={() => showEditModel(false)}>Cancel</Button>
                  <Button type="submit" className="bg-green-600 w-1/2">Update</Button>
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