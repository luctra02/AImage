import { useState } from "react";
import LikeButton from "@/components/LikeButton";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface ImageActionBarProps {
    imageUrl: string;
    initialLiked?: boolean;
    onProfilePictureSet?: (url: string) => void;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ImageActionBar({
    imageUrl,
    initialLiked = false,
    onProfilePictureSet,
}: ImageActionBarProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSetProfilePicture = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await fetch(`${apiUrl}/api/user/profile-picture`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ profilePictureUrl: imageUrl }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(
                    data.message || "Failed to set profile picture"
                );
            }
            const data = await response.json();
            setSuccess(true);
            onProfilePictureSet?.(data.profilePictureUrl);
        } catch (err: unknown) {
            let message = "Unknown error";
            if (err instanceof Error) {
                message = err.message;
            }
            setError(message);
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(false), 2000);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2.5 flex-1 transition-all duration-200"
                onClick={handleSetProfilePicture}
                disabled={loading}
            >
                <User className="w-4 h-4 mr-2" />
                {loading
                    ? "Setting..."
                    : success
                    ? "Set!"
                    : "Set as Profile Picture"}
            </Button>
            <LikeButton imageUrl={imageUrl} initialLiked={initialLiked} />
            {error && (
                <span className="ml-2 text-red-400 text-xs">{error}</span>
            )}
        </div>
    );
}
