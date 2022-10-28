export default function resolveProductionUrl(document) {
 	const url = document._type == 'home' ? '' : document._type
	return `https://nux3ap.vercel.app//${url}?preview=true`
}
