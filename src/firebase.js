import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB-guo4V4TMoI1QT0CBm36JQWSVhNeeEr8',
  authDomain: 'linkedin-e482c.firebaseapp.com',
  projectId: 'linkedin-e482c',
  storageBucket: 'linkedin-e482c.appspot.com',
  messagingSenderId: '1096746855269',
  appId: '1:1096746855269:web:490b8eae1e6597cb130f8c',
  measurementId: 'G-FKCD5MX1BD',
}

/* ----------------------------------------------------
--------------- FOR FIREBASE VER. 8.X.X ---------------
-------------------------------------------------------
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'


// Инициализируем приложение firebase, передавая конфиги
const firebaseApp = initializeApp(firebaseConfig)

// Создаем экземпляр Базы данных, связанный с БД в облаке
const db = getFirestore(firebaseApp)

// И подключаем авторизацию
// Документация https://firebase.google.com/docs/auth/web/custom-auth
const auth = getAuth(firebaseApp)

export { db, auth }
---------------------------------------------------- */

// Инициализируем приложение firebase, передавая конфиги
const firebaseApp = firebase.initializeApp(firebaseConfig)

// Создаем экземпляр Базы данных, связанный с БД в облаке
const db = firebaseApp.firestore()

// И подключаем авторизацию
// Документация https://firebase.google.com/docs/auth/web/custom-auth
const auth = firebase.auth()

export { db, auth }
