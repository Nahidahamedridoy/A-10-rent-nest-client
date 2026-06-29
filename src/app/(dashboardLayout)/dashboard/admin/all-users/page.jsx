"use client";

import { useEffect, useState } from "react";
import { baseURL } from "@/lib/api/baseUrl";
import {
  Avatar,
  Button,
  Chip,
  Spinner,
} from "@heroui/react";
import Swal from "sweetalert2";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ===========================
  // Load Users
  // ===========================
  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${baseURL}/api/admin/users`);
      const data = await res.json();

      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);


  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  //change role

  const handleRole = async (id, role) => {
    const confirm = await Swal.fire({
      title: "Change Role?",
      text: `Make this user ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `${baseURL}/api/admin/users/role/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );

    const data = await res.json();

    console.log("Status:", res.status);
    console.log("Response:", data);


    if (data.modifiedCount > 0 || data.success) {
      Swal.fire({
        icon: "success",
        title: "Role Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      loadUsers();
    }
  };


  // Block / Unblock

  const handleBlock = async (id, isBlocked) => {
    const confirm = await Swal.fire({
      title: isBlocked
        ? "Unblock User?"
        : "Block User?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `${baseURL}/api/admin/users/block/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          isBlocked: !isBlocked,
        }),
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0 || data.success) {
      Swal.fire({
        icon: "success",
        title: isBlocked
          ? "User Unblocked"
          : "User Blocked",
        timer: 1500,
        showConfirmButton: false,
      });

      loadUsers();
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 ">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-sky-500">
            All Users
          </h1>

          <p className="text-slate-400 mt-1">
            Total Users: {filteredUsers.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none w-full md:w-80"
        />

      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-800">
            <tr className="text-slate-400 uppercase text-xs">
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-center">Role</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Change Role</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-slate-400"
                >
                  No Users Found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  {/* USER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.image}
                        name={user.name}
                        size="md"
                      />

                      <div>
                        <h2 className="font-semibold text-white">
                          {user.name}
                        </h2>

                        <p className="text-xs text-slate-500">
                          ID:
                          {user._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-slate-300">
                    {user.email}
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4 text-center">
                    <Chip
                      variant="flat"
                      color={
                        user.role === "admin"
                          ? "danger"
                          : user.role === "owner"
                            ? "warning"
                            : "primary"
                      }
                    >
                      {user.role}
                    </Chip>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4 text-center">
                    <Chip
                      variant="flat"
                      color={
                        user.isBlocked
                          ? "danger"
                          : "success"
                      }
                    >
                      {user.isBlocked
                        ? "Blocked"
                        : "Active"}
                    </Chip>
                  </td>

                  {/* CHANGE ROLE */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2 justify-center">

                      <Button
                        size="sm"
                        color="primary"
                        variant={user.role === "tenant" ? "solid" : "flat"}
                        onPress={() => handleRole(user._id, "tenant")}
                      >
                        Tenant
                      </Button>

                      <Button
                        size="sm"
                        color="warning"
                        variant={user.role === "owner" ? "solid" : "flat"}
                        onPress={() => handleRole(user._id, "owner")}
                      >
                        Owner
                      </Button>

                      <Button
                        size="sm"
                        color="secondary"
                        variant={user.role === "admin" ? "solid" : "flat"}
                        onPress={() => handleRole(user._id, "admin")}
                      >
                        Admin
                      </Button>

                    </div>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 text-center">
                    <Button
                      size="sm"
                      color={
                        user.isBlocked
                          ? "success"
                          : "danger"
                      }
                      variant="flat"
                      onPress={() =>
                        handleBlock(
                          user._id,
                          user.isBlocked
                        )
                      }
                    >
                      {user.isBlocked
                        ? "Unblock"
                        : "Block"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}