# kintone 로컬 개발 환경 🚀

Docker 기반의 kintone 커스터마이제이션 개발 환경과 GitHub Actions를 통한 자동 배포 시스템입니다.

## 📋 목차

- [특징](#특징)
- [사전 요구사항](#사전-요구사항)
- [빠른 시작](#빠른-시작)
- [프로젝트 구조](#프로젝트-구조)
- [개발 가이드](#개발-가이드)
- [배포 가이드](#배포-가이드)
- [GitHub Actions CI/CD](#github-actions-cicd)
- [문제 해결](#문제-해결)

## ✨ 특징

- 🐳 **Docker 기반 개발 환경** - 간단한 설정으로 즉시 개발 시작
- 🔄 **핫 리로드** - 코드 변경 시 자동 새로고침
- 🎨 **코드 품질 관리** - ESLint, Prettier, Stylelint 통합
- 🤖 **자동화된 CI/CD** - GitHub Actions를 통한 자동 배포
- 📱 **반응형 지원** - Desktop/Mobile 환경 모두 지원
- 🔒 **보안 검사** - 자동화된 보안 취약점 검사

## 📦 사전 요구사항

시작하기 전에 다음 프로그램들이 설치되어 있어야 합니다:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (20.10 이상)
- [Node.js](https://nodejs.org/) (18.x 또는 20.x)
- [Git](https://git-scm.com/)
- kintone 계정 및 개발자 앱

## 🚀 빠른 시작

### 1. 프로젝트 클론

\`\`\`bash
git clone <your-repository-url>
cd sync-dev
\`\`\`

### 2. 환경 변수 설정

\`\`\`bash
cp .env.example .env
\`\`\`

[.env](.env) 파일을 열고 kintone 정보를 입력하세요:

\`\`\`env
KINTONE_DOMAIN=your-domain.cybozu.com
KINTONE_USERNAME=your-username
KINTONE_PASSWORD=your-password
# 또는 API 토큰 사용 (권장)
KINTONE_API_TOKEN=your-api-token
KINTONE_APP_ID=your-app-id
\`\`\`

### 3. Docker로 개발 환경 시작

\`\`\`bash
# Docker Compose로 시작
docker-compose up -d

# 로그 확인
docker-compose logs -f kintone-dev
\`\`\`

개발 서버가 시작되면:
- 개발 서버: http://localhost:3000
- Nginx 정적 서버: http://localhost:8080

### 4. 로컬에서 개발 (Docker 없이)

Docker를 사용하지 않고 로컬에서 개발하려면:

\`\`\`bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
\`\`\`

## 📁 프로젝트 구조

\`\`\`
sync-dev/
├── .github/
│   └── workflows/          # GitHub Actions 워크플로우
│       ├── ci.yml         # 지속적 통합
│       ├── pr-check.yml   # PR 검증
│       └── deploy.yml     # 자동 배포
├── config/                # kintone 앱 설정
│   ├── config.html
│   ├── config.js
│   └── config.css
├── src/                   # 소스 코드
│   ├── js/
│   │   ├── desktop.js    # Desktop 커스터마이제이션
│   │   ├── mobile.js     # Mobile 커스터마이제이션
│   │   └── utils.js      # 공통 유틸리티
│   └── css/
│       ├── desktop.css   # Desktop 스타일
│       └── mobile.css    # Mobile 스타일
├── scripts/              # 빌드 및 개발 스크립트
│   ├── dev-server.js
│   └── build.js
├── dist/                 # 빌드 출력 (자동 생성)
├── docker-compose.yml    # Docker Compose 설정
├── Dockerfile           # Docker 이미지 설정
├── package.json         # npm 패키지 설정
├── .env.example        # 환경 변수 템플릿
└── README.md           # 이 문서
\`\`\`

## 🛠️ 개발 가이드

### 개발 서버 명령어

\`\`\`bash
# 개발 서버 시작 (핫 리로드)
npm run dev

# 프로덕션 빌드
npm run build

# 코드 린트 검사
npm run lint

# JavaScript 린트
npm run lint:js

# CSS 린트
npm run lint:css

# 코드 자동 포맷팅
npm run format

# kintone에 업로드
npm run upload

# 빌드 + 업로드
npm run deploy
\`\`\`

### Docker 명령어

\`\`\`bash
# 컨테이너 시작
docker-compose up -d

# 컨테이너 중지
docker-compose down

# 컨테이너 재시작
docker-compose restart

# 로그 확인
docker-compose logs -f

# 컨테이너 내부 접속
docker-compose exec kintone-dev sh

# 전체 재빌드
docker-compose up -d --build
\`\`\`

### 코드 작성 가이드

#### JavaScript 개발

[src/js/desktop.js](src/js/desktop.js)에 Desktop용 코드를 작성하세요:

\`\`\`javascript
// 레코드 목록 화면 커스터마이제이션
kintone.events.on('app.record.index.show', function(event) {
  // 커스텀 로직 추가
  console.log('레코드 목록 화면');
  return event;
});
\`\`\`

[src/js/mobile.js](src/js/mobile.js)에 Mobile용 코드를 작성하세요:

\`\`\`javascript
// 모바일 레코드 목록 화면
kintone.events.on('mobile.app.record.index.show', function(event) {
  // 모바일 전용 로직
  return event;
});
\`\`\`

#### CSS 스타일링

[src/css/desktop.css](src/css/desktop.css)와 [src/css/mobile.css](src/css/mobile.css)에 스타일을 추가하세요.

## 🚢 배포 가이드

### 수동 배포

\`\`\`bash
# 1. 빌드
npm run build

# 2. kintone에 업로드
npm run upload
\`\`\`

### GitHub Actions 자동 배포

#### 1. GitHub Secrets 설정

GitHub 저장소 설정에서 다음 Secrets를 추가하세요:

- **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

필요한 Secrets:
- \`KINTONE_DOMAIN\`: kintone 도메인 (예: your-domain.cybozu.com)
- \`KINTONE_USERNAME\`: kintone 사용자명
- \`KINTONE_PASSWORD\`: kintone 비밀번호
- \`KINTONE_APP_ID\`: 배포할 앱 ID

#### 2. 자동 배포 프로세스

1. **코드 작성 및 커밋**
   \`\`\`bash
   git add .
   git commit -m "feat: 새로운 기능 추가"
   \`\`\`

2. **PR 생성**
   \`\`\`bash
   git checkout -b feature/new-feature
   git push origin feature/new-feature
   \`\`\`
   
   GitHub에서 PR을 생성하면 자동으로:
   - ✅ ESLint 검사
   - ✅ Stylelint 검사
   - ✅ Prettier 검사
   - ✅ 빌드 검증
   - ✅ 보안 취약점 검사
   - 📝 자동 코드 리뷰 코멘트

3. **main 브랜치에 병합**
   
   PR이 승인되고 main 브랜치에 병합되면:
   - 🔨 자동 빌드
   - 🚀 kintone에 자동 배포
   - 📢 배포 완료 알림

## 🤖 GitHub Actions CI/CD

### 워크플로우 설명

#### 1. [CI - 지속적 통합](.github/workflows/ci.yml)
- **실행 시점**: 모든 브랜치에 푸시 또는 PR 생성 시
- **작업**: Lint, 테스트, 빌드 검증
- **Node 버전**: 18, 20 (매트릭스)

#### 2. [PR Check](.github/workflows/pr-check.yml)
- **실행 시점**: PR 생성/업데이트 시
- **작업**:
  - JavaScript/CSS Lint 검사
  - 코드 포맷팅 검사
  - 보안 취약점 검사
  - 자동 코드 리뷰 코멘트
  - 변경된 파일 분석

#### 3. [Deploy to kintone](.github/workflows/deploy.yml)
- **실행 시점**: main 브랜치에 푸시 시 또는 수동 실행
- **작업**:
  - 빌드 및 검증
  - kintone에 자동 배포
  - 배포 상태 알림

### 워크플로우 트리거 방법

#### 자동 배포
\`\`\`bash
git push origin main
\`\`\`

#### 수동 배포
GitHub 저장소 → **Actions** → **Deploy to kintone** → **Run workflow**

## 🔧 문제 해결

### Docker 관련 문제

**문제**: 포트가 이미 사용 중
\`\`\`bash
# 사용 중인 포트 확인
lsof -i :3000
lsof -i :8080

# docker-compose.yml에서 포트 변경
ports:
  - "3001:3000"  # 3000 → 3001로 변경
\`\`\`

**문제**: 컨테이너가 시작되지 않음
\`\`\`bash
# 로그 확인
docker-compose logs

# 컨테이너 재빌드
docker-compose down
docker-compose up --build
\`\`\`

### kintone 배포 관련 문제

**문제**: 인증 실패
- [.env](.env) 파일의 인증 정보 확인
- API 토큰 사용 권장
- kintone 앱의 API 토큰 설정 확인

**문제**: 파일 업로드 실패
- [customize-manifest.json](customize-manifest.json) 파일 경로 확인
- 빌드 파일이 [dist/](dist/) 디렉토리에 있는지 확인

### Lint 오류

\`\`\`bash
# 자동 수정
npm run lint:fix

# 개별 수정
npm run lint:js -- --fix
npm run lint:css -- --fix
\`\`\`

## 📚 참고 자료

- [kintone 개발자 문서](https://developer.cybozu.io/hc/ko)
- [kintone JavaScript API](https://developer.cybozu.io/hc/ko/articles/201941754)
- [kintone REST API](https://developer.cybozu.io/hc/ko/articles/201941824)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Docker 문서](https://docs.docker.com/)

## 📄 라이선스

MIT License

## 🤝 기여

기여는 언제나 환영합니다! PR을 보내주세요.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

---

**Happy Coding! 🎉**
