// 9주차: Firebase 콘솔 > 프로젝트 설정 > 웹 앱(mylink-web)에서 복사한 설정값
// 웹 앱 설정값은 브라우저에 그대로 전달되는 공개 정보예요. 데이터 보호는 firestore.rules가 담당합니다.
// .env.local 또는 GitHub Secrets에 값을 넣으면 그 값이 우선 적용됩니다.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDKGF9IciuQxPkKPNZ53QtrWa1pjuivB4c",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mylink-project-853cf.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mylink-project-853cf",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mylink-project-853cf.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "163503454272",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:163503454272:web:d5ac08b0d7c1c8a59887a5",
};

// NEXT_PUBLIC_DEMO_MODE=1 이면 Firebase 대신 브라우저 저장소(데모 모드)를 사용
export const isFirebaseConfigured =
  process.env.NEXT_PUBLIC_DEMO_MODE !== "1" && Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
