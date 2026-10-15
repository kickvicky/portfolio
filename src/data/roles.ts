import type { Accent } from "@/lib/theme";

export type Role = {
  date: string;
  title: string;
  company: string;
  copy: string;
  color: Accent;
  /** Short, scannable wins shown as chips under the copy (keep each under ~24 characters). */
  highlights: string[];
};

export const roles: Role[] = [
  {
    date: "JUL 2023—NOW",
    title: "SOFTWARE DEVELOPER ENGINEER 2", // non-breaking space: keeps "2" off its own line on mobile
    company: "WALMART GLOBAL TECH · BENGALURU",
    copy: "Building resilient post-transaction systems for Walmart.com: on-demand driver number masking for Live Order Tracking, the Live Shop substitution UI, and AI tooling that automates QA setup.",
    color: "yellow",
    highlights: ["$400K / YEAR SAVED", "−90% TWILIO API CALLS", "BRAVO AWARD 2025", "3× EXCELLENCE BADGES"],
  },
  {
    date: "JAN—JUN 2023",
    title: "SOFTWARE ENGINEER INTERN",
    company: "WALMART GLOBAL TECH · BENGALURU",
    copy: "Halved upstream traffic for Live Order Tracking with dynamic polling and leaner GraphQL payloads, and automated P1 release checks with TestCafe and Jenkins.",
    color: "lime",
    highlights: ["3.1M → 1.58M CALLS / DAY", "ZERO-TOUCH P1 CHECKS"],
  },
  {
    date: "NOV—DEC 2021",
    title: "RESEARCH INTERN",
    company: "BLOOMSCOPE · IIT BOMBAY (REMOTE)",
    copy: "Helped take BloomScope, an EdTech assessment tool researched at IIT Bombay, from requirements and UI sketches to a deployed phase-1 prototype: a quiz portal that scores students on reasoning, aptitude, and memory, not just marks, with interactive Chart.js results.",
    color: "pink",
    highlights: ["PHASE-1 DEPLOYED", "REACT · FLASK · SQL"],
  },
];
