"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form } from "@heroui/react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    // Email/Password Sign In
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const { data: signInData, error: signInError } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (signInError) {
                toast.error("Login failed. Please check your credentials.");
            } else {
                toast.success("Welcome back! Login successful.");
                router.push("/");
            }
        } catch (err) {
            toast.error("Something went wrong.");
        }
    };

    // Google OAuth Sign In
    const handleGoogleSignIn = async () => {
        try {
            setIsGoogleLoading(true);
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/", 
            });
        } catch (err) {
            toast.error("Google login failed. Please try again.");
            setIsGoogleLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-lg border border-slate-100 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 mx-auto">
                <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                    <div className="p-3 bg-pink-50 rounded-full mb-2">
                        <IoIosLogIn className="text-pink-500 text-2xl" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-pink-600 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">
                        Log in to your Property Rental account
                    </p>
                </CardHeader>
                
                <CardBody className="gap-5 p-0">
                    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                        
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

                        {/* Password */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</Label>
                                <Link href="/forgot-password" className="text-xs font-bold text-pink-500 hover:text-pink-600 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <Input
                                {...register("password", { required: "Password is Required" })}
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

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold h-12 shadow-md hover:shadow-lg transition-all mt-2"
                            radius="xl"
                        >
                            Sign In
                        </Button>
                    </Form>

                    {/* Divider */}
                    <div className="flex items-center my-2">
                        <div className="flex-grow border-t border-slate-200" />
                        <span className="mx-4 text-xs text-slate-400 font-bold uppercase tracking-wider">Or Continue With</span>
                        <div className="flex-grow border-t border-slate-200" />
                    </div>

                    {/* Google OAuth Button */}
                    <Button 
                        variant="bordered"
                        className="w-full border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold h-11 transition-all"
                        radius="xl"
                        startContent={<FaGoogle className="text-pink-500" />}
                        onClick={handleGoogleSignIn}
                        isLoading={isGoogleLoading}
                    >
                        Google OAuth
                    </Button>

                    {/* Register Link */}
                    <p className="text-center text-sm text-slate-500 mt-4 font-medium">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-pink-500 hover:text-pink-600 font-bold hover:underline transition-all">
                            Sign Up
                        </Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}