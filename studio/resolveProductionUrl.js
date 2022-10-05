export default function resolveProductionUrl(document) {
 	const url = document._type == 'home' ? '' : document._type
	return `https://womb-website.netlify.app/${url}?preview=true`
}
