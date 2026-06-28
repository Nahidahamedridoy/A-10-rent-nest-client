"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Button, Card } from "@heroui/react";
import { FaTrash, FaEye, FaMapMarkerAlt } from "react-icons/fa";

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

            setFavorites(data);
            setLoading(false);
        };

        loadFavorites();
    }, [user]);

    const handleRemove = async (id) => {
        const result = await Swal.fire({
            title: "Remove Favorite?",
            text: "This property will be removed from your favorites.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Remove",
        });

        if (!result.isConfirmed) return;

        const data = await removeFavorite(id);

        if (data.deletedCount > 0) {
            toast.success("Favorite Removed");

            setFavorites((prev) =>
                prev.filter((item) => item._id !== id)
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">
                My Favorites
            </h1>

            {favorites.length === 0 ? (
                <Card className="p-10 text-center">
                    <p className="text-gray-500">
                        No favorite properties found.
                    </p>
                </Card>
            ) : (
                favorites.map((item) => (
                    <Card
                        key={item._id}
                        className="p-5 border shadow-sm"
                    >
                        <div className="grid lg:grid-cols-4 gap-6 items-center">

                            {/* Image */}
                            <div className="relative w-full h-52 rounded-xl overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.propertyTitle}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Details */}
                            <div className="lg:col-span-2 space-y-3">
                                <h2 className="text-2xl font-bold">
                                    {item.propertyTitle}
                                </h2>

                                <p className="flex items-center gap-2 text-gray-500">
                                    <FaMapMarkerAlt />
                                    {item.location}
                                </p>

                                <p className="text-xl font-bold text-indigo-600">
                                    ${item.price}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">

                                <Link
                                    href={`/property/${item.propertyId}`}
                                >
                                    <Button
                                        color="primary"
                                        className="w-full"
                                        startContent={<FaEye />}
                                    >
                                        View Details
                                    </Button>
                                </Link>

                                <Button
                                    color="danger"
                                    variant="flat"
                                    startContent={<FaTrash />}
                                    onClick={() =>
                                        handleRemove(item._id)
                                    }
                                >
                                    Remove
                                </Button>

                            </div>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
}