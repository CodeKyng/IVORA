import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "IVORA — Custom Business Automation Systems",
  description:
    "IVORA designs and builds custom automation systems that eliminate repetitive work, connect your tools, and scale operations without a large tech team.",
  keywords: [
    "business automation",
    "workflow automation",
    "CRM automation",
    "process automation",
    "IVORA",
  ],
  openGraph: {
    title: "IVORA — Intelligence Value Operation and Reliable Automation",
    description:
      "Custom automation systems that save hours, reduce errors, and connect your entire stack.",
    type: "website",
  },
  icons: {
    icon: "/logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
