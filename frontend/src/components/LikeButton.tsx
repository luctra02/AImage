import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LikeButtonProps {
    imageUrl: string;
    initialLiked?: boolean;
    onLikeChange?: (liked: boolean) => void;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function LikeButton({
    imageUrl,
    initialLiked = false,
    onLikeChange,
}: LikeButtonProps) {
    const [liked, setLiked] = useState(initialLiked);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLike = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/api/liked-images`, {
                method: liked ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ imageUrl }),
            });
            if (response.status === 401 || response.status === 403) {
                toast.error("You must be logged in to like images.");
                setLoading(false);
                return;
            }
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to update like status");
            }
            setLiked(!liked);
            onLikeChange?.(!liked);
            toast.success(liked ? "Image unliked." : "Image liked!");
        } catch (err: unknown) {
            let message = "Unknown error";
            if (err instanceof Error) {
                message = err.message;
            }
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant={liked ? "default" : "outline"}
            className={
                (liked
                    ? "border-pink-500 bg-pink-600 text-white hover:bg-pink-700 hover:border-pink-600"
                    : "border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white") +
                " w-full transition-all duration-200"
            }
            onClick={handleLike}
            disabled={loading}
            aria-pressed={liked}
            aria-label={liked ? "Unlike image" : "Like image"}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
                <Heart
                    className={`w-4 h-4 mr-2 ${liked ? "fill-pink-500" : ""}`}
                />
            )}
            {liked ? "Liked" : "Like"}
            {error && (
                <span className="ml-2 text-red-400 text-xs">{error}</span>
            )}
        </Button>
    );
}
