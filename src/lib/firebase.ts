import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "planar-monitor-w8t0d",
  appId: "1:457979704510:web:5c0413acabd58535b35aef",
  apiKey: "AIzaSyAX8PQJQp1iEOWmVYoTdOvi-RTWdCVu23w",
  authDomain: "planar-monitor-w8t0d.firebaseapp.com",
  storageBucket: "planar-monitor-w8t0d.firebasestorage.app",
  messagingSenderId: "457979704510",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, "ai-studio-4d55444e-c4c8-4a97-a602-a388d913199e");
