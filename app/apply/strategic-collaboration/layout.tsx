import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Develop your project with Codistica",
  description: "Propose a strategic collaboration with Codistica.",
  path: "/apply/strategic-collaboration",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
