"use client";

import { baseURL } from "@/lib/api/baseUrl";
import {
  Avatar,
  Button,
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);

    const res = await fetch(`${baseURL}/api/admin/users`);

    const data = await res.json();

    setUsers(data);

    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Change Role
  const handleRole = async (id, role) => {
    const res = await fetch(`${baseURL}/api/admin/users/role/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Role Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      loadUsers();
    }
  };

  // Block User
  const handleBlock = async (id, isBlocked) => {
    const res = await fetch(`${baseURL}/api/admin/users/block/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        isBlocked: !isBlocked,
      }),
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: isBlocked ? "User Unblocked" : "User Blocked",
        timer: 1500,
        showConfirmButton: false,
      });

      loadUsers();
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        All Users
      </h1>

      <Table
        aria-label="Users Table"
        removeWrapper
        classNames={{
          wrapper:
            "bg-slate-900 border border-slate-700 rounded-xl p-4",
        }}
      >
        <TableHeader>
          <TableColumn>USER</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>

        <TableBody items={users}>
          {(user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar src={user.image} />

                  <span>{user.name}</span>
                </div>
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>
                <Chip color="primary" variant="flat">
                  {user.role || "tenant"}
                </Chip>
              </TableCell>

              <TableCell>
                <Chip
                  color={user.isBlocked ? "danger" : "success"}
                  variant="flat"
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </Chip>
              </TableCell>

              <TableCell>
                <div className="flex gap-2 flex-wrap">

                  <Button
                    size="sm"
                    color="primary"
                    onPress={() =>
                      handleRole(
                        user._id,
                        user.role === "tenant"
                          ? "owner"
                          : user.role === "owner"
                          ? "admin"
                          : "tenant"
                      )
                    }
                  >
                    Change Role
                  </Button>

                  <Button
                    size="sm"
                    color={user.isBlocked ? "success" : "danger"}
                    onPress={() =>
                      handleBlock(user._id, user.isBlocked)
                    }
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Button>

                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}