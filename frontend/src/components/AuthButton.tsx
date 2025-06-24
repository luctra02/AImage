"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    LogIn,
    User,
    Settings,
    LogOut,
    ChevronDown,
} from "lucide-react";

// This would typically come from your auth context/state management
interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export default function AuthButton() {
    const [user, setUser] = useState<User | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Simulate checking auth status on mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Replace with your actual auth check API call
                // const response = await fetch('/api/auth/me');
                // if (response.ok) {
                //     const userData = await response.json();
                //     setUser(userData);
                // }
                
                // Simulated delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Simulated user data - remove this and uncomment above
                // setUser({
                //     id: "1",
                //     name: "John Doe",
                //     email: "john@example.com"
                // });
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            // Replace with your actual logout API call
            // await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            setIsDropdownOpen(false);
            // Optionally redirect to home page
            // router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="w-8 h-8 bg-gray-600/50 rounded-full animate-pulse"></div>
        );
    }

    // Not logged in - show login button
    if (!user) {
        return (
            <Button
                size="sm"
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all duration-200 transform hover:scale-105 text-sm"
            >
                <Link href="/login" className="flex items-center space-x-1.5">
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login</span>
                </Link>
            </Button>
        );
    }

    // Logged in - show user profile dropdown
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-200 text-sm text-white"
            >
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-6 h-6 rounded-full object-cover"
                        />
                    ) : (
                        <User className="w-3.5 h-3.5 text-white" />
                    )}
                </div>
                <span className="font-medium hidden sm:block">
                    {user.name.split(' ')[0]}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                }`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-1">
                        <Link
                            href="/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        >
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                        </Link>
                        <Link
                            href="/settings"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors duration-200"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}