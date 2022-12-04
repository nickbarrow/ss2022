import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { writable } from "svelte/store";

const firebaseConfig = {
	apiKey: "AIzaSyCdvGxm3Py4ToDXt2oBOXVZlHhIaU59d6Y",
	authDomain: "ss22-ec0d5.firebaseapp.com",
	projectId: "ss22-ec0d5",
	storageBucket: "ss22-ec0d5.appspot.com",
	messagingSenderId: "116108580723",
	appId: "1:116108580723:web:15459af84f14c0a5009706",
	measurementId: "G-Q6P8WRMQP4"
};

const app = initializeApp(firebaseConfig);
console.log('Client: howdy bitch');

const auth = getAuth(app);

const db = getFirestore(app);
const groupsRef = collection(db, "groups");
const usersRef = collection(db, "users");

// const currentUser = writable(null);
// var currentUser = null;
// onAuthStateChanged(auth, (user) => {
// 	console.log("User updated: ", user?.uid);
	
// 	if (!user) currentUser.set(null);
// 	else currentUser.set(user);
// });

export {
	auth,
	db,
	groupsRef,
	usersRef,
	// currentUser
}