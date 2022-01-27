import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyATtHCSr_4mPk8iCn8xbzpUztOypy3SvPA",
  authDomain: "firecommerce-6dbf4.firebaseapp.com",
  projectId: "firecommerce-6dbf4",
  storageBucket: "firecommerce-6dbf4.appspot.com",
  messagingSenderId: "807542878757",
  appId: "1:807542878757:web:e80ef49370ec1543ab85cc",
  measurementId: "G-V2YMWVQYBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const analytics = getAnalytics(app);

export default fireDB;