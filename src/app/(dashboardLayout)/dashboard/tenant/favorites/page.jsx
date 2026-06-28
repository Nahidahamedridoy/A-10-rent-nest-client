import FavoritesTable from "@/components/FavoritesTable";
import { getUser } from "@/lib/api/session";

export default async function FavoritesPage() {
    const user = await getUser();

    return (<div>

        <FavoritesTable user={user} />
    </div>
);
}