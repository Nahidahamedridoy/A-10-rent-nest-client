import Link from "next/link";
import { Button } from "@heroui/react";
import { FaArrowLeft, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCheckCircle, FaUser } from "react-icons/fa";
import { baseURL } from "@/lib/api/baseUrl";
import BookingWidget from "@/components/BookingWidget";
import AddToFavoriteButton from "@/components/AddToFavoriteButton";
import { getUser } from "@/lib/api/session";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const fetchProperty = async (id) => {

    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${baseURL}/api/single-property/${id}` ,{
        headers:{
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export default async function PropertyDetailsPage({ params }) {
     const user = await getUser();
    const { id } = await params;
    const property = await fetchProperty(id);

    const {
        _id,
        title,
        description,
        location,
        propertyType,
        price,
        rentPrice,     
        rentType,
        bedrooms,
        bathrooms,
        size,
        propertySize,
        amenities,
        extraFeatures,
        status,
        ownerInfo,
        image,         
        images
    } = property || {};

    let displayBanner = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6";

    if (image && typeof image === 'string' && image.trim() !== '') {
        displayBanner = image;
    } else if (images) {
        if (typeof images === 'string' && images.trim() !== '') {
            displayBanner = images;
        } else if (Array.isArray(images) && images.length > 0) {
            displayBanner = typeof images[0] === 'object' ? images[0].url : images[0];
        }
    }

    // ভ্যালু অ্যাসাইনমেন্ট সিঙ্ক (ডাটাবেজ এবং উইজেট দুটোর জন্যই)
    const finalPrice = rentPrice || price || 0;
    const finalSize = propertySize || size || 0;

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-6 max-w-6xl mx-auto w-full space-y-10">

            {/* Back Button */}
            <Link href="/property">
                <Button
                    variant="light"
                    className="text-slate-600 hover:text-slate-900 font-medium"
                    startContent={<FaArrowLeft />}
                >
                    Back to Properties
                </Button>
            </Link>

            {/* 📸 ব্যানার ইমেজ সেকশন */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-200">
                {displayBanner ? (
                    <img
                        src={displayBanner}
                        alt={title || "Property Banner"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image Available</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-1" />

                <span className="absolute top-6 left-6 bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg z-10">
                    {propertyType || "Property"}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                {/* Left Column: Details & Description */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Title & Location Header */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl capitalize">
                                {title || "Property Title"}
                            </h1>
                            {status && (
                                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${status === "active" || status === "Approved"
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : "bg-amber-50 text-amber-600 border-amber-200"
                                    }`}>
                                    {status}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-rose-500" />
                                <span>{location || "Location not specified"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <FaBed className="text-indigo-600 text-xl mb-1" />
                            <span className="text-slate-900 font-bold text-base">{bedrooms || 0}</span>
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Bedrooms</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <FaBath className="text-indigo-600 text-xl mb-1" />
                            <span className="text-slate-900 font-bold text-base">{bathrooms || 0}</span>
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Bathrooms</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <FaRulerCombined className="text-indigo-600 text-lg mb-1" />
                            <span className="text-slate-900 font-bold text-base">{finalSize}</span>
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Sq. Ft.</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">About this Property</h2>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                            {description || "No description provided for this property listing."}
                        </p>
                    </div>

                    {/* Amenities & Extra Features Segment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-base font-bold text-slate-900">Amenities</h3>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {Array.isArray(amenities) ? (
                                    amenities.map((item, index) => (
                                        <span key={index} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-md border border-slate-200">
                                            {item}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-slate-600 text-sm">{amenities || "Standard facilities included."}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-base font-bold text-slate-900">Extra Features</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {extraFeatures || "No extra features listed."}
                            </p>
                        </div>
                    </div>

                    {/* Landlord Info */}
                    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                                <FaUser size={16} />
                            </div>
                            <div>
                                <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Property Owner</h4>
                                <span className="text-slate-800 font-bold text-sm">
                                    {ownerInfo?.name || ownerInfo?.email || "Verified Landlord"}
                                </span>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                            <FaCheckCircle size={12} /> Verified
                        </span>
                    </div>

                </div>

                {/* Right Column: Booking Widget */}
                <div className="lg:sticky lg:top-6 space-y-6">
                    <BookingWidget
                        rentPrice={finalPrice}
                        rentType={rentType || "Monthly"}
                        propertyId={_id}
                        propertyTitle={title}
                    />

                    {/* add to favorites */}
                    <AddToFavoriteButton
                        user={user}
                        propertyId={_id}
                        title={title}
                        location={location}
                        price={finalPrice}
                        image={displayBanner}
                        ownerEmail={ownerInfo?.email}
                    />

                </div>

            </div>
        </div>
    );
}