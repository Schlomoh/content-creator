import admin from "firebase-admin";
import serviceAccount from "../../../service_account.json";

// Initialize Firebase Admin SDK
export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
