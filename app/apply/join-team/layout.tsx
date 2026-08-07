import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Join the team",
  description: "Submit your profile to join Codistica.",
  path: "/apply/join-team",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
