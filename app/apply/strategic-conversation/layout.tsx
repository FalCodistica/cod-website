import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Start a strategic conversation",
  description: "Begin an investment or partnership conversation with Codistica.",
  path: "/apply/strategic-conversation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
