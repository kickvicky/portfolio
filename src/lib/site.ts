function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Vignesh Annamalai",
  title: "Vignesh Annamalai — Backend Engineer",
  description:
    "Backend Engineer at Walmart Global Tech building distributed systems with Go, Kafka, and PostGIS.",
  url: resolveSiteUrl(),
  email: "hello@vigneshannamalai.dev",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  // Only allow search engines to index the real production deployment, not Vercel previews.
  indexable: process.env.VERCEL_ENV === "production",
};
