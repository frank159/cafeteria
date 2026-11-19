import type { Variants } from "framer-motion";
import { css, keyframes } from "styled-components";

/*
═════════════════════════════════════════════════════════════
CONFIGURAÇÃO CENTRAL
═════════════════════════════════════════════════════════════
*/

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const VIEW_OFFSET = "-20%";

export const DELAY = {
  base: 0,
  baseA: 0.9,
  image: 0.15,
  copy: 0.2,
  button: 0.4,
  accent: 0.7,
} as const;

export const DURATION = {
  fade: 0.8,
  line: 0.9,
  clip: 1,
  slow: 1.1,
} as const;

export const SPRING = {
  star: { stiffness: 120, damping: 14 },
  icon: { stiffness: 140, damping: 16 },
} as const;

export const HERO = {
  delayChildren: 0.15,
  stagger: 0.1,
  tagline: 1.1,
} as const;

export const TAGLINE = {
  delayChildren: 0.2,
  stagger: 0.25,
} as const;

export const MOTION_CONFIG = { reducedMotion: "user" } as const;

export const HOVER_TRANSITION = "0.2s ease";

/*
═════════════════════════════════════════════════════════════
  HELPERS
═════════════════════════════════════════════════════════════
*/

const withDelay = (delay?: number) => (delay ? { delay } : {});

export const stagger = (delayChildren = 0, staggerChildren = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

export const heroStagger = stagger(HERO.delayChildren, HERO.stagger);
export const taglineStagger = stagger(TAGLINE.delayChildren, TAGLINE.stagger);

export const inView = (delay = 0, offset = VIEW_OFFSET) =>
  ({
    initial: "hidden",
    whileInView: "visible",
    viewport: {
      once: true,
      amount: "some",
      margin: `0px 0px ${offset} 0px`,
    },
    custom: delay,
  }) as const;

export const SECTION = {
  cakes: { offset: "-50%", delayScale: 1 },
  coffee: { offset: "-5%", delayScale: 0.6 },
  room: { offset: "-50%", delayScale: 1 },
  roomB: { offset: "-30%", delayScale: 1 },
  event: { offset: "-50%", delayScale: 1 },
  eventB: { offset: "-1%", delayScale: 1 },
  contact: { offset: VIEW_OFFSET, delayScale: 1 },
} as const;

export const inViewIn = (section: keyof typeof SECTION, delay = 0, offset?: string,) =>
  inView(delay * SECTION[section].delayScale, offset ?? SECTION[section].offset);

export const onLoad = (delay = 0) =>
  ({
    initial: "hidden",
    animate: "visible",
    custom: delay,
  }) as const;

/*
═════════════════════════════════════════════════════════════
   VARIANTS
═════════════════════════════════════════════════════════════
*/

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay?: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fade, ease: EASE, ...withDelay(delay) },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: DURATION.fade, delay, ease: EASE },
  }),
};

export const lineUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: DURATION.line, ease: EASE } },
};

export const ringIn: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -35 },
  visible: (delay?: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: DURATION.slow, ease: EASE, ...withDelay(delay) },
  }),
};

export const taglineWipe: Variants = {
  hidden: { opacity: 0, clipPath: "inset(-20% 100% -20% -5%)" },
  visible: (delay = 0) => ({
    opacity: 1,
    clipPath: "inset(-20% -5% -20% -5%)",
    transition: { duration: DURATION.slow, delay, ease: EASE },
  }),
};

export const popStar: Variants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -90 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", ...SPRING.star, delay },
  }),
};

export const floatIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 14 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", ...SPRING.icon, delay },
  }),
};

const CLIP_FULL = "inset(0% 0% 0% 0%)";

const clipReveal = (hidden: string, duration: number): Variants => ({
  hidden: { opacity: 0, clipPath: hidden },
  visible: (delay = 0) => ({
    opacity: 1,
    clipPath: CLIP_FULL,
    transition: { duration, delay, ease: EASE },
  }),
});

export const clipDown = clipReveal("inset(0% 0% 99.5% 0%)", DURATION.clip);
export const clipUp = clipReveal("inset(99.5% 0% 0% 0%)", DURATION.clip);
export const clipLeft = clipReveal("inset(0% 0% 0% 99.5%)", DURATION.slow);

/*
═════════════════════════════════════════════════════════════
ANIMAÇÕES EM CSS (styled-components)
═════════════════════════════════════════════════════════════
*/

const floatKeyframes = keyframes`
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -8px; }
`;

export const floatLoop = css`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${floatKeyframes} 4s ease-in-out infinite;
  }
`;