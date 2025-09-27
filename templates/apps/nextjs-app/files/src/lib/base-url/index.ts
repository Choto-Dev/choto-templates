const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export type BaseUrl = typeof baseUrl;
export default baseUrl;
