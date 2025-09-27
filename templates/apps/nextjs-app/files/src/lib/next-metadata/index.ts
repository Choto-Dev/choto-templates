import type { Metadata } from "next";
import baseUrl from "@/lib/base-url";
import siteConfig from "@/lib/site-config";

export default function nextMetadata(
  title?: string,
  description?: string
): Metadata {
  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", title ? title : siteConfig.title);

  return {
    title: title ? `${title} - ${siteConfig.title}` : siteConfig.title,
    description: description ? description : siteConfig.description,
    authors: siteConfig.author,
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [
        { url: "/icons/favicon.ico" },
        new URL("/icons/favicon.ico", baseUrl),
        { url: "/icons/favicon-16x16.png", sizes: "16x16" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32" },
      ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      type: "website",
      url: siteConfig.author.url,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: siteConfig.title,
        },
      ],
    },
  };
}
