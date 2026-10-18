const config = {
  googleTagID: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || "",
  siteURL: process.env.NEXT_PUBLIC_SITE_URL || "https://www.riselikesun.com/",
  domainName: process.env.NEXT_PUBLIC_DOMAIN_NAME || "riselikesun.com",
  calendarURL: process.env.NEXT_PUBLIC_CALENDAR_URL || "https://cal.com/riselikesun/coffee-chat",
  email: process.env.NEXT_PUBLIC_EMAIL || "suraj@riselikesun.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "https://www.linkedin.com/in/riselikesun/",
  github: process.env.NEXT_PUBLIC_GITHUB || "https://github.com/riselikesun",
  blobBaseUrl: process.env.NEXT_PUBLIC_BLOB_BASE_URL || "https://ql38x5yvjggsnkzr.public.blob.vercel-storage.com"
};

export default config;
