# 로그인 배경 영상

로그인과 회원가입 화면에서 사용할 배경 영상을 이 폴더에 넣습니다.

현재 사용하는 4가지 날씨 배경:

- `sunny.mp4`: 맑음
- `cloudy.mp4`: 흐림과 안개
- `rain.mp4`: 비, 소나기와 뇌우
- `snow.mp4`: 눈과 눈보라

앱에서는 다음 공개 경로로 참조합니다.

```text
/videos/auth/sunny.mp4
/videos/auth/cloudy.mp4
/videos/auth/rain.mp4
/videos/auth/snow.mp4
```

Open-Meteo의 세부 날씨 코드는 `src/utils/weatherBackground.ts`에서 위 4가지 상태로 변환합니다. 모바일 데이터와 초기 로딩 시간을 고려해 영상은 짧게 반복되도록 편집하고, 소리는 제거하며, 가능한 작은 용량으로 압축합니다. 영상만으로 정보를 전달하지 않고 로그인 폼의 글자와 버튼은 별도의 HTML 요소로 표시합니다.
