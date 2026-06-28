"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import {
    Card,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Spinner,
} from "@heroui/react";

import { FaEye, FaTrash } from "react-icons/fa";

import {
    getFavorites,
    removeFavorite,
} from "@/lib/api/favorite/actions";

export default function FavoritesTable({ user }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            if (!user?.email) return;

            const data = await getFavorites(user.email);
            setFavorites(data || []);
            setLoading(false);
        };

        loadFavorites();
    }, [user]);

    const handleRemove = async (id) => {
        if (!confirm("Are you sure you want to remove this property?")) return;

        const data = await removeFavorite(id);

        // ডাটাবেজ রেসপন্স অনুযায়ী dynamic validation
        if (data?.deletedCount > 0 || data?.success) {
            toast.success("Removed Successfully");
            setFavorites((prev) => prev.filter((item) => item._id !== id));
        } else {
            toast.error("Failed to remove favorite");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Spinner size="lg" color="pink" />
            </div>
        );
    }

    return (
        <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl w-full">
            
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                    My Favorites
                </h2>
                <span className="text-sm text-gray-400 font-semibold bg-slate-950/40 px-3 py-1 rounded-xl border border-white/5">
                    Total: {favorites.length}
                </span>
            </div>

            <div className="p-0 overflow-x-auto">
                <Table aria-label="Favorites Table" removeWrapper>
                    <Table.ScrollContainer>
                        <Table.Content>
                            
                            <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">IMAGE</TableColumn>
                                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20" isRowHeader>TITLE</TableColumn>
                                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">LOCATION</TableColumn>
                                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">PRICE</TableColumn>
                                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20 text-center">ACTIONS</TableColumn>
                            </TableHeader>

                            <TableBody
                                emptyContent={
                                    <div className="py-12 text-center text-gray-400 font-medium">
                                        No favorite properties found.
                                    </div>
                                }
                            >
                                {favorites.map((item) => (
                                    <TableRow 
                                        key={item._id} 
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0"
                                    >
                                        
                                        <TableCell className="py-4 px-6 align-middle">
                                            <img
                                                src={item.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"}
                                                alt={item.propertyTitle}
                                                className="w-24 h-16 rounded-lg object-cover border border-white/10 shadow-md"
                                            />
                                        </TableCell>

                                        {/* ২. টাইটেল ও আইডি */}
                                        <TableCell className="py-4 px-6 align-middle font-bold text-white">
                                            <div>
                                                <h3 className="font-bold text-sky-500 text-sm hover:text-pink-500 transition-colors">
                                                    {item.propertyTitle}
                                                </h3>
                                                {item.propertyId && (
                                                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                                                        ID: {item.propertyId.slice(-8)}
                                                    </p>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* ৩. লোকেশন */}
                                        <TableCell className="py-4 px-6 align-middle text-gray-300 font-medium">
                                            {item.location || "Location not specified"}
                                        </TableCell>

                                        {/* ৪. রেন্ট প্রাইস ফলব্যাক সহ */}
                                        <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">
                                            ${Number(item.rentPrice || item.price || 0).toFixed(2)}
                                            <span className="text-[10px] text-gray-400 font-normal"> / {item.rentType || "mo"}</span>
                                        </TableCell>

                                        {/* ৫. অ্যাকশন বাটনসমূহ */}
                                        <TableCell className="py-4 px-6 align-middle text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                
                                                <Link href={`/property/${item.propertyId}`}>
                                                    <Button
                                                        isIconOnly
                                                        color="primary"
                                                        variant="flat"
                                                        size="sm"
                                                        className="hover:bg-primary/20 rounded-lg text-indigo-400"
                                                    >
                                                        <FaEye size={14} />
                                                    </Button>
                                                </Link>

                                                <Button
                                                    isIconOnly
                                                    color="danger"
                                                    variant="flat"
                                                    size="sm"
                                                    onClick={() => handleRemove(item._id)}
                                                    className="hover:bg-danger/20 rounded-lg text-red-400"
                                                >
                                                    <FaTrash size={13} />
                                                </Button>

                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </Card>
    );
}