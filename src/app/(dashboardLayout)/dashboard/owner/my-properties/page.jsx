// "use client";

// import DashboardHeading from '@/components/DashboardHeading';
// import { useSession } from '@/lib/auth-client';
// import { uploadImage } from '@/utils/uploadImage';
// import { Button, Card, CardHeader, Form, Input, TextArea, } from '@heroui/react';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { FaImage, FaBed, FaBath, FaRulerCombined, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';

// const Properties = ({ user }) => { // user অবজেক্ট থেকে ওনারের ডেটা ডাইনামিকালি আসবে

//     const {data: session} = useSession();
//     const { register, handleSubmit, formState: { errors }, reset } = useForm();

//     const onPropertySubmit = async (data) => {
//         try {
//             // ১. ইমেজ ফাইলটিকে ImgBB-তে আপলোড করা
//             const imageFile = data.propertyImage[0];
//             const imageUrl = await uploadImage(imageFile);

//             const prpData = {

//             }

//             // console.log("data .........", data, imageUrl);

//             // ২. আপনার চাওয়া 'addData' অবজেক্টের ফরম্যাটে ডেটা সাজানো
//             const addData = {
//                 title: data.title,
//                 description: data.description,
//                 price: Number(data.price),
//                 location: data.location,
//                 bedrooms: Number(data.bedrooms),
//                 bathrooms: Number(data.bathrooms),
//                 size: Number(data.size),
//                 amenities: data.amenities.split(',').map(item => item.trim()), // কমা দিয়ে আলাদা করে অ্যারে তৈরি
//                 images: imageUrl, // ImgBB থেকে পাওয়া লিঙ্ক
//                 ownerEmail: user?.email || "owner@gmail.com",
//                 ownerName: user?.displayName || "Property Owner",
//             };

//             // console.log("Formed Data for DB:", addData);

//             // এখানে আপনার axios/fetch পোস্ট রিকোয়েস্ট হবে (যেমন: axios.post('/api/properties', addData))
//             // সফল হলে ফরম ক্লিয়ার করার জন্য: reset();

//         } catch (error) {
//             console.error("Error adding property:", error);
//         }
//     };

//     return (
//         <div>
//             <DashboardHeading title="Add New Property" description="List your property details, pricing, features, and upload images." />

//             <div className="mt-6 space-y-6 max-w-3xl">
//                 <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl" radius="lg">
//                     <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
//                         <h3 className="text-xl font-bold text-white">Property Specification</h3>
//                         <p className="text-slate-400 text-xs">Fill up the credentials below to add your listing.</p>
//                     </CardHeader>
//                     <div className="p-6">
//                         <Form
//                             onSubmit={handleSubmit(onPropertySubmit)}
//                             className="space-y-4 w-full">

//                             {/* Property Title */}
//                             <div className="w-full">
//                                 <Input
//                                     {...register("title", { required: "Property Title is Required" })}
//                                     id="title" label="Property Title" labelPlacement="outside" placeholder="Luxury Modern Apartment" className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
//                                 {errors.title && <p className="text-red-500 text-xs font-medium mt-1">{errors.title.message}</p>}
//                             </div>

//                             {/* Location */}
//                             <div className="w-full">
//                                 <Input
//                                     {...register("location", { required: "Location is Required" })}
//                                     id="location" label="Location" labelPlacement="outside" placeholder="Gulshan, Dhaka" startContent={<FaMapMarkerAlt className="text-slate-400 text-sm" />} className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
//                                 {errors.location && <p className="text-red-500 text-xs font-medium mt-1">{errors.location.message}</p>}
//                             </div>

//                             {/* Price and Size (Row) */}
//                             <div className="flex gap-4 w-full">
//                                 <div className="w-1/2">
//                                     <Input
//                                         {...register("price", { required: "Price is Required", min: { value: 1, message: "Must be a positive number" } })}
//                                         type="number" id="price" label="Rent Price ($)" labelPlacement="outside" placeholder="1200" startContent={<FaDollarSign className="text-slate-400 text-sm" />} className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
//                                     {errors.price && <p className="text-red-500 text-xs font-medium mt-1">{errors.price.message}</p>}
//                                 </div>
//                                 <div className="w-1/2">
//                                     <Input
//                                         {...register("size", { required: "Size is Required" })}
//                                         type="number" id="size" label="Property Size (Sq Ft)" labelPlacement="outside" placeholder="1500" startContent={<FaRulerCombined className="text-slate-400 text-sm" />} className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
//                                     {errors.size && <p className="text-red-500 text-xs font-medium mt-1">{errors.size.message}</p>}
//                                 </div>
//                             </div>

//                             {/* Bedrooms and Bathrooms (Row) */}
//                             <div className="flex gap-4 w-full">
//                                 <div className="w-1/2">
//                                     <Input
//                                         {...register("bedrooms", { required: "Bedrooms count is Required" })}
//                                         type="number" id="bedrooms" label="Bedrooms" labelPlacement="outside" placeholder="3" startContent={<FaBed className="text-slate-400 text-sm" />} className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
//                                     {errors.bedrooms && <p className="text-red-500 text-xs font-medium mt-1">{errors.bedrooms.message}</p>}
//                                 </div>
//                                 <div className="w-1/2">
//                                     <Input
//                                         {...register("bathrooms", { required: "Bathrooms count is Required" })}
//                                         type="number" id="bathrooms" label="Bathrooms" labelPlacement="outside" placeholder="2" startContent={<FaBath className="text-slate-400 text-sm" />} className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
//                                     {errors.bathrooms && <p className="text-red-500 text-xs font-medium mt-1">{errors.bathrooms.message}</p>}
//                                 </div>
//                             </div>

//                             {/* Amenities */}
//                             <div className="w-full">
//                                 <Input
//                                     {...register("amenities", { required: "Amenities are Required" })}
//                                     id="amenities" label="Amenities" labelPlacement="outside" placeholder="WiFi, Parking, AC, Lift" className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
//                                 <p className="text-[10px] text-slate-500 mt-1">Separate individual features with a comma (,)</p>
//                                 {errors.amenities && <p className="text-red-500 text-xs font-medium mt-1">{errors.amenities.message}</p>}
//                             </div>

//                             {/* Property Image Upload */}
//                             <div className="w-full">
//                                 <label className="text-sm font-medium text-slate-300 block mb-2">Property Image</label>
//                                 <Input
//                                     {...register("propertyImage", { required: "Image is Required" })}
//                                     type="file"
//                                     accept="image/*"
//                                     id="propertyImage"
//                                     startContent={<FaImage className="text-slate-400 text-sm" />}
//                                     className="w-full"
//                                     classNames={{
//                                         inputWrapper: "bg-slate-900/50 border border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-xl transition-all"
//                                     }}
//                                 />
//                                 {errors.propertyImage && <p className="text-red-500 text-xs font-medium mt-1">{errors.propertyImage.message}</p>}
//                             </div>

//                             {/* Description */}
//                             <div className="w-full">
//                                 <TextArea
//                                     {...register("description", { required: "Description is Required" })}
//                                     id="description" label="Description" labelPlacement="outside" placeholder="Describe your property rules, features and surrounding environment..." className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-[100px] text-white text-sm" />
//                                 {errors.description && <p className="text-red-500 text-xs font-medium mt-1">{errors.description.message}</p>}
//                             </div>

//                             {/* Submit Button */}
//                             <div className="flex gap-4 pt-2">
//                                 <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg" radius="lg">Add Property</Button>
//                             </div>
//                         </Form>
//                     </div>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default Properties;


//organization



"use client";
import DashboardHeading from "@/components/DashboardHeading";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import { addProperties } from "@/lib/api/properties/action"; // পেজের বদলে সার্ভার অ্যাকশন ইম্পোর্ট করা হলো
import { Button, Card, CardHeader, Form, Input, TextArea, Textarea } from "@heroui/react"; // TextArea কে Textarea করা হয়েছে
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage, FaBed, FaBath, FaRulerCombined, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { myProperties } from "@/lib/api/properties/data";

const Properties = () => {
    const { data: session } = useSession();
    const [myPrp, setMyPrp] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        const setPrpData = async() => {
            const prp =await myProperties(session.user.email)
            setMyPrp(prp)
        }
        setPrpData()

    }, [session])

    const onPropertySubmit = async (data) => {
        setMyPrp(true); // লোডিং স্টেট অন করা হলো
        try {
            // ১. ইমেজ ফাইলটিকে ImgBB-তে আপলোড করা
            const imageFile = data.propertyImage[0];
            const imageUrl = await uploadImage(imageFile);

            // ২. রিকোয়ার্ড অবজেক্ট ফরম্যাটে ডেটা সাজানো
            const prpData = {
                title: data.title,
                description: data.description,
                price: Number(data.price),
                location: data.location,
                bedrooms: Number(data.bedrooms),
                bathrooms: Number(data.bathrooms),
                size: Number(data.size),
                amenities: data.amenities.split(',').map(item => item.trim()), // কমা দিয়ে আলাদা করে অ্যারে তৈরি
                images: imageUrl,
                ownerEmail: session?.user?.email,
                ownerName: session?.user?.name || "Property Owner",
                status: "Pending", // প্রপার্টির ডিফল্ট স্ট্যাটাস
                createdAt: new Date()
            };

            // ৩. সার্ভার অ্যাকশনের মাধ্যমে ডাটাবেজে পাঠানো
            const resData = await addProperties(prpData);
            // console.log(resData);

            if (resData?.insertedId) {
                toast.success("New Property Listed Successfully!");
                reset(); // সফলভাবে অ্যাড হওয়ার পর ফর্মটি ক্লিয়ার করার জন্য
            } else {
                toast.error("Failed to add property.");
            }
        } catch (error) {
            console.error("Error submitting property:", error);
            toast.error("Something went wrong!");
        } finally {
            setMyPrp(false); // কাজ শেষে লোডিং বন্ধ করা হলো
        }
    };

    return (
        <div>
            <DashboardHeading
                title="Add New Property"
                description="List your property details, pricing, features, and upload images."
            />

            <div className="mt-6 space-y-6 max-w-3xl">
                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl" radius="lg">
                    <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
                        <h3 className="text-xl font-bold text-white">Property Specification</h3>
                        <p className="text-slate-400 text-xs">Fill up the credentials below to add your listing.</p>
                    </CardHeader>
                    <div className="p-6">
                        <Form
                            onSubmit={handleSubmit(onPropertySubmit)}
                            className="space-y-4 w-full">

                            {/* Property Title */}
                            <div className="w-full">
                                <Input
                                defaultValue={myPrp.title}
                                    {...register("title", { required: "Property Title is Required" })}
                                    id="title" label="Property Title" labelPlacement="outside" placeholder="Luxury Modern Apartment" className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
                                {errors.title && <p className="text-red-500 text-xs font-medium mt-1">{errors.title.message}</p>}
                            </div>

                            {/* Location */}
                            <div className="w-full">
                                <Input
                                    {...register("location", { required: "Location is Required" })}
                                    id="location" label="Location" labelPlacement="outside" placeholder="Gulshan, Dhaka" startContent={<FaMapMarkerAlt className="text-slate-400 text-sm" />} className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
                                {errors.location && <p className="text-red-500 text-xs font-medium mt-1">{errors.location.message}</p>}
                            </div>

                            {/* Price and Size (Row) */}
                            <div className="flex gap-4 w-full">
                                <div className="w-1/2">
                                    <Input
                                        {...register("price", { required: "Price is Required", min: { value: 1, message: "Must be a positive number" } })}
                                        type="number" id="price" label="Rent Price ($)" labelPlacement="outside" placeholder="1200" startContent={<FaDollarSign className="text-slate-400 text-sm" />} className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
                                    {errors.price && <p className="text-red-500 text-xs font-medium mt-1">{errors.price.message}</p>}
                                </div>
                                <div className="w-1/2">
                                    <Input
                                        {...register("size", { required: "Size is Required" })}
                                        type="number" id="size" label="Property Size (Sq Ft)" labelPlacement="outside" placeholder="1500" startContent={<FaRulerCombined className="text-slate-400 text-sm" />} className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
                                    {errors.size && <p className="text-red-500 text-xs font-medium mt-1">{errors.size.message}</p>}
                                </div>
                            </div>

                            {/* Bedrooms and Bathrooms (Row) */}
                            <div className="flex gap-4 w-full">
                                <div className="w-1/2">
                                    <Input
                                        {...register("bedrooms", { required: "Bedrooms count is Required" })}
                                        type="number" id="bedrooms" label="Bedrooms" labelPlacement="outside" placeholder="3" startContent={<FaBed className="text-slate-400 text-sm" />} className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
                                    {errors.bedrooms && <p className="text-red-500 text-xs font-medium mt-1">{errors.bedrooms.message}</p>}
                                </div>
                                <div className="w-1/2">
                                    <Input
                                        {...register("bathrooms", { required: "Bathrooms count is Required" })}
                                        type="number" id="bathrooms" label="Bathrooms" labelPlacement="outside" placeholder="2" startContent={<FaBath className="text-slate-400 text-sm" />} className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
                                    {errors.bathrooms && <p className="text-red-500 text-xs font-medium mt-1">{errors.bathrooms.message}</p>}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="w-full">
                                <Input
                                    {...register("amenities", { required: "Amenities are Required" })}
                                    id="amenities" label="Amenities" labelPlacement="outside" placeholder="WiFi, Parking, AC, Lift" className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 text-white" />
                                <p className="text-[10px] text-slate-500 mt-1">Separate individual features with a comma (,)</p>
                                {errors.amenities && <p className="text-red-500 text-xs font-medium mt-1">{errors.amenities.message}</p>}
                            </div>

                            {/* Property Image Upload */}
                            <div className="w-full">
                                <label className="text-sm font-medium text-slate-300 block mb-2">Property Image</label>
                                <Input
                                    {...register("propertyImage", { required: "Image is Required" })}
                                    type="file"
                                    accept="image/*"
                                    id="propertyImage"
                                    startContent={<FaImage className="text-slate-400 text-sm" />}
                                    className="w-full"
                                    classNames={{
                                        inputWrapper: "bg-slate-900/50 border border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-xl transition-all text-slate-300"
                                    }}
                                />
                                {errors.propertyImage && <p className="text-red-500 text-xs font-medium mt-1">{errors.propertyImage.message}</p>}
                            </div>

                            {/* Description */}
                            <div className="w-full">
                                <TextArea
                                    {...register("description", { required: "Description is Required" })}
                                    id="description" label="Description" labelPlacement="outside" placeholder="Describe your property rules, features and surrounding environment..." className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-[100px] text-white text-sm" />
                                {errors.description && <p className="text-red-500 text-xs font-medium mt-1">{errors.description.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-2">
                                <Button
                                    type="submit"
                                    isLoading={myPrp}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg"
                                    radius="lg"
                                >
                                    {myPrp ? "Listing..." : "Add Property"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Properties;