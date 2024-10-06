
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAMmI7oTomIDm02nvZh38H5hB0jNLsPUU0",
  authDomain: "mern-ecommerce-2024-a668e.firebaseapp.com",
  projectId: "mern-ecommerce-2024-a668e",
  storageBucket: "mern-ecommerce-2024-a668e.appspot.com",
  messagingSenderId: "580483761935",
  appId: "1:580483761935:web:2008d60a6a8d9f8026a07a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app)