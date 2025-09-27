import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import siteConfig from "@/lib/site-config";

const robotoMonoBold = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/RobotoMono-Bold.ttf")
);

export function GET(req: NextRequest) {
  try {
    const fontBold = robotoMonoBold;

    const { searchParams } = req.nextUrl;
    const titleParam = searchParams.get("title");

    const siteTitle = titleParam ? titleParam : siteConfig.title;
    const siteDescription = siteConfig.description;
    const maxTitleLength = 100;

    const heading =
      siteTitle.length > maxTitleLength
        ? `${siteTitle.slice(0, maxTitleLength)}...`
        : siteTitle;

    return new ImageResponse(
      <div
        style={{
          padding: "2.5rem 5rem",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 700, lineHeight: "1" }}>
          {heading}
        </h1>
        <p>{siteDescription}</p>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Roboto Mono",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <"log catch error">
    console.error(error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
