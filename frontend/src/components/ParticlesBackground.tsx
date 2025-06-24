"use client";

import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log("Initializing AI particles...");
        await loadSlim(engine);
        console.log("AI particles initialized!");
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none",
            }}
            options={{
                particles: {
                    number: {
                        value: 60, // Slightly fewer for cleaner look
                        density: { enable: true, area: 1000 },
                    },
                    color: {
                        value: [
                            "#8b5cf6", // Purple (primary theme)
                            "#ec4899", // Pink (secondary theme)
                            "#06b6d4", // Cyan (accent)
                            "#10b981", // Emerald (creative)
                            "#f59e0b", // Amber (inspiration)
                        ],
                    },
                    shape: {
                        type: ["circle", "triangle", "star", "polygon"],
                        options: {
                            polygon: { nb_sides: 6 }, // Hexagons for AI/tech feel
                            star: { nb_sides: 5 }, // 5-pointed stars
                        },
                    },
                    opacity: {
                        value: { min: 0.2, max: 0.6 }, // Slightly more visible
                        animation: {
                            enable: true,
                            speed: 0.8,
                            sync: false,
                        },
                    },
                    size: {
                        value: { min: 2, max: 6 }, // Slightly larger
                        animation: {
                            enable: true,
                            speed: 2,
                            sync: false,
                        },
                    },
                    links: {
                        enable: true,
                        distance: 120, // Closer connections
                        color: {
                            value: [
                                "#8b5cf650", // Purple with transparency
                                "#ec489950", // Pink with transparency
                                "#06b6d450", // Cyan with transparency
                            ],
                        },
                        opacity: 0.3,
                        width: 1.5,
                        triangles: {
                            enable: true, // Creates triangle connections
                            color: "#8b5cf620",
                            opacity: 0.1,
                        },
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: { default: "bounce" },
                        attract: {
                            enable: true,
                            rotate: {
                                x: 600,
                                y: 1200,
                            },
                        },
                    },
                    twinkle: {
                        particles: {
                            enable: true,
                            frequency: 0.05,
                            opacity: 1,
                            color: {
                                value: "#ffffff",
                            },
                        },
                    },
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: ["grab", "bubble"],
                            parallax: { enable: false, force: 60, smooth: 10 },
                        },
                    },
                    modes: {
                        grab: {
                            distance: 180,
                            links: {
                                opacity: 0.8,
                                color: "#ec4899",
                            },
                        },
                        bubble: {
                            distance: 200,
                            size: 8,
                            duration: 2,
                            opacity: 0.8,
                            color: "#8b5cf6",
                        },
                    },
                },
                background: {
                    color: "transparent",
                },
                detectRetina: true,
                fpsLimit: 60,
            }}
        />
    );
}
