export const siteConfig = {
  name: "RideShare",
  description: "A modern ride-sharing platform",
  url: "http://localhost:3000",
  ogImage: "http://localhost:3000/og.jpg",
  links: {
    twitter: "https://twitter.com/rideshare",
    github: "https://github.com/rideshare",
  },
  creator: "RideShare Team",
} as const;

export type SiteConfig = typeof siteConfig;
