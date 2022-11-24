import { redirect, invalid } from "@sveltejs/kit";
import { auth, groupsRef, db } from "../../lib/server/firebase";
import { getDocs, collection, query, where, addDoc, getCountFromServer } from "firebase/firestore";

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
            groups.push(snapshot.data());
        });
        groups = groups.filter((group) => group.Name.toLowerCase().includes(GroupName) );

        return {
            groups
        }
    },
    createGroup: async ({ request }) => {
        const data = await request.formData();
        const GroupName = data.get('GroupName');
        const SecretCode = data.get('SecretCode');

        if (!GroupName) return invalid(400, { GroupName: { empty: true } });
        if (!SecretCode) return invalid(400, { SecretCode: { empty: true } });

        const nameCheckQuery = query(groupsRef, where('Name', '==', GroupName));
        const nameCheckSnapshot = await getCountFromServer(nameCheckQuery);
        const nameCheckCount = nameCheckSnapshot.data().count; // if check query fails fallback to 1 to fail submit
        console.log("name check: ", nameCheckCount);
        if (nameCheckCount != 0) {
            return invalid(400, { GroupName: { taken: true } });
        }
        
        const groupRef = await addDoc(collection(db, "groups"), {
            Name: GroupName,
            Owner: auth.currentUser.uid,
            SecretCode: SecretCode,
            Members: [auth.currentUser.uid]
        });
        
        throw redirect(300, `/groups/${groupRef.id}`);
    }
};