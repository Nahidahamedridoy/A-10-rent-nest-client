"use client";

import DashboardHeading from "@/components/DashboardHeading";
import { myProperties } from "@/lib/api/properties/data"; // আপনার API ডেটা পাথ
import { useSession } from "@/lib/auth-client";
import { Table, Button, Chip, Spinner, Pagination } from '@heroui/react'; // নির্দিষ্ট অ্যানাটমি অনুযায়ী শুধু Table ইম্পোর্ট
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuPencil, LuTrash2, LuEye } from "react-icons/lu";

export default function MyProperties() {
  const { data: session } = useSession();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // ব্যাকএন্ড ফিল্টারিং ও পেজিনেশনের জন্য স্টেট
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ডাটাবেজ থেকে ওনারের প্রপার্টি লোড করার ফাংশন
  const loadProperties = async () => {
    if (session?.user?.email) {
      setLoading(true);
      try {
        // ব্যাকএন্ডে পেজ নাম্বার পাস করা (ধরে নিচ্ছি আপনার API কারেন্ট পেজ রিসিভ করে)
        const res = await myProperties(session?.user?.email, page);
        
        if (res && Array.isArray(res.data)) {
          setProperties(res.data);
          setTotalPages(res.totalPages || 1);
        } else if (Array.isArray(res)) {
          // যদি এপিআই সরাসরি অ্যারে রিটার্ন করে (ক্লায়েন্ট সাইড পেজিনেশনের জন্য)
          setProperties(res);
        } else if (res) {
          setProperties([res]);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadProperties();
  }, [session, page]); // পেজ চেঞ্জ হলে ব্যাকএন্ড থেকে ডেটা আবার রি-ফেচ হবে

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        setProperties((prev) => prev.filter((item) => item._id !== id));
        toast.success("Property deleted successfully!");
        // আপনার ডিলিট সার্ভার অ্যাকশন: await deleteProperty(id);
      } catch (error) {
        toast.error("Something went wrong.");
        loadProperties();
      }
    }
  };

  // রিজেকশন ফিডব্যাক দেখার হ্যান্ডলার (👁️ বাটন লজিক)
  const handleViewFeedback = (feedback) => {
    if (feedback) {
      alert(`Admin Rejection Feedback: ${feedback}`);
    } else {
      toast.error("No feedback available.");
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeading
        title="My Properties"
        description="View and manage all your listed properties, status, and perform actions."
      />

      <div className="mt-6 border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <Spinner size="lg" color="secondary" />
          </div>
        ) : (
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="My Properties List Table">
                
                {/* টেবিল হেডার */}
                <Table.Header>
                  <Table.Column>Title</Table.Column>
                  <Table.Column>Location</Table.Column>
                  <Table.Column>Price</Table.Column>
                  <Table.Column>Type</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column className="text-center">Actions</Table.Column>
                </Table.Header>
                
                {/* টেবিল বডি */}
                <Table.Body>
                  {properties.map((item) => (
                    <Table.Row key={item._id || item.title} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150">
                      
                      {/* Title */}
                      <Table.Cell className="font-semibold text-white py-4">
                        {item.title}
                      </Table.Cell>

                      {/* Location */}
                      <Table.Cell className="text-slate-300 py-4">
                        {item.location}
                      </Table.Cell>

                      {/* Price */}
                      <Table.Cell className="font-bold text-green-400 py-4">
                        ${item.price}
                      </Table.Cell>

                      {/* Type */}
                      <Table.Cell className="capitalize text-slate-400 py-4">
                        {item.propertyType || item.type || "Apartment"}
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell className="py-4">
                        <div className="flex items-center gap-2">
                          <Chip
                            size="sm"
                            variant="flat"
                            className={`font-bold uppercase text-[10px] tracking-wider ${
                              item.status?.toLowerCase() === "approved"
                                ? "bg-green-500/10 text-green-400"
                                : item.status?.toLowerCase() === "rejected"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {item.status || "PENDING"}
                          </Chip>

                          {/* রিজেক্টেড হলে আই বাটন শো করবে */}
                          {item.status?.toLowerCase() === "rejected" && (
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              className="text-slate-400 hover:text-white min-w-0 h-6 w-6"
                              onClick={() => handleViewFeedback(item.rejectionFeedback)}
                              title="View Reason"
                            >
                              <LuEye size={14} />
                            </Button>
                          )}
                        </div>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="py-4">
                        <div className="flex items-center justify-center gap-3">
                          {/* Edit Button */}
                          <Button 
                            isIconOnly
                            size="sm"
                            variant="flat"
                            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg h-8 w-8 min-w-0 gap-5"
                            onClick={() => window.location.href = `/dashboard/update-property/${item._id}`}
                            title="Edit Listing"
                          >
                            
                            A
                          </Button>

                          {/* Delete Button */}
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg h-8 w-8 min-w-0"
                            onClick={() => handleDelete(item._id)}
                            title="Delete Listing"
                          >
                            {/* <LuTrash2 size={14} /> */}
                            R
                          </Button>
                        </div>
                      </Table.Cell>

                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>

            {/* টেবিল ফুটার - পেজিনেশন কন্ট্রোল */}
            {totalPages > 1 && (
              <Table.Footer>
                <div className="flex w-full justify-center py-2 border-t border-white/5 mt-4">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={totalPages}
                    onChange={(newPage) => setPage(newPage)}
                  />
                </div>
              </Table.Footer>
            )}
          </Table>
        )}
      </div>
    </div>
  );
}