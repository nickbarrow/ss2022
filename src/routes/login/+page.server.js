import { invalid, redirect } from '@sveltejs/kit';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { auth, db } from '../../lib/server/firebase';

// Redirect logged in user to dashboard.
export async function load({ params }) {
    if (auth.currentUser) throw redirect(300, '/dashboard');
}

export const actions = {
    login: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('Email');
        const password = data.get('Password');

        if (!email) return invalid(400, { email: { empty: true } });
        if (!password) return invalid(400, { password: { empty: true } });

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.log(e);

            switch (e.code) {
                case 'auth/invalid-email':
                    return invalid(400, { email: { invalid: true } });
                    break;
                case 'auth/wrong-password':
                    return invalid(400, { password: { invalid: true } });
                    break;
                default:
                    return invalid(400);
            }
        }

        throw redirect(300, '/dashboard');
    },
    GoogleLogin: async ({ request }) => {
        const data = await request.formData();
        const token = data.get('token');
        if (!token) return { success: false };

        let credential = GoogleAuthProvider.credential(token);
        var userCredential = await signInWithCredential(auth, credential).catch(error => {
            return function() {
                return { success: false };
            }
        });
        
        // Update Users collection on every login.
        // await updateDoc(doc(db, "users", userCredential.user.uid), {
        //     uid: userCredential.user.uid,
        //     email: userCredential.user.email,
        //     displayName: userCredential.user.displayName,
        //     photoURL: userCredential.user.photoURL
        // });
        return { success: true };
    }
};