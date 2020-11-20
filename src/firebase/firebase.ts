import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: 'AIzaSyAFA_9szlM05fYsnwCRnkOI9FuwOLYchJ8',
    authDomain: 'ninja-firegram-a898d.firebaseapp.com',
    databaseURL: 'https://ninja-firegram-a898d.firebaseio.com',
    projectId: 'ninja-firegram-a898d',
    storageBucket: 'ninja-firegram-a898d.appspot.com',
    messagingSenderId: '1055344145962',
    appId: '1:1055344145962:web:be82999d9b47e771b6f553'
});

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const auth = app.auth();
export { projectStorage, projectFirestore, timestamp };
export default app;
