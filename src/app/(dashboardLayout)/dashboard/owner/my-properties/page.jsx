"use client";

import DashboardHeading from "@/components/DashboardHeading";
import DeletePropertyModal from "@/components/DeletePropertyModal";
import EditPropertyModal from "@/components/EditPropertyModal";
import { myProperties } from "@/lib/api/properties/data";
import { useSession } from "@/lib/auth-client";
import { Button, Card, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableContent, TableHeader, TableRow } from "@heroui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuPencil, LuTrash2, LuEye } from "react-icons/lu";

const MyProperties = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deletedId, setDeletedId] = useState(null);

    const { data: session } = useSession();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadProperties = async () => {
        if (session?.user?.email) {
            setLoading(true);
            try {
                const data = await myProperties(session.user.email);
                setProperties(
                    Array.isArray(data) ? data : data ? [data] : []
                );
            } catch (error) {
                console.error(error);
                toast.error("Failed to load properties");
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadProperties();
    }, [session]);

    const handleViewFeedback = (feedback) => {
        if (feedback) {
            alert(`Admin Feedback: ${feedback}`);
        } else {
            toast.error("No feedback available");
        }
    };

    return (
        <div>
            <DashboardHeading
                title="My Properties"
                description="View and manage all your listed properties."
            />

            <div className="mt-6">
                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
                    <div className="p-0 overflow-x-auto">
                        {loading ? (
                            <div className="py-20 flex items-center justify-center">
                                <Spinner size="lg" color="secondary" />
                            </div>
                        ) : (
                            <Table aria-label="My Properties Table">
                                <TableContent>
                                    <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                                        <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20" isRowHeader>TITLE</TableColumn>
                                        <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">LOCATION</TableColumn>
                                        <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">PRICE</TableColumn>
                                        <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">TYPE</TableColumn>
                                        <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">STATUS</TableColumn>
                                        <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">ACTIONS</TableColumn>
                                    </TableHeader>
                                    <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No properties listed yet.</p>}>
                                        {properties?.map((item) => (
                                            <TableRow key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0">
                                                <TableCell className="py-4 px-6 align-middle font-bold text-white">
                                                    <span className="line-clamp-1 truncate max-w-[150px]">{item.title}</span>
                                                </TableCell>
                                                <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">{item.location}</TableCell>
                                                <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">${item.rentPrice}</TableCell>
                                                <TableCell className="py-4 px-6 align-middle text-slate-400 capitalize">{item.propertyType || item.type || "Apartment"}</TableCell>
                                                <TableCell className="py-4 px-6 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <Chip
                                                            size="sm"
                                                            variant="flat"
                                                            className={`font-bold uppercase text-[10px] tracking-wider ${item.status?.toLowerCase() === "approved"
                                                                ? "bg-green-500/10 text-green-400"
                                                                : item.status?.toLowerCase() === "rejected"
                                                                    ? "bg-red-500/10 text-red-400"
                                                                    : "bg-yellow-500/10 text-yellow-400"
                                                                }`}
                                                        >
                                                            {item.status || "PENDING"}
                                                        </Chip>

                                                        {item.status?.toLowerCase() === "rejected" && (
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="light"
                                                                className="text-slate-400 hover:text-white min-w-0 h-6 w-6"
                                                                onClick={() => handleViewFeedback(item.rejectionFeedback)}
                                                            >
                                                                <LuEye size={14} />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 px-6 align-middle">
                                                    <div className="flex gap-2">
                                                        <div className="group relative flex items-center justify-center w-fit">
                                                            <Button 
                                                                isIconOnly 
                                                                size="sm" 
                                                                radius="full" 
                                                                className="h-8 w-8 min-w-0 p-0 border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:scale-[1.03] transition-all duration-200" 
                                                                onPress={() => { setEditingProperty({ ...item }); setIsModalOpen(true); }}
                                                            >
                                                                <LuPencil size={12} />
                                                            </Button>
                                                            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transition-all duration-150 rounded-lg bg-slate-950 border border-white/10 px-2 py-1 text-[10px] text-white group-hover:scale-100 font-semibold z-30 whitespace-nowrap shadow-xl">Edit Property</span>
                                                        </div>
                                                        <div className="group relative flex items-center justify-center w-fit">
                                                            <Button 
                                                                isIconOnly 
                                                                size="sm" 
                                                                radius="full" 
                                                                className="h-8 w-8 min-w-0 p-0 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-[1.03] transition-all duration-200" 
                                                                onPress={() => {
                                                                    setDeletedId(item._id);
                                                                    setIsDeleteOpen(true);
                                                                }}
                                                            >
                                                                <LuTrash2 size={12} />
                                                            </Button>
                                                            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transition-all duration-150 rounded-lg bg-slate-950 border border-white/10 px-2 py-1 text-[10px] text-white group-hover:scale-100 font-semibold z-30 whitespace-nowrap shadow-xl">Delete Property</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </TableContent>
                            </Table>
                        )}
                    </div>
                </Card>
            </div>

            <EditPropertyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editingProperty={editingProperty} />
            <DeletePropertyModal isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} id={deletedId} />
        </div>
    );
};

export default MyProperties;