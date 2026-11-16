import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "IVORA — Custom Business Automation Systems",
  description:
    "IVORA designs and builds custom automation systems that eliminate repetitive work, connect your tools, and scale operations without a large tech team. Join the waitlist.",
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
    <html lang="en" className="dark">
      <body className="antialiased bg-[#07080f] text-slate-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
