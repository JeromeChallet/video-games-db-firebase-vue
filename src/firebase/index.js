import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBYp-r5ZNQClBboELZZm8tcsrcDbyTfq1s',
  authDomain: 'gamedb-c6944.firebaseapp.com',
  projectId: 'gamedb-c6944',
  storageBucket: 'gamedb-c6944.appspot.com',
  messagingSenderId: '945950273498',
  appId: '1:945950273498:web:b794ce0a42d9f6ea821ae3'
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }