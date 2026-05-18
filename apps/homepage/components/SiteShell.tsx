"use client";

import type { ReactNode } from "react";

const appDownloadUrl = "https://cruise.suaveforge.com/app-debug.apk";

const primaryLinks = [
  { label: "서비스 소개" },
  { label: "안전 정책" },
  { label: "고객센터" },
];

const footerLinks = [
  { label: "개인정보처리방침" },
  { label: "이용약관" },
  { label: "계정 삭제" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const showPreparing = () => {
    window.alert("개발중입니다.");
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="/" aria-label="Hashdate home">
            <span className="brand-mark">#</span>
            <span>Hashdate</span>
          </a>
          <nav className="nav" aria-label="Primary">
            {primaryLinks.map((link) => (
              <button className="nav-button" key={link.label} type="button" onClick={showPreparing}>
                {link.label}
              </button>
            ))}
            <a className="button" href={appDownloadUrl}>
              앱 다운로드
            </a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <span>(c) 2026 Hashdate. Verified dating for intentional introductions.</span>
          <nav className="footer-links" aria-label="Footer">
            {footerLinks.map((link) => (
              <button className="footer-button" key={link.label} type="button" onClick={showPreparing}>
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
