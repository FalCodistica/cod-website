import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the team — Codistica",
  description: "Submit your profile to join Codistica.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
