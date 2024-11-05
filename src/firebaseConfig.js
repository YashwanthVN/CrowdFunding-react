import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMFeLKfeNVLRk1kuXe7wACM2scaYftofA",
  authDomain: "crowdfunding-platform-4ffd2.firebaseapp.com",
  projectId: "crowdfunding-platform-4ffd2",
  storageBucket: "crowdfunding-platform-4ffd2.appspot.co",
  messagingSenderId: "950339387376",
  appId: "1:950339387376:web:707436d20788e2c66ba735",
  measurementId: "G-FDBFD5944Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 