import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import './registerServiceWorker';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// add firebase
import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuHnGCmlKYQGBFFuKRsbz0xLQHomk-tyQ",
  authDomain: "on-call-5e00c.firebaseapp.com",
  projectId: "on-call-5e00c",
  storageBucket: "on-call-5e00c.appspot.com",
  messagingSenderId: "306712776551",
  appId: "1:306712776551:web:3e4b4e9dc5aadeb25da9c2",
  measurementId: "G-LHTC415CXT"
};

const firestoreApp = initializeApp(firebaseConfig);

export const db = getFirestore(firestoreApp);
export const auth = getAuth(firestoreApp);

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});