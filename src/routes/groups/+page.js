import { goto } from "$app/navigation";
import { auth, groupsRef } from "$lib/firebaseClient";
import { redirect } from "@sveltejs/kit";
import { getDocs } from "firebase/firestore";

export async function load({ params }) {
    if (!auth.currentUser) throw redirect(300, '/login');

    let groupsSnapshot = await getDocs(groupsRef), groups = [];
    groupsSnapshot.forEach(snapshot => {
        groups.push({
            id: snapshot.id,
            ...snapshot.data()
        });
    });

    return {
        groups,
        user: auth.currentUser.toJSON()
    }
}