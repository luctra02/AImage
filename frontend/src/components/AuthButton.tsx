"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronDown, LogOut } from "lucide-react";
import ProfilePictureModal from "./ProfilePictureModal"; // Added import for ProfilePictureModal
import { useUserStore } from "@/lib/userStore";

export default function AuthButton() {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Added state for ProfilePictureModal

    // Check auth status on mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
                const response = await fetch(
                    `${apiUrl}/api/user/profile`,
                    {
                        credentials: "include",
                    }
                );
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
                console.error("Auth check failed:", error);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    }, [setUser]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
            await fetch(`${apiUrl}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
            setIsDropdownOpen(false);
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                <div className="hidden sm:block w-16 h-4 bg-white/10 rounded animate-pulse"></div>
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return (
            <Button
                size="sm"
                asChild
                className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 border-0"
            >
                <Link
                    href="/login"
                    className="flex items-center space-x-2 px-4 py-2"
                >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                </Link>
            </Button>
        );
    }

    // Get user initials for fallback avatar
    const getInitials = (name: string | null, email: string) => {
        if (name) {
            return name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
        }
        return email[0].toUpperCase();
    };

    // Logged in
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="group flex items-center space-x-2 px-3 py-2 hover:bg-white/10 rounded-lg transition-all duration-300 text-white"
            >
                {/* Avatar */}
                <div className="relative">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                        {user.profilePicture ? (
                            <Image
                                src={user.profilePicture}
                                alt={user.name || user.email}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                    {getInitials(user.name, user.email)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* User name */}
                <div className="flex flex-col items-start min-w-0">
                    <span className="text-sm font-medium truncate max-w-[100px]">
                        {user.name
                            ? user.name.split(" ")[0]
                            : user.email.split("@")[0]}
                    </span>
                </div>

                <ChevronDown
                    className={`w-4 h-4 transition-all duration-300 text-white/60 group-hover:text-white/80 ${
                        isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                    />

                    {/* Desktop Dropdown: right-aligned */}
                    <div
                        className="absolute right-0 left-auto mt-2 w-56 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 hidden md:block"
                        style={{ minWidth: "200px" }}
                    >
                        {/* User Info Header */}
                        <div className="px-3 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
                            <div className="flex items-center space-x-2.5">
                                <div
                                    className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 cursor-pointer"
                                    onClick={() => setIsProfileModalOpen(true)}
                                >
                                    {user.profilePicture ? (
                                        <Image
                                            src={user.profilePicture}
                                            alt={user.name || user.email}
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex items-center justify-center">
                                            <span className="text-xs font-bold text-white">
                                                {getInitials(
                                                    user.name,
                                                    user.email
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-white truncate">
                                        {user.name || "User"}
                                    </p>
                                    <p className="text-xs text-white/60 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Logout Button */}
                        <div className="p-2">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center space-x-2.5 px-3 py-2.5 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
                            >
                                <div className="w-7 h-7 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center transition-colors duration-200">
                                    <LogOut className="w-4 h-4" />
                                </div>
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dropdown */}
                    <div
                        className="absolute left-0 right-auto mt-2 w-56 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 block md:hidden"
                        style={{ minWidth: "200px" }}
                    >
                        {/* User Info Header */}
                        <div className="px-3 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
                            <div className="flex items-center space-x-2.5">
                                <div
                                    className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 cursor-pointer"
                                    onClick={() => setIsProfileModalOpen(true)}
                                >
                                    {user.profilePicture ? (
                                        <Image
                                            src={user.profilePicture}
                                            alt={user.name || user.email}
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex items-center justify-center">
                                            <span className="text-xs font-bold text-white">
                                                {getInitials(
                                                    user.name,
                                                    user.email
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-white truncate">
                                        {user.name || "User"}
                                    </p>
                                    <p className="text-xs text-white/60 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Logout Button */}
                        <div className="p-2">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center space-x-2.5 px-3 py-2.5 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
                            >
                                <div className="w-7 h-7 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center transition-colors duration-200">
                                    <LogOut className="w-4 h-4" />
                                </div>
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
            {/* Profile Picture Modal */}
            <ProfilePictureModal
                imageUrl={user.profilePicture || ""}
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </div>
    );
}
