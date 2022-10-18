<template>
	<svg height="74" viewBox="0 0 74 74" width="74" xmlns="http://www.w3.org/2000/svg">
		<path
			d="m73.08 30.97v-20.18h-7.18v-10.79h-20.18v10.79h-18.37v-10.79h-20.18v10.79h-7.17v20.18h7.17v10.34h-7.17v20.18h7.17v11.6h20.18v-11.6h18.37v11.6h20.18v-11.6h7.18v-20.18h-7.18v-10.34zm-27.36 10.34h-18.37v-10.34h18.37z"
			:fill="color"
		/>
	</svg>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: '#fff',
		},
	},
}
</script>
