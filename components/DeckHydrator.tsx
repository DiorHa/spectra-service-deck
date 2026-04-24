"use client";

import { useEffect, useRef } from "react";
import { ChapterNav } from "@/components/ChapterNav";
import { HeroNetworkVisual } from "@/components/HeroNetworkVisual";

type DeckHydratorProps = {
  html: string;
};

export function DeckHydrator({ html }: DeckHydratorProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const slides = Array.from(root.querySelectorAll<HTMLElement>(".slide"));

    const goToSlide = (index: number) => {
      const target = slides[Math.max(0, Math.min(index, slides.length - 1))];
      if (target) {
        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start"
        });
      }
    };

    const currentSlideIndex = () => {
      const midpoint = window.scrollY + window.innerHeight / 2;
      return slides.findIndex(
        (slide) =>
          midpoint >= slide.offsetTop &&
          midpoint < slide.offsetTop + slide.offsetHeight
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          (document.activeElement?.tagName ?? "").toUpperCase()
        )
      ) {
        return;
      }

      const activeIndex = Math.max(0, currentSlideIndex());

      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToSlide(slides.length - 1);
      }
    };

    let observer: IntersectionObserver | null = null;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      slides.forEach((slide) => slide.classList.add("is-visible"));
    } else {
      document.body.classList.add("motion-ready");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.28 }
      );

      slides.forEach((slide) => observer?.observe(slide));
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      observer?.disconnect();
      document.body.classList.remove("motion-ready");
    };
  }, []);

  return (
    <>
      <ChapterNav />
      <main
        ref={ref}
        className="deck-page"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <HeroNetworkVisual />
    </>
  );
}
