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
            startContent={<FaHeart className="transition-transform group-hover:scale-125" />}
            onClick={handleFavorite}
            className="group w-full mt-10 border-2 font-medium tracking-wide rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
        >
            Add to Favorites
        </Button>
    );
}