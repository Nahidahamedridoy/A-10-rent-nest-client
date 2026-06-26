
import DashboardHeading from "@/components/DashboardHeading";
import MyPropertiesClient from "./MyPropertiesClient";

import { myBookings } from "@/lib/api/property/data";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const MyProperties = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const property = await myBookings(session?.user?.email)


    return (
        <div>
            <DashboardHeading
                title="My Properties"
                description="View and manage all your listed properties."
            />
            <Suspense fallback={<Spinner />} >
                <MyPropertiesClient properties={property} />
            </Suspense>
        </div>
    );
};

export default MyProperties;