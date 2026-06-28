"use client";

import { Button } from "@heroui/react";
import { FaHeart } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addFavorite } from "@/lib/api/favorite/actions";

export default function AddToFavoriteButton({
    user,
    propertyId,
    title,
    location,
    price,
    image,
    ownerEmail,
}) {
    const router = useRouter();

    const handleFavorite = async () => {
        if (!user) {
            toast.error("Please login first");
            router.push("/login");
            // redirect("/property")
            return;
        }

        const favoriteData = {
            propertyId,
            tenantEmail: user.email,
            tenantName: user.name,
            propertyTitle: title,
            location,
            price,
            image,
            ownerEmail,
        };

        const result = await addFavorite(favoriteData);

        if (result.insertedId) {
            toast.success("Added to Favorites");
        } else {
            toast.error(result.message || "Already Added");
        }
    };

    return (
        <Button
            color="danger"
            variant="ghost"
            startContent={<FaHeart />}
            onClick={handleFavorite}
            className="w-full mt-10"
        >
            Add to Favorites
        </Button>
    );
}