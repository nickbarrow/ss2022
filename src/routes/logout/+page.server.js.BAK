import { redirect } from '@sveltejs/kit';
import { auth } from '../../lib/server/firebase';

// Log out and redirect logged in user.
export async function load({ params }) {
    if (auth.currentUser) auth.signOut();
    throw redirect(300, '/');
}

export const actions = {
    default: async ({ request }) => {
        if (auth.currentUser) auth.signOut();
        throw redirect(300, '/');
    }
};