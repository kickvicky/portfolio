import type { Accent } from "@/lib/theme";

export type Role = {
  date: string;
  title: string;
  company: string;
  copy: string;
  color: Accent;
};

export const roles: Role[] = [
  {
    date: "2024—NOW",
    title: "SOFTWARE ENGINEER II",
    company: "WALMART GLOBAL TECH",
    copy: "Building fault-tolerant distributed systems that move inventory data at global scale.",
    color: "yellow",
  },
  {
    date: "2023—2024",
    title: "SOFTWARE ENGINEER",
    company: "WALMART GLOBAL TECH",
    copy: "Designed event-driven services and production tooling for high-volume commerce systems.",
    color: "lime",
  },
  {
    date: "SUMMER '22",
    title: "ENGINEERING INTERN",
    company: "CLOUD PLATFORM TEAM",
    copy: "Cut deployment feedback loops with internal platform automation and better observability.",
    color: "pink",
  },
];
