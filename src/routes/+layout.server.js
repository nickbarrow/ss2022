// /** @type {import('./$types').LayoutServerLoad} */
// export async function load({ cookies }) {
// 	onAuthStateChanged(
// 		auth,
// 		(user) => {
// 			session.set({ user });
// 		},
// 		(error) => {
// 			session.set({ user: null });
// 			console.log(error);
// 		}
// 	);

// 	return {
// 		user: await db.getUser(request.headers.get('cookie'))
// 	};
// }