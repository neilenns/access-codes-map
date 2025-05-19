import type { Metadata } from "next";
import LayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: "Access codes map",
  description: "Map of building access codes for gig workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The layout is a client component, so we can use a hook to check permissions of the logged in user.
  return <LayoutClient>{children}</LayoutClient>;
}
