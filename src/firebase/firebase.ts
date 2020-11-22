import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: 'AIzaSyAUcs7hh9FIZtfiyAjfiXdClB0qY7_Aauo',
    authDomain: 'clothes-store-cc681.firebaseapp.com',
    databaseURL: 'https://clothes-store-cc681.firebaseio.com',
    projectId: 'clothes-store-cc681',
    storageBucket: 'clothes-store-cc681.appspot.com',
    messagingSenderId: '605875862257',
    appId: '1:605875862257:web:07bd83d9428f6ce15e0750'
});

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const auth = app.auth();
export { projectStorage, projectFirestore, timestamp };
export default app;
