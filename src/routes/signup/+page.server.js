import { invalid, redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/server/firebase';

// Redirect logged in user to dashboard.
export async function load({ params }) {
    if (auth.currentUser) throw redirect(300, '/dashboard');
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('Email');
        const password = data.get('Password');

        if (!email) return invalid(400, { email: { empty: true } });
        if (!password) return invalid(400, { password: { empty: true } });

        try {
			let user = await createUserWithEmailAndPassword(auth, email, password);
            // console.log(user);
        } catch (e) {
            console.log(e);

            switch (e.code) {
                case 'auth/invalid-email':
                    return invalid(400, { email: { invalid: true } });
                    break;
                case 'auth/email-already-in-use':
                    return invalid(400, { email: { unavailable: true } });
                    break;
                case 'auth/weak-password':
                    return invalid(400, { password: { weak: true } });
                    break;
                default:
                    return invalid(400);
            }
        }

        throw redirect(300, '/dashboard');
    }
};