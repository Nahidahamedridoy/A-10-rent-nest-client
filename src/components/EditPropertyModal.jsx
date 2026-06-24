"use client";

import { updateProperty } from "@/lib/api/property/actions";
import {
    Button,
    Form,
    Input,
    Label,
    Modal,
    TextArea,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { FaImage, FaBed, FaBath, FaRulerCombined, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { useState } from "react";

const PROPERTY_TYPES = [
    "Apartment",
    "House",
    "Villa",
    "Cabin",
    "Studio",
    "Commercial",
];

const RENT_TYPES = ["Monthly", "Weekly", "Daily"];

const EditPropertyModal = ({ isModalOpen, setIsModalOpen, editingProperty }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const updateData = {
                ...data,
                rent: Number(data.rent),
                bedrooms: Number(data.bedrooms),
                bathrooms: Number(data.bathrooms),
                propertySize: Number(data.propertySize),

            };
            console.log(updateData);

            // ইমেজ আপলোড হ্যান্ডেলিং
            if (data?.image && data.image.length > 0) {
                const imageFile = data.image[0];
                const imageUrl = await uploadImage(imageFile);
                updateData.image = imageUrl;
            } else {
                updateData.image = editingProperty?.image;
            }

            const result = await updateProperty(updateData, editingProperty?._id);
            console.log(result);
            if (result?.modifiedCount > 0) {
                toast.success("Property updated successfully!");
                setIsModalOpen(false);
                window.location.reload();
            } else {
                toast.error("No changes were made.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
            <Modal.Backdrop className="backdrop-blur-sm">
                <Modal.Container>
                    <Modal.Dialog className="dark  bg-slate-950 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                        <Modal.CloseTrigger />

                        <Modal.Header className="border-b border-white/10 px-6 py-4">
                            <Modal.Heading className="text-xl font-bold bg-gradient-to-r from-pink-500 to-indigo-400 bg-clip-text text-transparent">
                                Edit Property Details
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5 w-full"
                            >
                                {/* Property Title + Image */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full">
                                        <Label htmlFor="title" className="text-slate-300 text-sm mb-1 block">Property Title</Label>
                                        <Input
                                            id="title"
                                            defaultValue={editingProperty?.title}
                                            placeholder="Modern Luxury Apartment"
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50"
                                            {...register("title", { required: "Property title is required" })}
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                                        )}
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="image" className="text-slate-300 text-sm mb-1 block">Property Image</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            startContent={<FaImage className="text-slate-400" />}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50"
                                            {...register("image")}
                                        />
                                    </div>
                                </div>

                                {/* Property Type + Rent Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full">
                                        <Label htmlFor="propertyType" className="text-slate-300 text-sm mb-1 block">Property Type</Label>
                                        <select
                                            id="propertyType"
                                            defaultValue={editingProperty?.propertyType}
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm  focus:outline-none focus:border-pink-500"
                                            {...register("propertyType", { required: "Property type is required" })}
                                        >
                                            {PROPERTY_TYPES.map((type) => (
                                                <option key={type} value={type} className="bg-slate-950">{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="rentType" className="text-slate-300 text-sm mb-1 block">Rent Type</Label>
                                        <select
                                            id="rentType"
                                            defaultValue={editingProperty?.rentType}
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm  focus:outline-none focus:border-pink-500"
                                            {...register("rentType", { required: "Rent type is required" })}
                                        >
                                            {RENT_TYPES.map((type) => (
                                                <option key={type} value={type} className="bg-slate-950">{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Location + Rent Price */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full">
                                        <Label htmlFor="location" className="text-slate-300 text-sm mb-1 block">Location</Label>
                                        <Input
                                            id="location"
                                            defaultValue={editingProperty?.location}
                                            placeholder="Dhaka, Bangladesh"
                                            startContent={<FaMapMarkerAlt className="text-slate-400" />}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50"
                                            {...register("location", { required: "Location is required" })}
                                        />
                                        {errors.location && (
                                            <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
                                        )}
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="rentPrice" className="text-slate-300 text-sm mb-1 block">Rent Price</Label>
                                        <Input
                                            id="rentPrice"
                                            type="number"
                                            defaultValue={editingProperty?.rentPrice}
                                            placeholder="15000"
                                            startContent={<FaDollarSign className="text-slate-400" />}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50"
                                            {...register("rentPrice", {
                                                required: "Rent price is required",
                                                min: { value: 0, message: "Rent cannot be negative" }
                                            })}
                                        />
                                        {errors.rent && (
                                            <p className="text-red-500 text-xs mt-1">{errors.rentPrice.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Bedrooms + Bathrooms + Size */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                    <div className="w-full">
                                        <Label htmlFor="bedrooms" className="text-slate-300 text-sm mb-1 block">Bedrooms</Label>
                                        <Input
                                            id="bedrooms"
                                            type="number"
                                            defaultValue={editingProperty?.bedrooms}
                                            placeholder="3"
                                            startContent={<FaBed className="text-slate-400" />}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50"
                                            {...register("bedrooms", { required: "Required", min: { value: 0, message: "Invalid" } })}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="bathrooms" className="text-slate-300 text-sm mb-1 block">Bathrooms</Label>
                                        <Input
                                            id="bathrooms"
                                            type="number"
                                            defaultValue={editingProperty?.bathrooms}
                                            placeholder="2"
                                            startContent={<FaBath className="text-slate-400" />}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50"
                                            {...register("bathrooms", { required: "Required", min: { value: 0, message: "Invalid" } })}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="propertySize" className="text-slate-300 text-sm mb-1 block">Size (Sq Ft)</Label>
                                        <Input
                                            id="propertySize"
                                            type="number"
                                            defaultValue={editingProperty?.propertySize}
                                            placeholder="1250"
                                            startContent={<FaRulerCombined className="text-slate-400" />}
                                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50"
                                            {...register("propertySize", { required: "Required", min: { value: 1, message: "Invalid" } })}
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="w-full">
                                    <Label htmlFor="description" className="text-slate-300 text-sm mb-1 block">Detailed Description</Label>
                                    <TextArea
                                        id="description"
                                        defaultValue={editingProperty?.description}
                                        placeholder="Describe your property amenities..."
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50"
                                        rows={4}
                                        {...register("description", {
                                            required: "Description is required",
                                            minLength: { value: 10, message: "Must be at least 10 characters long" }
                                        })}
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    className="w-full bg-gradient-to-r from-pink-500 to-indigo-600  font-bold h-12 shadow-lg shadow-pink-500/10 rounded-xl"
                                >
                                    Update Property Listing
                                </Button>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditPropertyModal;