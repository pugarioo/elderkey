"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from "react";

const FrictionContext = createContext();

export const useFriction = () => useContext(FrictionContext);

export const FrictionProvider = ({ children }) => {
    const [stressScore, setStressScore] = useState(0);
    const [lastSignal, setLastSignal] = useState(null); // For visualization

    // Engine State
    const recentStressRef = useRef(0);

    // Logic Refs
    const clickHistoryRef = useRef([]); // For Rage Click
    const movementHistoryRef = useRef([]); // For Scrubbing

    // Constants
    const DECAY_FACTOR = 0.1;
    const TICK_RATE = 100;

    // Signal Config
    const SIGNALS = {
        RAGE_CLICK: {
            weight: 40,
            threshold: 3,
            window: 1500,
            name: "RAGE CLICK",
        },
        DEAD_CLICK: { weight: 20, name: "DEAD CLICK" },
        SCRUBBING: {
            weight: 10,
            distanceThreshold: 800,
            displacementThreshold: 150,
            window: 500,
            name: "SCRUBBING",
        },
    };

    // Helper: Check if element is interactive
    const isInteractive = (element) => {
        if (!element) return false;

        const interactiveTags = [
            "BUTTON",
            "A",
            "INPUT",
            "TEXTAREA",
            "SELECT",
            "VIDEO",
            "AUDIO",
        ];
        if (interactiveTags.includes(element.tagName)) return true;

        // Roles
        const role = element.getAttribute("role");
        if (role === "button" || role === "link" || role === "menuitem")
            return true;

        // Bubbling up to find interactive parent
        if (element.parentElement) {
            return isInteractive(element.parentElement);
        }

        // Cursor pointer check (heuristic) - simpler to just stick to DOM structure for now to avoid perf hit of getComputedStyle
        return false;
    };

    // Module A: The Listener
    useEffect(() => {
        const handleClick = (e) => {
            const now = Date.now();
            const target = e.target;

            // 1. Dead Click Detector
            // Check if clicking on something that ISN'T interactive
            // We need to stop propagation only for logic, not actual event
            if (!isInteractive(target)) {
                // It's a dead click
                recentStressRef.current += SIGNALS.DEAD_CLICK.weight;
                setLastSignal(SIGNALS.DEAD_CLICK.name);
                console.log("[Friction] Dead Click Detected");
            }

            // 2. Rage Click Detector
            // Push to history
            clickHistoryRef.current.push({ time: now, target: target });

            // Prune history
            clickHistoryRef.current = clickHistoryRef.current.filter(
                (c) => now - c.time < SIGNALS.RAGE_CLICK.window,
            );

            // Check for repeats on SAME target
            const clicksOnTarget = clickHistoryRef.current.filter(
                (c) => c.target === target,
            ).length;

            if (clicksOnTarget >= SIGNALS.RAGE_CLICK.threshold) {
                // Only trigger if we haven't Just triggered it for this sequence (simple debounce: empty history for this target?)
                // Or just apply weight. Applying weight repeatedly is okay for RAGE.
                if (clicksOnTarget === SIGNALS.RAGE_CLICK.threshold) {
                    recentStressRef.current += SIGNALS.RAGE_CLICK.weight;
                    setLastSignal(SIGNALS.RAGE_CLICK.name);
                    console.log("[Friction] Rage Click Detected");
                    // Optional: Clear history for this target to reset counter?
                    // Let's keep it to allow "super rage" to pile up, or just trigger once per block.
                    // The prompt implies 3+ clicks is the signal.
                }
            }
        };


        const handleMouseMove = (e) => {
            const now = Date.now();

            // Store latest cursor position
            latestCursorRef.current = { x: e.clientX, y: e.clientY };

            // Push to history
            movementHistoryRef.current.push({
                x: e.clientX,
                y: e.clientY,
                time: now,
            });

            // Prune history (throttled cleanup)
            if (
                movementHistoryRef.current.length > 50 &&
                movementHistoryRef.current.length % 10 === 0
            ) {
                movementHistoryRef.current = movementHistoryRef.current.filter(
                    (m) => now - m.time < SIGNALS.SCRUBBING.window,
                );
            }
        };

        const handleScroll = () => {
            // Basic friction (low weight)
            recentStressRef.current += 1;
        };

        window.addEventListener("mousedown", handleClick);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("mousedown", handleClick);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Helper: Trigger Visual Assist
    const triggerAssistiveHint = () => {
        // 1. Inject Style if missing
        if (!document.getElementById("friction-hint-style")) {
            const style = document.createElement("style");
            style.id = "friction-hint-style";
            style.innerHTML = `
                @keyframes frictionPulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 183, 3, 0.7); }
                    50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 183, 3, 0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 183, 3, 0); }
                }
                .friction-hint-pulse {
                    animation: frictionPulse 1.5s ease-in-out;
                    z-index: 10000; /* Try to sit on top */
                }
            `;
            document.head.appendChild(style);
        }

        // 2. Select Elements
        const selector =
            'button, a, input, textarea, select, [role="button"], [role="link"]';
        const elements = document.querySelectorAll(selector);

        // 3. Apply Class
        elements.forEach((el) => {
            el.classList.add("friction-hint-pulse");
            // Remove after animation
            setTimeout(() => {
                el.classList.remove("friction-hint-pulse");
            }, 2000);
        });

        console.log(`[Friction] Hint Triggered on ${elements.length} elements`);
    };

    // New Helper: Trigger Visual Assist (Proximity)
    const triggerProximityPulse = () => {
        // 1. Inject Style if missing
        if (!document.getElementById("friction-hint-style")) {
            const style = document.createElement("style");
            style.id = "friction-hint-style";
            style.innerHTML = `
                @keyframes frictionPulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 183, 3, 0.9); }
                    50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255, 183, 3, 0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 183, 3, 0); }
                }
                .friction-hint-pulse {
                    animation: frictionPulse 1s ease-in-out infinite;
                    border-radius: 12px;
                    z-index: 10000;
                    /* Ensure animation starts immediately but follows delay */
                    animation-fill-mode: both;
                }
            `;
            document.head.appendChild(style);
        }

        // 2. Select Elements
        const selector =
            'button, a, input, textarea, select, [role="button"], [role="link"]';
        const elements = document.querySelectorAll(selector);
        const { x: cursorX, y: cursorY } = latestCursorRef.current;
        const PROXIMITY_RADIUS = 300; // pixels

        let pulsedCount = 0;

        // 3. Apply Class to Nearby Elements
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            // Calculate center of element
            const elCenterX = rect.left + rect.width / 2;
            const elCenterY = rect.top + rect.height / 2;

            // Calculate distance
            const distance = Math.sqrt(
                Math.pow(cursorX - elCenterX, 2) + Math.pow(cursorY - elCenterY, 2)
            );

            if (distance <= PROXIMITY_RADIUS) {
                // If it's a new entry (doesn't have the class yet), sync its animation
                if (!el.classList.contains("friction-hint-pulse")) {
                    const now = Date.now();
                    const cycleDuration = 1000; // Matches 1s animation in CSS
                    const offset = now % cycleDuration;
                    // Set negative delay to jump into the correct phase of the global cycle
                    el.style.animationDelay = `-${offset}ms`;
                    el.classList.add("friction-hint-pulse");
                }
                pulsedCount++;
            } else {
                if (el.classList.contains("friction-hint-pulse")) {
                    el.classList.remove("friction-hint-pulse");
                    el.style.animationDelay = ""; // Clean up style
                }
            }
        });

        // console.log(`[Friction] Proximity Hint Active on ${pulsedCount} elements`);
    };

    const clearProximityHints = () => {
        const selector =
            'button, a, input, textarea, select, [role="button"], [role="link"]';
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => el.classList.remove("friction-hint-pulse"));
    };

    // Engine State for Cooldown
    const lastHintTimeRef = useRef(0);
    const latestCursorRef = useRef({ x: 0, y: 0 });

    // Module B: The Interpreter
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();

            // Analyze Scrubbing (Periodically)
            const moves = movementHistoryRef.current.filter(
                (m) => now - m.time < SIGNALS.SCRUBBING.window,
            );
            if (moves.length > 10) {
                let totalDist = 0;
                for (let i = 1; i < moves.length; i++) {
                    totalDist += Math.sqrt(
                        Math.pow(moves[i].x - moves[i - 1].x, 2) +
                        Math.pow(moves[i].y - moves[i - 1].y, 2),
                    );
                }

                const start = moves[0];
                const end = moves[moves.length - 1];
                const displacement = Math.sqrt(
                    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2),
                );

                if (
                    totalDist > SIGNALS.SCRUBBING.distanceThreshold &&
                    displacement < SIGNALS.SCRUBBING.displacementThreshold
                ) {
                    // It's scrubbing
                    recentStressRef.current += SIGNALS.SCRUBBING.weight;
                    setLastSignal(SIGNALS.SCRUBBING.name);
                    console.log("[Friction] Scrubbing Detected", {
                        totalDist,
                        displacement,
                    });

                    // Clear history to prevent double counting immediately
                    movementHistoryRef.current = [];
                }
            }

            setStressScore((prevScore) => {
                const increase = recentStressRef.current;

                // Calculate new score
                let newScore = prevScore + increase - DECAY_FACTOR;
                newScore = Math.max(0, Math.min(100, newScore));

                // Trigger Hints if Stress is High
                if (newScore > 50) {
                    const timeSinceLastHint = now - lastHintTimeRef.current;
                    // Update frequency matches TICK_RATE for smooth response
                    if (timeSinceLastHint >= TICK_RATE) {
                        triggerProximityPulse();
                        lastHintTimeRef.current = now;
                    }
                } else if (prevScore > 50 && newScore <= 50) {
                    // Just dropped below threshold - Cleanup
                    clearProximityHints();
                }

                // Reset accumulator
                recentStressRef.current = 0;

                // Clear signal visualization if calming down
                if (increase === 0 && newScore < prevScore) {
                    // Optionally clear last signal after some time
                }

                return newScore;
            });
        }, TICK_RATE);

        return () => clearInterval(interval);
    }, []);

    return (
        <FrictionContext.Provider value={{ stressScore }}>
            {children}
            {/* Visual Indicator */}
            <div
                style={{
                    position: "fixed",
                    bottom: "10px",
                    left: "10px",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    zIndex: 9999,
                    pointerEvents: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    opacity: stressScore > 0 ? 1 : 0.3,
                    transition: "opacity 0.3s",
                }}
            >
                <div style={{ fontWeight: "bold" }}>
                    Stress Level: {stressScore.toFixed(0)}
                </div>
                {lastSignal && (
                    <div style={{ color: "#FF4444", fontSize: "10px" }}>
                        ⚠️ {lastSignal}
                    </div>
                )}
            </div>
        </FrictionContext.Provider>
    );
};
