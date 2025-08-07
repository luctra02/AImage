"use client";
import { useEffect, useState } from "react";
import ImageActionBar from "@/components/ImageActionBar";
import { useUserStore } from "@/lib/userStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Heart } from "lucide-react";
import Image from "next/image";

interface LikedImage {
    id: number;
    imageUrl: string;
}

export default function LikedImagesPage() {
    const user = useUserStore((state) => state.user);
    const [images, setImages] = useState<LikedImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        const fetchLikedImages = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
                const res = await fetch(
                    `${apiUrl}/api/liked-images`,
                    {
                        credentials: "include",
                    }
                );
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    setImages(data || []);
                } else if (res.status === 401 || res.status === 403) {
                    setError("You must be logged in to view liked images.");
                } else {
                    setError("Failed to fetch liked images.");
                }
            } catch {
                setError("An error occurred while fetching liked images.");
            } finally {
                setLoading(false);
            }
        };
        fetchLikedImages();
    }, [user]);

    return (
        <div className="min-h-screen relative">
            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-full mr-3">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight pb-1">
                            Liked Images
                        </h1>
                    </div>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        All your favorite images in one place.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-lg shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-pink-400" />
                                Your Liked Images
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="text-center py-8 text-white/80">
                                    Loading...
                                </div>
                            ) : !user ? (
                                <div className="text-center py-8 text-red-400">
                                    You must be logged in to view your liked
                                    images.
                                </div>
                            ) : error ? (
                                <div className="text-center py-8 text-red-400">
                                    {error}
                                </div>
                            ) : images.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    You have not liked any images yet.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {images.map((img) => (
                                        <Card
                                            key={img.id}
                                            className="flex flex-col items-center bg-white/5 border-white/10"
                                        >
                                            <Image
                                                src={img.imageUrl}
                                                alt={`Liked image ${img.id}`}
                                                width={512}
                                                height={256}
                                                className="w-full h-64 object-cover rounded-t-md"
                                                style={{ background: "#222" }}
                                                unoptimized
                                            />
                                            <div className="w-full p-4 flex flex-col items-center">
                                                <ImageActionBar
                                                    imageUrl={img.imageUrl}
                                                    initialLiked={true}
                                                />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
