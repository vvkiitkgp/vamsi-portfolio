// Centralized Firebase initialization
import { initializeApp } from 'firebase/app';
import {
  getAnalytics,
  isSupported as analyticsSupported,
} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCDUL9xEp0o3iXtLTn2QuIrhbDJbcW_Y4o',
  authDomain: 'vvk-portfolio.firebaseapp.com',
  projectId: 'vvk-portfolio',
  storageBucket: 'vvk-portfolio.firebasestorage.app',
  messagingSenderId: '817518418468',
  appId: '1:817518418468:web:bfddccd5cb09ce9d4a96b1',
  measurementId: 'G-84CSVJSVWW',
};

// Initialize Firebase app
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Analytics safely (only in browser and if supported)
export const analyticsPromise =
  typeof window !== 'undefined'
    ? analyticsSupported().then((ok) => (ok ? getAnalytics(firebaseApp) : null))
    : Promise.resolve(null);
