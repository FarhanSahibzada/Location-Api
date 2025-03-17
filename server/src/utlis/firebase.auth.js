import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey:process.env.APIKEY,
  authDomain:process.env.AUTH_DOMAIN,
  projectId:process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId:MESSEGE_SENDING_ID,
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);