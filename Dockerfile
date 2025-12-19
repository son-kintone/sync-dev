# kintone 개발 환경을 위한 Docker 이미지
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 시스템 패키지 설치
RUN apk add --no-cache \
    git \
    bash \
    curl

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# kintone-cli 전역 설치
RUN npm install -g @kintone/cli

# 개발 서버 포트 노출
EXPOSE 3000

# 개발 서버 시작
CMD ["npm", "run", "dev"]
