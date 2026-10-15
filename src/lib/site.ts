function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Vignesh Annamalai",
  title: "Vignesh Annamalai — Software Engineer",
  description:
    "Software Engineer at Walmart Global Tech building resilient, high-availability distributed systems with Java, Spring, Go, and Next.js.",
  url: resolveSiteUrl(),
  email: "vignesh.annamalai05@gmail.com",
  socials: {
    github: "https://github.com/kickvicky",
    linkedin: "https://www.linkedin.com/in/vignesh-annamalai-318757199/",
  },
  // Headline technologies: the home-page ticker shows all of them, the social preview image the first five.
  stack: [
    "Java",
    "Spring Boot",
    "Go",
    "Next.js",
    "Agentic AI",
    "MCP Servers",
    "Kafka",
    "Redis",
    "PostGIS",
    "GraphQL",
    "React",
    "TypeScript",
    "Microservices",
    "Distributed Systems",
  ],
  // Only allow search engines to index the real production deployment, not Vercel previews.
  indexable: process.env.VERCEL_ENV === "production",
};
