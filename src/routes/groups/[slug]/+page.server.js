import { redirect, invalid } from "@sveltejs/kit";
import { auth, db, usersRef } from "../../../lib/server/firebase";
import { doc, getDoc, getDocs, setDoc, query, where } from "firebase/firestore";

export async function load({ params }) {
    if (!auth.currentUser) throw redirect(300, '/login');
    var group = null;
    const groupRef = doc(db, "groups", params.slug);
    const groupSnap = await getDoc(groupRef);
    if (groupSnap.exists()) {
        group = {
            id: groupSnap.id,
            ...groupSnap.data()
        };
    } else throw redirect(404, 'not found');

    // if (group.Members.length) {
    //     group.MembersData = [];
    //     const q = query(usersRef, where('uid', 'in', group.Members));
    //     const usersSnap = await getDocs(q);
    //     usersSnap.forEach(snapshot => {
    //         // console.log(snapshot.data())
    //         group.MembersData.push(snapshot.data());
    //     });
    // }

    return {
        user: auth.currentUser.toJSON(),
        group
    }
}


export const actions = {
    // groupSearch: async ({ request }) => {
    //     const data = await request.formData();
    //     const GroupName = data.get('GroupName');

    //     let groupsSnapshot = await getDocs(groupsRef), groups = [];
    //     groupsSnapshot.forEach(snapshot => {
    //         groups.push(snapshot.data());
    //     });
    //     groups = groups.filter((group) => group.Name.toLowerCase().includes(GroupName) );

    //     return {
    //         groups
    //     }
    // },
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
    // blockUser: async ({ request }) => {
    //     const data = await request.formData(),
    //         GroupID = data.get('GroupID'),
    //         BlockingUserID = data.get('BlockingUserID'),
    //         BlockedUser = data.get('BlockedUser');
    //     console.log(GroupID, BlockingUser, BlockedUser);
    // }
};