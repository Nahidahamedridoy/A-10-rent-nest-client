import { baseURL } from "../baseUrl";

// Add Favorite
export const addFavorite = async (favoriteData) => {
    const res = await fetch(`${baseURL}/api/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteData),
    });

    return await res.json();
};

// Get My Favorites
export const getFavorites = async (email) => {
    const res = await fetch(`${baseURL}/api/favorites/${email}`);
    return await res.json();
};

// Remove Favorite
export const removeFavorite = async (id) => {
    const res = await fetch(`${baseURL}/api/favorites/${id}`, {
        method: "DELETE",
    });

    return await res.json();
};