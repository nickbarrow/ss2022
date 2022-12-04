import { error, redirect } from "@sveltejs/kit";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "$lib/firebaseClient";

export async function load({ params }) {
    if (!auth.currentUser) throw redirect('300', '/login');

    const groupRef = doc(db, "groups", params.slug);
    const groupSnap = await getDoc(groupRef);
    if (!groupSnap.exists()) throw error(404, 'not found');

    let user = auth.currentUser,
        group = {
            id: groupSnap.id,
            ...groupSnap.data()
        },
        inGroup = group.Members.find(member => member.uid == user.uid);
    
    if (inGroup) {
        console.log('Already in group, redirecting...');
        throw redirect('300', `/groups/${params.slug}`);
    }

    return {
        user,
        group
    }
};