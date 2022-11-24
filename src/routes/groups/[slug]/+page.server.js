import { redirect, error } from "@sveltejs/kit";
import { auth, db } from "../../../lib/server/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function load({ params }) {
    if (!auth.currentUser) throw redirect(300, '/login');

    const groupRef = doc(db, "groups", params.slug);
    const groupSnap = await getDoc(groupRef);
    if (groupSnap.exists()) {
        return {
            group: {
                id: groupSnap.id,
                ...groupSnap.data()
            },
            user: auth.currentUser.toJSON()
        }
    } else throw error(404, 'not found');
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
    }
};