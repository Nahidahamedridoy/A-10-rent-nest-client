"use client";

import { baseURL } from "@/lib/api/baseUrl";
import { useEffect, useState } from "react";
import { Button, Chip } from "@heroui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);

  const fetchProperties = async (currentPage = page) => {
    const url = `${baseURL}/api/admin/property?page=${currentPage}&limit=6`;

    console.log("URL:", url);

    const res = await fetch(url);

    console.log("Status:", res.status);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    console.log("DATA:", data);

    setProperties(data.properties || []);
    setTotalPages(data.totalPages || 1);
    setTotalProperties(data.totalProperties || 0);
  };

  useEffect(() => {
    fetchProperties(page);
  }, [page]);

  const handleApprove = async (id) => {
    await fetch(`${baseURL}/api/admin/property/approve/${id}`, {
      method: "PATCH",
    });

    fetchProperties(page);
  };

  const handleReject = async (id) => {
    const reason = prompt("Rejection reason:");
    if (!reason) return;

    await fetch(`${baseURL}api/admin/property?page=${currentPage}&limit=6`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason }),
    });

    fetchProperties(page);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete?")) return;

    await fetch(`${baseURL}/api/admin/property/${id}`, {
      method: "DELETE",
    });

    if (properties.length === 1 && page > 1) {
      setPage((prev) => prev - 1);
    } else {
      fetchProperties(page);
    }
  };

  console.log("properties state:", properties);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        All Properties ({totalProperties})
      </h1>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full">
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
              <tr
                key={property._id}
                className="border-t border-white/10"
              >
                <td className="p-3">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-20 h-14 rounded-lg object-cover"
                  />
                </td>

                <td className="p-3">
                  <p className="font-semibold text-sky-500">
                    {property.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {property.propertyType}
                  </p>
                </td>

                <td className="p-3">
                  <p>{property.ownerInfo?.name}</p>
                  <p className="text-xs text-gray-500">
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
                  <div className="flex gap-2 flex-wrap">
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

      {/* Pagination */}

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">

        <p className="text-sm text-gray-500">
          Page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </p>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-sky-600 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaAngleLeft />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-10 h-10 rounded-lg font-semibold transition ${page === index + 1
                ? "bg-sky-600 text-white"
                : "border border-gray-300 hover:bg-sky-100"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-sky-600 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaAngleRight />
          </button>

        </div>
      </div>
    </div>
  );
};

export default AllPropertiesPage;