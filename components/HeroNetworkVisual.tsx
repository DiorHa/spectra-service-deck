"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

const PATHS = {
  dach: "M238 245 C262 222, 300 196, 344 178",
  us: "M238 245 C220 214, 178 174, 120 152"
} as const;

function RouteParticle({
  path,
  delay,
  duration,
  hidden
}: {
  path: string;
  delay: number;
  duration: number;
  hidden: boolean;
}) {
  if (hidden) return null;

  return (
    <motion.circle
      r="2.2"
      fill="rgba(232,126,74,0.95)"
      style={
        {
          offsetPath: `path("${path}")`,
          offsetRotate: "0deg"
        } as CSSProperties
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.95, 0], offsetDistance: ["0%", "100%"] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeInOut"
      }}
    />
  );
}

function HeroNetworkVisualInner() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const particles = useMemo(
    () =>
      isMobile
        ? [
            { path: PATHS.dach, delay: 0.6, duration: 3.8 },
            { path: PATHS.us, delay: 1.4, duration: 4.1 }
          ]
        : [
            { path: PATHS.dach, delay: 0.4, duration: 3.6 },
            { path: PATHS.dach, delay: 2.1, duration: 4.2 },
            { path: PATHS.us, delay: 1.1, duration: 4.5 },
            { path: PATHS.us, delay: 2.8, duration: 5.1 }
          ],
    [isMobile]
  );

  const nodePulse = reduceMotion
    ? {}
    : {
        scale: [1, 1.12, 1],
        opacity: [0.18, 0.04, 0.18]
      };

  const routeReveal = reduceMotion
    ? { pathLength: 1, opacity: 1 }
    : { pathLength: 1, opacity: 1 };

  return (
    <div className="hero-network-visual" aria-label="Spectra delivery network visual">
      <motion.svg
        className="hero-network-svg"
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.985 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle className="network-halo" cx="230" cy="230" r="164" />

          <g className="network-grid">
            <path d="M72 156 L388 156" />
            <path d="M72 230 L388 230" />
            <path d="M72 304 L388 304" />
            <path d="M128 92 L128 368" />
            <path d="M230 76 L230 384" />
            <path d="M332 92 L332 368" />
            <path d="M108 318 C166 286, 292 286, 352 318" />
          </g>

          <motion.path
            className="network-route secondary"
            d={PATHS.us}
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
            animate={routeReveal}
            transition={{ duration: 1.25, delay: 0.18, ease: "easeInOut" }}
          />
          <motion.path
            className="network-route primary"
            d={PATHS.dach}
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.24 }}
            animate={routeReveal}
            transition={{ duration: 1.15, delay: 0.05, ease: "easeInOut" }}
          />

          <motion.path
            className="network-guide"
            d="M120 152 C188 132, 274 138, 344 178"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.16 }}
            animate={reduceMotion ? { pathLength: 1, opacity: 0.16 } : { pathLength: 1, opacity: 0.16 }}
            transition={{ duration: 1.35, delay: 0.28, ease: "easeOut" }}
          />

          {!reduceMotion &&
            particles.map((particle, index) => (
              <RouteParticle
                key={`${particle.path}-${index}`}
                path={particle.path}
                delay={particle.delay}
                duration={particle.duration}
                hidden={false}
              />
            ))}

          <g>
            <circle className="network-node" cx="344" cy="178" r="3.2" />
            <circle className="network-node" cx="120" cy="152" r="3" />
            <circle className="network-node anchor" cx="238" cy="245" r="4.2" />

            <motion.circle
              className="network-pulse anchor"
              cx="238"
              cy="245"
              r="14"
              initial={false}
              animate={nodePulse}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              className="network-pulse secondary"
              cx="344"
              cy="178"
              r="10"
              initial={false}
              animate={reduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.12, 0.03, 0.12] }}
              transition={{
                duration: 6.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
            />
            <motion.circle
              className="network-pulse secondary"
              cx="120"
              cy="152"
              r="10"
              initial={false}
              animate={reduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.12, 0.03, 0.12] }}
              transition={{
                duration: 6.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4
              }}
            />
          </g>

          <g className="network-labels">
            <text x="356" y="172" className="network-label node-label">DACH</text>
            <text x="78" y="146" className="network-label node-label">US</text>
            <text x="250" y="239" className="network-label anchor-label">PRN / Kosovo</text>
            {!isMobile && (
              <>
                <text x="312" y="112" className="network-label support-label">Property Ops</text>
                <text x="300" y="330" className="network-label support-label">Platform Support</text>
                <text x="78" y="314" className="network-label support-label">Accounting Support</text>
              </>
            )}
          </g>
        </g>
      </motion.svg>
    </div>
  );
}

export function HeroNetworkVisual() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(document.getElementById("hero-network-visual-root"));
  }, []);

  if (!target) return null;

  return createPortal(<HeroNetworkVisualInner />, target);
}
