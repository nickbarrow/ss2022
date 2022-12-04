import { redirect } from "@sveltejs/kit";
import { auth, groupsRef } from "../../lib/server/firebase";
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

export const actions = {
    Search: async ({ request }) => {
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
    }
};