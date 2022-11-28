import { redirect, invalid, error } from "@sveltejs/kit";
import { auth, db, usersRef } from "../../../lib/server/firebase";
import { doc, getDoc, getDocs, setDoc, query, where, updateDoc } from "firebase/firestore";

export async function load({ params }) {
    if (!auth.currentUser) throw redirect(300, '/login');

    const groupRef = doc(db, "groups", params.slug);
    const groupSnap = await getDoc(groupRef);
    if (!groupSnap.exists()) throw error(404, 'not found');

    return {
        user: auth.currentUser.toJSON(),
        group: {
            id: groupSnap.id,
            ...groupSnap.data()
        }
    }
};



export const actions = {
    joinGroup: async ({ request }) => {
        const data = await request.formData(),
            GroupID = data.get('GroupID'),
            SecretCode = data.get('SecretCode') || "",
            Wishlist = data.get('Wishlist');
        
        // if (!SecretCode) return invalid(400, { SecretCode: { empty: true } });

        const groupRef = doc(db, "groups", GroupID),
            groupSnap = await getDoc(groupRef);

        if (!groupSnap.exists()) return invalid(404);

        var group = groupSnap.data();
        if (group.SecretCode && group.SecretCode !== "" && !SecretCode)
            return invalid(400, { SecretCode: { invalid: true } });

        if (SecretCode == group.SecretCode) {
            group.Members.push({
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                wishlist: Wishlist
            });
            await setDoc(doc(db, "groups", groupSnap.id), group);
            // console.log(group.SecretCode, SecretCode);
            return { success: true };
        } else return invalid(400, { SecretCode: { invalid: true } });
    },
    GenerateMatches: async ({ request }) => {
        const data = await request.formData(),
            GroupID = data.get('GroupID');


        const groupRef = doc(db, "groups", GroupID);
        const groupSnap = await getDoc(groupRef);
        const group = groupSnap.data();

        // console.log(group.Members)
        let finish = false;

        while (!finish) {
            try {
                let santas = [...group.Members],
                    hat = [...group.Members];
                
                santas.forEach((santa, index) => {
                    // Restrict to only valid choices (ignore self and blocked matches).
                    let validChoices = hat.filter(member => member.uid != santa.uid);
                    if (!validChoices.length) throw `No matches for ${santa.uid}!`;
                    // Choose random member.
                    let r = Math.floor(Math.random() * validChoices.length);
                    santas[index]['recipient'] = {
                        uid: validChoices[r].uid,
                        displayName: validChoices[r].displayName,
                        photoURL: validChoices[r].photoURL,
                        wishlist: validChoices[r].wishlist
                    };
                    // Remove choice from hat.
                    hat.splice(hat.findIndex(member => member.uid == validChoices[r].uid), 1);
                });

                group.Members = [...santas];
                finish = true;
            } catch (e) {
                console.log('Error: Reattempting matchmaking...');
            }
        }

        // console.log('Done, updating group...');
        // console.log(group.Members);
        await updateDoc(groupRef, {
            MatchesGenerated: true,
            Members: group.Members
        });
        return { success: true };
    }
};