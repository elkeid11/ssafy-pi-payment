# SSAFY 데스크 원본 연결 상태

## 현재 결론

SSAFY 앱은 `/ssafy_summary.json`을 읽도록 연결되어 있다.

현재 마지막 미완료 단계는 데스크 PC에서 생성한 최신 `ssafy_summary.json`을 이 저장소의 `ssafy_summary.json` 파일에 실제 반영하는 것이다.

## 현재 완료

- SSAFY Vercel 앱 배포 완료
- `index.html`에서 `/ssafy_summary.json` fetch 구조 반영 완료
- 저장소 루트에 `ssafy_summary.json` placeholder 생성 완료
- SSAFY 앱은 정보확인용 모바일 뷰어로 구성됨
- 실거래/주문 실행/웹훅 실행 기능 없음

## 남은 연결 고리

데스크 원본에서 생성한 JSON을 아래 파일에 반영해야 한다.

```text
elkeid11/ssafy-pi-payment/ssafy_summary.json
```

반영되면 Vercel이 자동 배포하고, 폰의 SSAFY 앱에서 최신 데이터가 표시된다.

## 권장 자동 반영 방식

데스크 PC에서:

```powershell
$env:GITHUB_TOKEN="여기에 GitHub token 입력"
python C:\__코인\_tools\push_ssafy_summary.py
```

토큰 권한은 최소 권한만 사용한다.

```text
Repository: elkeid11/ssafy-pi-payment
Permission: Contents Read and Write
```

## 토큰 없이 수동 반영하는 대체 방식

토큰 발급이 어렵다면, 데스크에서 생성된 `ssafy_summary.json`의 전체 내용을 회장 채팅방에 붙여넣고, ChatGPT가 GitHub 저장소의 `ssafy_summary.json`을 업데이트할 수 있다.

단, JSON 안에는 아래 항목이 없어야 한다.

- API Key
- Secret
- 거래소 주문 정보
- 웹훅 실행 URL
- 지갑/비밀구절
- 개인정보

## 운영 원칙

- SSAFY는 실거래용이 아니다.
- SSAFY는 데스크 원본을 폰에서 확인하는 모바일 뷰어다.
- 데스크가 Source of Truth다.
- SSAFY는 원본을 표시만 한다.
- `trading_enabled`는 반드시 `false`로 유지한다.

## 확인 URL

```text
https://ssafy-pi-payment.vercel.app/ssafy_summary.json
https://ssafy-pi-payment.vercel.app?v=14
```

## 상태 표

| 항목 | 상태 |
|---|---|
| 데스크 export | 준비 완료 |
| SSAFY fetch | 완료 |
| GitHub summary placeholder | 완료 |
| 실제 데스크 JSON 반영 | 대기 |
| Vercel 자동 반영 | GitHub 업데이트 후 자동 |
| 폰 표시 | GitHub 업데이트 후 확인 |
