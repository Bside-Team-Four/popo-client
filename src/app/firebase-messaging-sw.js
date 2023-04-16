import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APP_FCM_API_KEY,
  authDomain: 'popo-cf372.firebaseapp.com',
  projectId: 'popo-cf372',
  storageBucket: 'popo-cf372.appspot.com',
  messagingSenderId: '548796593141',
  appId: '1:548796593141:web:b6d3efacfc8e39282166bc',
  measurementId: 'G-FZSWN07FE6',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default async function requestPermission() {
  console.log('권한 요청 중...');

  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('알림 권한 허용 안됨');
    return;
  }

  console.log('알림 권한이 허용됨');

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_APP_FCM_VAPID_KEY,
  });

  if (token) console.log('token: ', token);
  else console.log('Can not get Token');

  onMessage(messaging, (payload) => {
    console.log('메시지가 도착했습니다.', payload);
  });
}

requestPermission();
