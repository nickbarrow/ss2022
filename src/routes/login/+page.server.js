import { redirect } from '@sveltejs/kit';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../lib/server/firebase';

// Redirect logged in user to homepage.
export async function load({ params }) {
    if (auth.currentUser) throw redirect(300, '/groups');
}

export const actions = {
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
        return { success: true };
    }
};