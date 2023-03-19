import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAVZIdv9dASNDgzsKAnR5sgzdpjyM61zOk',
	authDomain: 'game-questions-ad746.firebaseapp.com',
	projectId: 'game-questions-ad746',
	storageBucket: 'game-questions-ad746.appspot.com',
	messagingSenderId: '831665970477',
	appId: '1:831665970477:web:ab1ef29541b688dc8547a4',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
