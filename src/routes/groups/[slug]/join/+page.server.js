import { fail, redirect } from "@sveltejs/kit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "$lib/server/firebase";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData(),
            GroupID = data.get('GroupID'),
            UserID = data.get('UserID'),
            UserDisplayName = data.get('UserDisplayName'),
            UserPhotoURL = data.get('UserPhotoURL'),
            SecretCode = data.get('SecretCode') || "",
            Wishlist = data.get('Wishlist');
        
        if (!GroupID || !UserID || !UserDisplayName || !UserPhotoURL) return fail(400, { error: "Form invalid" });

        const groupRef = doc(db, "groups", GroupID),
            groupSnap = await getDoc(groupRef);

        if (!groupSnap.exists()) return fail(404);

        var group = groupSnap.data();
        if (group.SecretCode && group.SecretCode !== "" && !SecretCode)
            return fail(400, { SecretCode: { empty: true } });

        if (SecretCode == group.SecretCode) {
            group.Members.push({
                uid: UserID,
                displayName: UserDisplayName,
                photoURL: UserPhotoURL,
                wishlist: Wishlist
            });
            await setDoc(doc(db, "groups", GroupID), group)
                .catch(err => { return { success: false, error: err } });
            throw redirect(300, `/groups/${GroupID}`);
        } else return fail(400, { SecretCode: { invalid: true } });
    }
};