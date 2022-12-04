import { goto } from "$app/navigation";
import { auth } from "$lib/firebaseClient";

export function load() {
    if (auth.currentUser) {
        auth.signOut();
        goto('/');
    } else goto('/');
}