"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Home, Heart, Menu, X } from "lucide-react";
import AuthButton from "./AuthButton";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        {
            name: "Home",
            href: "/",
            icon: Home,
        },
        {
            name: "Liked Images",
            href: "/liked",
            icon: Heart,
        },
    ];

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 group"
                    >
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-1.5 rounded-md group-hover:scale-110 transition-transform duration-200">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            AImage
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-sm transition-all duration-200 ${
                                        isActive(item.href)
                                            ? "bg-white/10 text-white"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    <IconComponent className="w-3.5 h-3.5" />
                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Auth Buttons */}
                    {/* Desktop Auth Button */}
                    <div className="hidden md:block">
                        <AuthButton />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/30 backdrop-blur-lg border-t border-white/10">
                    <div className="container mx-auto px-4 py-3 space-y-2">
                        {/* Mobile Navigation Links */}
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                                        isActive(item.href)
                                            ? "bg-white/10 text-white"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* Mobile Auth Button */}
                        <div className="pt-2 border-t border-white/10">
                            <div className="px-3 py-2">
                                <AuthButton />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
