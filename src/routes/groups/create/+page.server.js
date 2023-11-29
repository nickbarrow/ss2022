import { redirect, fail } from "@sveltejs/kit";
import { auth, groupsRef, db } from "../../../lib/server/firebase";
import { collection, query, where, addDoc, getCountFromServer } from "firebase/firestore";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData(),
            GroupName = data.get('GroupName'),
            SecretCode = data.get('SecretCode'),
            Wishlist = data.get('Wishlist');

        if (!GroupName) return fail(400, { GroupName: { empty: true } });

        // Check if group name exists already
        const nameCheckQuery = query(groupsRef, where('Name', '==', GroupName)),
            nameCheckSnapshot = await getCountFromServer(nameCheckQuery),
            nameCheckCount = nameCheckSnapshot.data().count;

        if (nameCheckCount != 0) {
            return fail(400, { GroupName: { taken: true } });
        }
        
        const groupRef = await addDoc(collection(db, "groups"), {
            Name: GroupName,
            Owner: auth.currentUser.uid,
            SecretCode: SecretCode,
            Members: [{
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                wishlist: Wishlist
            }]
        });
        
        throw redirect(300, `/groups/${groupRef.id}`);
    }
};