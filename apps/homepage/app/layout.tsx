import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Hashdate",
  description: "검증 기반 프리미엄 데이팅 앱 Hashdate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
