"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { redirect, useRouter } from "next/navigation";

export default function RegisterPage() {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            // upload image to imgbb
            const imageFile = data.image[0];
            const imageUrl = await uploadImage(imageFile);
            // console.log(imageUrl);
            
            const { data: signUpData, error: signUpError } = await authClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
                image: imageUrl,
                role: data.role
            });

            // console.log(signUpData, signUpError);

            if (signUpError) {
                toast.error("Registration not successful...");
            } else {
                toast.success("Register Successfully");
               router.push('/')
            }
        } catch (err) {
            
            toast.error("Something went wrong.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/", // সফল হলে হোমপেজে রিডাইরেক্ট হবে
            });
        } catch (err) {
            toast.error("Google authentication failed.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-lg border border-slate-100 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 mx-auto">
                <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                    <div className="p-3 bg-pink-50 rounded-full mb-2">
                        <IoIosHome className="text-pink-500 text-2xl" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-pink-600 bg-clip-text text-transparent">
                        Create an Account
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">
                        Join Property Rental Platform
                    </p>
                </CardHeader>
                
                <CardBody className="gap-5 p-0">
                    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                        
                        {/* Name */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <Label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</Label>
                            <Input
                                {...register("name", { required: "Name is Required" })}
                                id="name"
                                placeholder="John Doe"
                            
                                startContent={<FaUser className="text-slate-400 text-sm" />}
                                className="w-full"
                                classNames={{
                                    inputWrapper: "bg-slate-50/80 border border-slate-200 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-xl transition-all"
                                }}
                            />
                            {errors.name && <p className="text-red-500 text-xs font-medium mt-0.5">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <Label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</Label>
                            <Input
                                {...register("email", { required: "Email is Required" })}
                                id="email"
                                placeholder="john@example.com"
                                type="email"
                                
                                startContent={<FaEnvelope className="text-slate-400 text-sm" />}
                                className="w-full"
                                classNames={{
                                    inputWrapper: "bg-slate-50/80 border border-slate-200 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-xl transition-all"
                                }}
                            />
                            {errors.email && <p className="text-red-500 text-xs font-medium mt-0.5">{errors.email.message}</p>}
                        </div>

                        {/* Image */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <Label htmlFor="image" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Profile Image</Label>
                            <Input
                                {...register("image", { required: "Image is Required" })}
                                type="file"
                                accept="image/*"
                                id="image"
                                
                                startContent={<FaImage className="text-slate-400 text-sm" />}
                                className="w-full"
                                classNames={{
                                    inputWrapper: "bg-slate-50/80 border border-slate-200 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-xl transition-all"
                                }}
                            />
                            {errors.image && <p className="text-red-500 text-xs font-medium mt-0.5">{errors.image.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <Label htmlFor="password" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</Label>
                            <Input
                                {...register("password", { 
                                    required: "Password is Required", 
                                    maxLength: { value: 18, message: "Max 18 characters" }, 
                                    minLength: { value: 6, message: "Min 6 characters" } 
                                })}
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                
                                startContent={<FaLock className="text-slate-400 text-sm" />}
                                className="w-full"
                                classNames={{
                                    inputWrapper: "bg-slate-50/80 border border-slate-200 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-xl transition-all"
                                }}
                            />
                            {errors.password && <p className="text-red-500 text-xs font-medium mt-0.5">{errors.password.message}</p>}
                        </div>

                        {/* Role */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <Label htmlFor="role" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Role</Label>
                            <select
                                {...register("role", { required: "Role is Required" })}
                                id="role"
                                className="w-full bg-slate-50/80 border border-slate-200 hover:border-pink-500/50 focus:border-pink-500 focus:outline-none p-3 rounded-xl text-slate-700 text-sm transition-all shadow-sm"
                            >
                                <option value="tenant">Tenant</option>
                                <option value="owner">Owner</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-xs font-medium mt-0.5">{errors.role.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold h-12 shadow-md hover:shadow-lg transition-all mt-2"
                            radius="xl"
                        >
                            Create Account
                        </Button>
                    </Form>

                    {/* Divider */}
                    <div className="flex items-center my-2">
                        <div className="flex-grow border-t border-slate-200" />
                        <span className="mx-4 text-xs text-slate-400 font-bold uppercase tracking-wider">Or Sign Up With</span>
                        <div className="flex-grow border-t border-slate-200" />
                    </div>

                    {/* Google OAuth Button */}
                    <Button
                    onClick={handleGoogleSignIn}
                        variant="bordered"
                        className="w-full border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold h-11 transition-all"
                        radius="xl"
                        startContent={<FaGoogle className="text-pink-500" />}
                    >
                        Google OAuth
                    </Button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-slate-500 mt-4 font-medium">
                        Already have an account?{" "}
                        <Link href="/login" className="text-pink-500 hover:text-pink-600 font-bold hover:underline transition-all">
                            Log In
                        </Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}