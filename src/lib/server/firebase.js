import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { collection, doc, getFirestore } from "firebase/firestore/lite";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

import {
	FirebaseAPIKey,
	FirebaseAuthDomain,
	FirebaseProjectID,
	FirebaseStorageBucket,
	FirebaseMessagingSenderID,
	FirebaseAppID,
	FirebaseMeasurementID
} from '$env/static/private';

const firebaseConfig = {
	apiKey: FirebaseAPIKey,
	authDomain: FirebaseAuthDomain,
	projectId: FirebaseProjectID,
	storageBucket: FirebaseStorageBucket,
	messagingSenderId: FirebaseMessagingSenderID,
	appId: FirebaseAppID,
	measurementId: FirebaseMeasurementID
};

const app = initializeApp(firebaseConfig);
console.log('howdy bitch');

const auth = getAuth(app);
const db = getFirestore(app);
// const blogCollection = collection(db, "blogs");
// const userDoc = (userId) => doc(db, "users", userId);
// const blogDoc = (blogId) => doc(db, "blogs", blogId)
const groupsRef = collection(db, "groups");
const usersRef = collection(db, "users");

export {
	auth,
	db,
	groupsRef,
	usersRef
}