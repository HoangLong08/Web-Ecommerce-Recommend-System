export default function authHeader() {
	const user = JSON.parse(localStorage.getItem('infoAccount'));
	if (user && user.accessToken) {
		return { authorization: 'Bearer ' + user.accessToken };
	} else {
		return {};
	}
}