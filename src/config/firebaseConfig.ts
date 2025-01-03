// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCtjpzZG7m4PTJVlfw-RTynaPVd32F7q5U", // From `current_key` under `api_key`
    authDomain: "my-application-a72b6.firebaseapp.com", // Combine `project_id` with `firebaseapp.com`
    projectId: "my-application-a72b6", // From `project_id`
    storageBucket: "my-application-a72b6.firebasestorage.app", // From `storage_bucket`
    messagingSenderId: "175479935506", // From `project_number`
    appId: "1:175479935506:android:392ab02c117836b9f6becb", // From `mobilesdk_app_id`
  };
  

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
