import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access codes map",
  description: "Map of building access codes for gig workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
