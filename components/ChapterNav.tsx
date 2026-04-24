"use client";

import { useEffect, useRef, useState } from "react";

type Chapter = {
  id: string;
  label: string;
  target: string;
  sections: string[];
};

const CHAPTERS: Chapter[] = [
  {
    id: "overview",
    label: "Overview",
    target: "slide-01",
    sections: ["slide-01"]
  },
  {
    id: "problem",
    label: "Problem",
    target: "slide-02",
    sections: ["slide-02", "slide-07"]
  },
  {
    id: "services",
    label: "Services",
    target: "slide-03",
    sections: ["slide-03", "slide-04", "slide-05", "slide-06", "slide-08"]
  },
  {
    id: "cases",
    label: "Case Studies",
    target: "slide-09",
    sections: ["slide-09", "slide-10", "slide-11", "slide-12", "slide-13"]
  },
  {
    id: "delivery",
    label: "Delivery Model",
    target: "slide-14",
    sections: ["slide-14", "slide-15", "slide-16"]
  },
  {
    id: "next",
    label: "Next Steps",
    target: "slide-17",
    sections: ["slide-17", "slide-18"]
  }
];

const SECTION_TO_CHAPTER = new Map<string, string>();
for (const chapter of CHAPTERS) {
  for (const slide of chapter.sections) {
    SECTION_TO_CHAPTER.set(slide, chapter.id);
  }
}

export function ChapterNav() {
  const [activeId, setActiveId] = useState<string>(CHAPTERS[0].id);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    const slides = CHAPTERS.flatMap((c) =>
      c.sections
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
    );

    if (slides.length === 0) return;

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(entry.target.id, entry.intersectionRatio);
        }
        let topId = "";
        let topRatio = 0;
        for (const [id, ratio] of visibleRatios) {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        }
        const chapterId = SECTION_TO_CHAPTER.get(topId);
        if (chapterId) setActiveId(chapterId);
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    );

    slides.forEach((slide) => observer.observe(slide));

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;
        const nav = navRef.current;
        const hovered = nav?.matches(":hover") ?? false;
        const focused = nav?.contains(document.activeElement) ?? false;

        if (y < 120) {
          setHidden(false);
        } else if (!hovered && !focused) {
          if (delta > 6) setHidden(true);
          else if (delta < -6) setHidden(false);
        }
        lastScrollY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    lastScrollY.current = window.scrollY;

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.getElementById(target);
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });
  };

  return (
    <nav
      ref={navRef}
      className={`chapter-nav${hidden ? " is-hidden" : ""}${
        mounted ? " is-mounted" : ""
      }`}
      aria-label="Deck chapters"
    >
      <ul className="chapter-nav-list">
        {CHAPTERS.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.target}`}
              className={`chapter-nav-link${
                activeId === chapter.id ? " is-active" : ""
              }`}
              aria-current={activeId === chapter.id ? "true" : undefined}
              onClick={(e) => onClick(e, chapter.target)}
            >
              {chapter.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
