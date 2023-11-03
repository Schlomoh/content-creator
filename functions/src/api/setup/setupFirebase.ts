import admin from "firebase-admin";
import path from "path";

// Initialize Firebase Admin SDK
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(
    path.resolve(__dirname, "../service_account.json")
  ),
});

export default adminApp;
