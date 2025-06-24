// app/api/generate-image/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { prompt, dimensions } = await request.json();

        if (!prompt?.trim()) {
            return NextResponse.json(
                { message: "Prompt is required" },
                { status: 400 }
            );
        }

        const seed = Math.floor(Math.random() * 1_000_000_000);

        const { width = 512, height = 512 } = dimensions || {};
        const params = new URLSearchParams({
            width: width.toString(),
            height: height.toString(),
            seed: seed.toString(),
            enhance: "true",
            nologo: "true",
            model: "flux",
        });

        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
            prompt
        )}?${params.toString()}`;

        return NextResponse.json({
            success: true,
            imageUrl,
            prompt,
            dimensions: { width, height },
            seed,
            provider: "pollinations.ai",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Image generation error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Generation failed",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
