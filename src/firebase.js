import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNRAiWBZKy4CTbOkYAb2yMpp8IuQ5mZsw",
  authDomain: "csc675-5cec2.firebaseapp.com",
  projectId: "csc675-5cec2",
  storageBucket: "csc675-5cec2.appspot.com",
  messagingSenderId: "648865906286",
  appId: "1:648865906286:web:da4b45d30f54482d88f07f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);