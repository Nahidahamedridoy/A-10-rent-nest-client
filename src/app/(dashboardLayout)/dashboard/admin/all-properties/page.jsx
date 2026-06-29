"use client";

import { baseURL } from "@/lib/api/baseUrl";
import { useEffect, useState } from "react";

import { Button, Chip } from "@heroui/react";

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = () => {
    fetch(`${baseURL}/api/admin/property`)
      .then((res) => res.json())
      .then((data) => setProperties(data));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleApprove = async (id) => {
    await fetch(`${baseURL}/api/admin/property/approve/${id}`, {
      method: "PATCH",
    });
    fetchProperties();
  };

  const handleReject = async (id) => {
    const reason = prompt("Rejection reason:");
    if (!reason) return;

    await fetch(`${baseURL}/api/admin/property/reject/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });

    fetchProperties();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete?")) return;

    await fetch(`${baseURL}/api/admin/property/${id}`, {
      method: "DELETE",
    });

    fetchProperties();
  };

  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6">
        All Properties ({properties.length})
      </h1>

      {/* 🔥 SIMPLE SAFE TABLE (NO HEROUI TABLE) */}
      <div className="overflow-x-auto">
        <table className="w-full border border-white/10 rounded-lg">
          <thead className="bg-slate-900 text-gray-300">
            <tr>
              <th className="p-3">IMAGE</th>
              <th className="p-3">TITLE</th>
              <th className="p-3">OWNER</th>
              <th className="p-3">LOCATION</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="border-t border-white/10">

                <td className="p-3">
                  <img
                    src={property.image}
                    className="w-20 h-14 rounded-lg object-cover"
                  />
                </td>

                <td className="p-3">
                  <p className="text-sky-400 font-semibold">
                    {property.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {property.propertyType}
                  </p>
                </td>

                <td className="p-3">
                  <p>{property.ownerInfo?.name}</p>
                  <p className="text-xs text-gray-400">
                    {property.ownerInfo?.email}
                  </p>
                </td>

                <td className="p-3">{property.location}</td>

                <td className="p-3">
                  <Chip
                    size="sm"
                    color={
                      property.status === "approved"
                        ? "success"
                        : property.status === "pending"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {property.status}
                  </Chip>
                </td>

                <td className="p-3">
                  <div className="flex gap-2">

                    <Button
                      size="sm"
                      color="success"
                      variant="flat"
                      onClick={() => handleApprove(property._id)}
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      color="warning"
                      variant="flat"
                      onClick={() => handleReject(property._id)}
                    >
                      Reject
                    </Button>

                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onClick={() => handleDelete(property._id)}
                    >
                      Delete
                    </Button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPropertiesPage;