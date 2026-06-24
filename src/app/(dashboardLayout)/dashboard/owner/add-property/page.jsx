"use client";

import DashboardHeading from "@/components/DashboardHeading";
import { addProperty } from "@/lib/api/property/actions";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import {
    Button,
    Card,
    CardHeader,
    Input,
    TextArea,
    Form,
    Label,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

const AddPropertyPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const PROPERTY_TYPES = ["Apartment", "House", "Villa", "Cabin", "Studio", "Office"];
    const RENT_TYPES = ["Daily", "Weekly", "Monthly"];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // ইমেজ আপলোড হ্যান্ডলিং
            const imageFile = data.propertyImage[0];
            const imageUrl = await uploadImage(imageFile);

            // ফর্মের ফাইল অবজেক্ট ডিলিট করে টেক্সট URL বসানো
            delete data.propertyImage;

            // প্রজেক্ট রিকোয়ারমেন্ট অনুযায়ী অবজেক্ট তৈরি
            const finalPropertyData = {
                title: data.title,
                description: data.description,
                location: data.location,
                propertyType: data.propertyType,
                rentPrice: Number(data.rentPrice),
                rentType: data.rentType,
                bedrooms: Number(data.bedrooms),
                bathrooms: Number(data.bathrooms),
                propertySize: Number(data.propertySize),
                amenities: data.amenities,
                extraFeatures: data.extraFeatures,
                image: imageUrl,
                status: "Pending", // ডিফল্ট স্ট্যাটাস অবশ্যই Pending হতে হবে
                ownerInfo: {
                    name: session?.user?.name || "Unknown Owner",
                    email: session?.user?.email,
                },
            };

            const result = await addProperty(finalPropertyData);
            console.log(result , "result");

            if (result?.insertedId) {
                toast.success("Property submitted for admin approval!");
                // router.push("/dashboard/my-properties");
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add property.");
        }
    };

    return (
        <div className="pb-12">
            <DashboardHeading
                title="Add Property"
                description="List a new rental property on the marketplace"
            />

            <div className="mt-6 max-w-4xl">
                <Card
                    className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
                    radius="lg"
                >
                    <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
                        <h3 className="text-xl font-bold text-white">
                            Property Information
                        </h3>
                        <p className="text-slate-400 text-xs">
                            Fill out the details below. All fields except extra features are required.
                        </p>
                    </CardHeader>

                    <div className="p-6">
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5 w-full"
                        >
                            {/* Title + Image */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="title" className="text-white/80 text-sm mb-1 block">Property Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g. Luxury 3BHK Apartment"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                        {...register("title", {
                                            required: "Property title is required",
                                        })}
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="propertyImage" className="text-white/80 text-sm mb-1 block">Property Image</Label>
                                    <Input
                                        type="url"
                                        accept="image/*"
                                        id="propertyImage"
                                        startContent={<FaImage className="text-slate-400 text-sm mr-1" />}
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                        {...register("propertyImage", { required: "Property image is required" })}
                                    />
                                    {errors.propertyImage && (
                                        <p className="text-red-500 text-xs mt-1">{errors.propertyImage.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Location + Property Type + Rent Type */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="location" className="text-white/80 text-sm mb-1 block">Location / Address</Label>
                                    <Input
                                        id="location"
                                        placeholder="e.g. Gulshan, Dhaka"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                        {...register("location", { required: "Location is required" })}
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="propertyType" className="text-white/80 text-sm mb-1 block">Property Type</Label>
                                    <select
                                        id="propertyType"
                                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 h-[42px] text-sm focus:outline-none focus:border-blue-500"
                                        {...register("propertyType", { required: "Property type is required" })}
                                    >
                                        <option value="" className="bg-slate-950">Select Type</option>
                                        {PROPERTY_TYPES.map(type => (
                                            <option key={type} value={type} className="bg-slate-950">{type}</option>
                                        ))}
                                    </select>
                                    {errors.propertyType && (
                                        <p className="text-red-500 text-xs mt-1">{errors.propertyType.message}</p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="rentType" className="text-white/80 text-sm mb-1 block">Rent Type</Label>
                                    <select
                                        id="rentType"
                                        className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 h-[42px] text-sm focus:outline-none focus:border-blue-500"
                                        {...register("rentType", { required: "Rent type is required" })}
                                    >
                                        <option value="" className="bg-slate-950">Select Rent Type</option>
                                        {RENT_TYPES.map(type => (
                                            <option key={type} value={type} className="bg-slate-950">{type}</option>
                                        ))}
                                    </select>
                                    {errors.rentType && (
                                        <p className="text-red-500 text-xs mt-1">{errors.rentType.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Price + Bedrooms + Bathrooms + Size */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                <div>
                                    <Label htmlFor="rentPrice" className="text-white/80 text-sm mb-1 block">Rent Price ($)</Label>
                                    <Input
                                        id="rentPrice"
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                        {...register("rentPrice", {
                                            required: "Price is required",
                                            min: { value: 0, message: "Cannot be negative" },
                                        })}
                                    />
                                    {errors.rentPrice && (
                                        <p className="text-red-500 text-xs mt-1">{errors.rentPrice.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="bedrooms" className="text-white/80 text-sm mb-1 block">Bedrooms</Label>
                                    <Input
                                        id="bedrooms"
                                        type="number"
                                        placeholder="e.g. 3"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                        {...register("bedrooms", {
                                            required: "Bedrooms required",
                                            min: { value: 0, message: "Min value is 0" },
                                        })}
                                    />
                                    {errors.bedrooms && (
                                        <p className="text-red-500 text-xs mt-1">{errors.bedrooms.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="bathrooms" className="text-white/80 text-sm mb-1 block">Bathrooms</Label>
                                    <Input
                                        id="bathrooms"
                                        type="number"
                                        placeholder="e.g. 2"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                        {...register("bathrooms", {
                                            required: "Bathrooms required",
                                            min: { value: 0, message: "Min value is 0" },
                                        })}
                                    />
                                    {errors.bathrooms && (
                                        <p className="text-red-500 text-xs mt-1">{errors.bathrooms.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="propertySize" className="text-white/80 text-sm mb-1 block">Size (sq ft)</Label>
                                    <Input
                                        id="propertySize"
                                        type="number"
                                        placeholder="e.g. 1200"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                        {...register("propertySize", {
                                            required: "Size is required",
                                            min: { value: 1, message: "Must be at least 1 sq ft" },
                                        })}
                                    />
                                    {errors.propertySize && (
                                        <p className="text-red-500 text-xs mt-1">{errors.propertySize.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Amenities + Extra Features */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="amenities" className="text-white/80 text-sm mb-1 block">Amenities</Label>
                                    <Input
                                        id="amenities"
                                        placeholder="e.g. WiFi, Parking, Pool, Gym"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                        {...register("amenities", { required: "Amenities are required" })}
                                    />
                                    {errors.amenities && (
                                        <p className="text-red-500 text-xs mt-1">{errors.amenities.message}</p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="extraFeatures" className="text-white/80 text-sm mb-1 block">Extra Features (Optional)</Label>
                                    <Input
                                        id="extraFeatures"
                                        placeholder="e.g. Gas Pipeline, Lift, 24/7 Security"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                        {...register("extraFeatures")}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="w-full">
                                <Label htmlFor="description" className="text-white/80 text-sm mb-1 block">Detailed Description</Label>
                                <TextArea
                                    id="description"
                                    placeholder="Describe the property condition, nearby structures, security rules..."
                                    className="w-full bg-slate-900/50 border-white/10 hover:border-blue-500/50 focus-within:!border-blue-500"
                                    {...register("description", {
                                        required: "Description is required",
                                        minLength: {
                                            value: 20,
                                            message: "Description must be at least 20 characters long",
                                        },
                                    })}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-blue-500/10"
                                radius="lg"
                            >
                                Submit Property
                            </Button>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddPropertyPage;