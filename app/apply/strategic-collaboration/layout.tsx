import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Develop your project with Codistica — Codistica",
  description: "Propose a strategic collaboration with Codistica.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
