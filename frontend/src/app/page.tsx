"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Loader2,
    Sparkles,
    ImageIcon,
    Wand2,
    Download,
    Heart,
    Zap,
} from "lucide-react";

export default function AImageHomepage() {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setGeneratedImage(null);
        setIsImageLoading(false);

        try {
            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                    dimensions: { width: 512, height: 512 },
                }),
            });

            const data = await response.json();
            if (!response.ok)
                throw new Error(data.message || "Failed to generate image");

            if (data.success && data.imageUrl) {
                // Set image loading state when we get the URL
                setIsImageLoading(true);
                setGeneratedImage(data.imageUrl);
            }
        } catch (error) {
            console.error("Generation failed:", error);
            alert(`Generation failed: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    const examplePrompts = [
        "A majestic dragon soaring through neon-lit cyberpunk city",
        "Serene Japanese garden with cherry blossoms at sunset",
        "Abstract geometric patterns in vibrant cosmic colors",
        "Steampunk robot reading a book in an ancient library",
    ];

    return (
        <div className="min-h-screen relative">
            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-full mr-3">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            AImage
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Transform your imagination into stunning visuals with
                        AI-powered image generation
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <Badge
                            variant="secondary"
                            className="bg-purple-800/50 text-purple-200 border-purple-600"
                        >
                            <Zap className="w-3 h-3 mr-1" />
                            Powered by AI
                        </Badge>
                        <Badge
                            variant="secondary"
                            className="bg-blue-800/50 text-blue-200 border-blue-600"
                        >
                            <ImageIcon className="w-3 h-3 mr-1" />
                            High Quality
                        </Badge>
                    </div>
                </div>

                {/* Main Generation Interface */}
                <div className="max-w-4xl mx-auto">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-lg shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Wand2 className="w-5 h-5 text-purple-400" />
                                Create Your Masterpiece
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Prompt Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">
                                    Describe your vision
                                </label>
                                <Textarea
                                    placeholder="A magical forest with glowing mushrooms and fairy lights..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="min-h-[100px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                                />
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {examplePrompts.map((example, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setPrompt(example)}
                                            className="text-xs bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                                        >
                                            {example.slice(0, 30)}...
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Generate Button */}
                            <Button
                                onClick={handleGenerate}
                                disabled={
                                    !prompt.trim() ||
                                    isGenerating ||
                                    isImageLoading
                                }
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating your image...
                                    </>
                                ) : isImageLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Loading image...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Generate Image
                                    </>
                                )}
                            </Button>

                            {/* Generated Image Display */}
                            {(generatedImage || isGenerating) && (
                                <Card className="bg-white/5 border-white/10">
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            {/* Image Container */}
                                            <div className="aspect-square bg-gray-800/50 rounded-lg overflow-hidden border border-white/10 relative">
                                                {isGenerating ? (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="text-center">
                                                            <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
                                                            <p className="text-gray-300">
                                                                Generating your
                                                                masterpiece...
                                                            </p>
                                                            <div className="w-48 bg-gray-700 rounded-full h-2 mt-4 overflow-hidden">
                                                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse w-3/4"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : generatedImage ? (
                                                    <div className="relative w-full h-full">
                                                        {/* Image Loading Overlay */}
                                                        {isImageLoading && (
                                                            <div className="absolute inset-0 bg-gray-800/80 flex items-center justify-center z-10">
                                                                <div className="text-center">
                                                                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-3" />
                                                                    <p className="text-gray-300 text-sm">
                                                                        Loading
                                                                        image...
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <Image
                                                            width={512}
                                                            height={512}
                                                            src={generatedImage}
                                                            unoptimized
                                                            alt="Generated artwork"
                                                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                                                                isImageLoading
                                                                    ? "opacity-0"
                                                                    : "opacity-100"
                                                            }`}
                                                            onLoad={
                                                                handleImageLoad
                                                            }
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>

                                            {/* Action Buttons - Only show when image is fully loaded */}
                                            {generatedImage &&
                                                !isGenerating &&
                                                !isImageLoading && (
                                                    <div className="flex flex-col sm:flex-row gap-3">
                                                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2.5 flex-1 transition-all duration-200">
                                                            <Download className="w-4 h-4 mr-2" />
                                                            Save Image
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white font-medium py-2.5 flex-1 transition-all duration-200"
                                                        >
                                                            <Heart className="w-4 h-4 mr-2" />
                                                            Like
                                                        </Button>
                                                    </div>
                                                )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Features Section */}
                <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6 text-center">
                            <div className="bg-purple-600/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">
                                AI-Powered
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Advanced AI models create stunning, unique
                                images from your descriptions
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6 text-center">
                            <div className="bg-blue-600/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">
                                Lightning Fast
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Generate high-quality images in seconds, not
                                minutes
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6 text-center">
                            <div className="bg-pink-600/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-6 h-6 text-pink-400" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">
                                Save & Share
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Keep your favorites and share your creations
                                with the world
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
