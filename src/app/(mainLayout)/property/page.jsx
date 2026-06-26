import { Suspense } from "react";
import { Card } from "@heroui/react";
import FilterPanel from "@/components/FilterPanel";
import PropertyCard from "@/components/PropertyCard";
import { fetchEvents } from "@/lib/api/property/data";

export default async function BrowsePropertiesPage({ searchParams }) {
    // ১. সার্চ প্যারামিটারগুলো রিসিভ করা (অ্যাসিঙ্ক হ্যান্ডলিং)
    const sParams = await searchParams;
    // console.log(sParams);
    const location = sParams.location || "";
    const propertyType = sParams.propertyType || "";
    const sort = sParams.sort || "";

    // console.log(location , propertyType , sort);

    // ২. URLSearchParams অবজেক্ট তৈরি করে ব্যাকএন্ড API-তে পাঠানো
    const params = new URLSearchParams();
    if (location) {
        params.set("location", location);
    }
    if (propertyType) {
        params.set("propertyType", propertyType);
    }
    if (sort) {
        params.set("sort", sort);
    }

    const properties = await fetchEvents(params);

    return (
        <div className="min-h-screen bg-slate-50/50 py-16 px-6 max-w-7xl mx-auto w-full space-y-12">

            {/* HEADER - লাক্সারি লাইট থিম টেক্সট */}
            <div className="text-center md:text-left space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                    Browse Premium Properties
                </h1>
                <p className="text-slate-500 text-sm max-w-xl font-medium">
                    Search, filter, and discover state-of-the-art rentals. Secure booking guarantees your perfect home.
                </p>
            </div>

            {/* Interactive client-side filters */}
            <Suspense key={params.toString()} fallback={<div className="h-24 w-full bg-white border border-slate-100 animate-pulse rounded-2xl" />}>
                <FilterPanel />
            </Suspense>

            {/* Properties Grid Component wrapped in Suspense with Soft Light Loader */}
            <Suspense
                key={`list-${params.toString()}`}
                fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array(6).fill(0).map((_, i) => (
                            <Card key={i} className="bg-white border border-slate-100 p-0 space-y-4 animate-pulse rounded-xl h-[420px] overflow-hidden">
                                <div className="h-56 bg-slate-200 w-full" />
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-slate-200 w-1/3 rounded-lg" />
                                    <div className="h-6 bg-slate-200 w-3/4 rounded-lg" />
                                    <div className="h-4 bg-slate-200 w-1/2 rounded-lg" />
                                </div>
                            </Card>
                        ))}
                    </div>
                }
            >
                {properties && properties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((item) => (
                            // 🔥 ফিক্স: এখানে property={item} পাস করা হয়েছে, যার ফলে undefined এররটি দূর হবে
                            <PropertyCard key={item._id} property={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl">
                        <h3 className="text-lg font-bold text-slate-700">No Properties Found</h3>
                        <p className="text-slate-400 text-sm mt-1">Try changing your search location or filters.</p>
                    </div>
                )}
            </Suspense>
        </div>
    );
}