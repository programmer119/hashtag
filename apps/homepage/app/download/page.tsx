export default function DownloadPage() {
  return (
    <article className="legal-page">
      <header>
        <p className="eyebrow">Download</p>
        <h1>Hashdate 앱 다운로드</h1>
        <p className="lead">
          현재 테스트용 Android APK를 먼저 제공합니다. 정식 스토어 링크는
          심사와 배포 준비가 끝난 뒤 연결됩니다.
        </p>
        <div className="button-row">
          <a className="button" href="https://cruise.suaveforge.com/app-debug.apk">
            Android APK 다운로드
          </a>
          <a className="button secondary" href="https://cruise.suaveforge.com/app-debug.apk">
            앱 파일 받기
          </a>
        </div>
      </header>

      <div className="grid-3">
        <section className="policy-card">
          <h2>1. 계정 만들기</h2>
          <p>
            앱을 설치한 뒤 회원가입을 진행하고 필요한 검증 절차를 완료합니다.
          </p>
        </section>
        <section className="policy-card">
          <h2>2. 프로필 작성</h2>
          <p>
            사진, 관심사, 직업, 소개, 만남 의향을 입력하고 심사를 요청합니다.
          </p>
        </section>
        <section className="policy-card">
          <h2>3. 매칭 시작</h2>
          <p>
            승인된 회원을 확인하고 관심을 보내며 상호 매칭 후 대화를 시작합니다.
          </p>
        </section>
      </div>
    </article>
  );
}
