"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LogIn,
    UserPlus,
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    Loader2,
    Sparkles,
} from "lucide-react";
import { z } from "zod";

const signupSchema = z
    .object({
        name: z.string().min(1, "Name is required."),
        email: z.string().email("Please enter a valid email address."),
        password: z.string().min(6, "Password must be at least 6 characters."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export default function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Frontend validation for signup using zod
        if (isSignup) {
            const result = signupSchema.safeParse(formData);
            if (!result.success) {
                setError(result.error.issues[0]?.message || "Invalid input.");
                setIsLoading(false);
                return;
            }
        }

        try {
            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
            // Select correct endpoint
            const endpoint = isSignup
                ? `${apiUrl}/api/auth/signup`
                : `${apiUrl}/api/auth/login`;

            // Build payload
            const payload = isSignup
                ? {
                      name: formData.name,
                      email: formData.email,
                      password: formData.password,
                      confirmPassword: formData.confirmPassword,
                  }
                : {
                      email: formData.email,
                      password: formData.password,
                  };

            // Call your Spring Boot API
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include", // Send cookies with request
            });

            if (!response.ok) {
                // Try to get error message from backend, fallback to generic
                let errorMsg = "Login failed. Please try again.";
                try {
                    const errorData = await response.text();
                    errorMsg = errorData || errorMsg;
                } catch {}
                setError(errorMsg);
                setIsLoading(false);
                return;
            }
            setError(null); // Clear error on success

            if (!isSignup) {
                // For login, just redirect after success
                window.location.href = "/";
                return;
            }
            // For signup, still parse the response for error handling or messages
            // const data = await response.json();

            console.log(`${isSignup ? "Signup" : "Login"} successful`);

            // Redirect to dashboard or home page
            window.location.href = "/";
        } catch (error) {
            setError("Network error. Please try again.");
            console.error("Authentication failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-full">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
                        Welcome to AImage
                    </h1>
                    <p className="text-gray-400">
                        {isSignup
                            ? "Create your account to save and share your images"
                            : "Sign in to save and share your images"}
                    </p>
                </div>

                {/* Auth Toggle */}
                <div className="flex bg-white/5 rounded-lg p-1 mb-6">
                    <button
                        onClick={() => setIsSignup(false)}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                            !isSignup
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                    </button>
                    <button
                        onClick={() => setIsSignup(true)}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                            isSignup
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                    </button>
                </div>

                {/* Form */}
                <Card className="bg-white/10 border-white/20 backdrop-blur-lg shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            {isSignup ? (
                                <>
                                    <UserPlus className="w-5 h-5 text-purple-400" />
                                    Create Account
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 text-purple-400" />
                                    Sign In
                                </>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-4 text-red-500 text-center font-semibold">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Field (Signup only) */}
                            {isSignup && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                                            required={isSignup}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password (Signup only) */}
                            {isSignup && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                                            required={isSignup}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        {isSignup
                                            ? "Creating Account..."
                                            : "Signing In..."}
                                    </>
                                ) : (
                                    <>
                                        {isSignup ? (
                                            <UserPlus className="w-4 h-4 mr-2" />
                                        ) : (
                                            <LogIn className="w-4 h-4 mr-2" />
                                        )}
                                        {isSignup
                                            ? "Create Account"
                                            : "Sign In"}
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
