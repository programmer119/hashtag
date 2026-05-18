"use client";

import { useState } from "react";

const appDownloadUrl = "https://cruise.suaveforge.com/app-debug.apk";

const copy = {
  ko: {
    lang: "한",
    switchLabel: "언어 선택",
    eyebrow: "검증 기반 프리미엄 데이팅",
    title: "Hashdate",
    lead:
      "해시데이트는 신뢰할 수 있는 회원 검증, 선명한 매칭 방식, 안전한 대화를 하나로 묶은 프리미엄 데이팅 서비스입니다.",
    download: "앱 다운로드",
    safety: "안전 기준 보기",
    trust: [
      ["검증", "가입 조건과 프로필 심사"],
      ["추천", "목적이 분명한 매칭 경험"],
      ["보호", "신고와 운영 검토 체계"],
    ],
    intro: "오늘의 추천",
    profileName: "민아, 31",
    profileBody: "브랜드 디자이너, 주말 하이커, 진정성 있는 만남을 찾고 있습니다.",
    rows: [
      ["검증 상태", "완료"],
      ["만남 의향", "진지한 관계"],
      ["대화 상태", "열림"],
    ],
    whyEyebrow: "서비스 구조",
    whyTitle: "검증이 중요한 데이팅 서비스를 위한 첫 화면.",
    whyLead:
      "홈페이지는 회원이 기대하는 핵심 가치를 먼저 보여주고, 앱 다운로드와 가입 흐름으로 자연스럽게 이어지도록 설계했습니다.",
    pillars: [
      ["검증 우선", "가입 조건, 프로필 심사, 서류 확인, 운영 검토 흐름을 서비스 경험의 일부로 설계합니다."],
      ["선택형 매칭", "외모 중심, 프로필 중심, 관심사 기반 흐름을 분리해 회원이 원하는 방식으로 탐색할 수 있게 합니다."],
      ["명확한 과금", "다이아 사용, 정보 열람, 프리미엄 호감 기능을 사용자가 이해할 수 있게 안내합니다."],
    ],
    lifecycleEyebrow: "회원 여정",
    lifecycleTitle: "가입 심사부터 안전한 대화까지.",
    lifecycleLead:
      "해시데이트는 회원가입, 검증, 추천, 매칭, 채팅, 결제, 신고, 고객 지원까지 하나의 운영 흐름으로 관리합니다.",
    lifecycle: [
      ["가입 및 심사", "회원 조건 확인, 프로필 작성, 인증 서류 제출, 승인 대기 흐름."],
      ["매칭과 채팅", "추천 프로필, 관심 표시, 상호 매칭, 1:1 대화로 이어지는 흐름."],
      ["결제와 안전", "다이아 지갑, 유료 열람, 신고, 차단, 고객센터 운영 흐름."],
    ],
  },
  en: {
    lang: "EN",
    switchLabel: "Language",
    eyebrow: "Premium dating, verified by design",
    title: "Hashdate",
    lead:
      "Hashdate brings verified profiles, intentional discovery, and safer conversations into one premium dating experience.",
    download: "Download app",
    safety: "View safety standards",
    trust: [
      ["Verified", "Eligibility and profile review"],
      ["Curated", "Focused member discovery"],
      ["Protected", "Reporting and moderation"],
    ],
    intro: "Today's introduction",
    profileName: "Mina, 31",
    profileBody: "Brand designer, weekend hiker, looking for something real.",
    rows: [
      ["Verification", "Complete"],
      ["Match intent", "Long-term"],
      ["Conversation", "Unlocked"],
    ],
    whyEyebrow: "Service structure",
    whyTitle: "A public surface for a trust-heavy dating product.",
    whyLead:
      "The homepage introduces core member values first, then moves people naturally toward the app download and signup flow.",
    pillars: [
      ["Verified first", "Eligibility, profile review, document checks, and moderation are treated as part of the product experience."],
      ["Choice-based matching", "Appearance-first, profile-first, and interest-based paths let members discover people their way."],
      ["Clear monetization", "Diamond use, profile unlocks, and premium likes are explained plainly before members choose."],
    ],
    lifecycleEyebrow: "Member lifecycle",
    lifecycleTitle: "From signup review to safer conversations.",
    lifecycleLead:
      "Hashdate connects signup, verification, discovery, matching, chat, payment, reports, and support into one operating flow.",
    lifecycle: [
      ["Signup and review", "Eligibility checks, profile setup, document submission, and approval waiting states."],
      ["Matching and chat", "Recommended profiles, likes, mutual matches, and one-to-one conversations."],
      ["Payment and safety", "Diamond wallet, paid unlocks, reports, blocks, and customer support operations."],
    ],
  },
};

export default function HomePage() {
  const [language, setLanguage] = useState<"ko" | "en">("ko");
  const text = copy[language];

  const showPreparing = () => {
    window.alert("개발중입니다.");
  };

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-tools" aria-label={text.switchLabel}>
              <button
                className={language === "ko" ? "lang-button active" : "lang-button"}
                type="button"
                onClick={() => setLanguage("ko")}
              >
                한
              </button>
              <button
                className={language === "en" ? "lang-button active" : "lang-button"}
                type="button"
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
            <p className="eyebrow">{text.eyebrow}</p>
            <h1>{text.title}</h1>
            <p className="lead">{text.lead}</p>
            <div className="hero-actions">
              <a className="button" href={appDownloadUrl}>
                {text.download}
              </a>
              <button className="button secondary" type="button" onClick={showPreparing}>
                {text.safety}
              </button>
            </div>
            <div className="trust-list" aria-label="Hashdate trust signals">
              {text.trust.map(([title, body]) => (
                <div className="trust-item" key={title}>
                  {title}
                  <span>{body}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="phone-preview" aria-label="Hashdate app preview">
            <div className="phone-screen">
              <div className="match-card">
                <p className="eyebrow">{text.intro}</p>
                <strong>{text.profileName}</strong>
                <p>{text.profileBody}</p>
              </div>
              <div className="mini-stack">
                {text.rows.map(([label, value]) => (
                  <div className="mini-row" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="eyebrow">{text.whyEyebrow}</p>
          <h2>{text.whyTitle}</h2>
          <p className="lead">{text.whyLead}</p>
        </div>
        <div className="grid-3">
          {text.pillars.map(([title, body]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="page-section">
          <div className="section-heading">
            <p className="eyebrow">{text.lifecycleEyebrow}</p>
            <h2>{text.lifecycleTitle}</h2>
            <p className="lead">{text.lifecycleLead}</p>
          </div>
          <div className="grid-3">
            {text.lifecycle.map(([title, body]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
