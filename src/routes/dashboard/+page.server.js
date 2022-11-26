import { redirect, invalid } from "@sveltejs/kit";
import { auth, groupsRef, db } from "../../lib/server/firebase";
import { getDocs, collection, query, where, addDoc, getCountFromServer, updateDoc, doc } from "firebase/firestore";

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


export const actions = {
    groupSearch: async ({ request }) => {
        const data = await request.formData();
        const GroupName = data.get('GroupName');

        let groupsSnapshot = await getDocs(groupsRef), groups = [];
        groupsSnapshot.forEach(snapshot => {
            groups.push({
                id: snapshot.id,
                ...snapshot.data()
            });
        });

        if (GroupName) groups = groups.filter((group) => group.Name.toLowerCase().includes(GroupName) );

        return {
            groups
        }
    },
    createGroup: async ({ request }) => {
        const data = await request.formData(),
            GroupName = data.get('GroupName'),
            SecretCode = data.get('SecretCode'),
            Wishlist = data.get('Wishlist');

        if (!GroupName) return invalid(400, { GroupName: { empty: true } });
        // if (!SecretCode) return invalid(400, { SecretCode: { empty: true } });

        const nameCheckQuery = query(groupsRef, where('Name', '==', GroupName)),
            nameCheckSnapshot = await getCountFromServer(nameCheckQuery),
            nameCheckCount = nameCheckSnapshot.data().count;

        // console.log("name check: ", nameCheckCount);
        if (nameCheckCount != 0) {
            return invalid(400, { GroupName: { taken: true } });
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