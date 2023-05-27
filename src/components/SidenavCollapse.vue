<template>
	<router-link class="nav-link" :to="to" v-bind="$attrs">
		<div
			class="
				text-center
				bg-white
				shadow
				icon icon-shape
				border-radius-md
				d-flex
				align-items-center
				justify-content-center
			"
		>
			<slot name="icon"></slot>
		</div>
		<span class="nav-link-text me-1 text-menu">{{ navText }}</span>
	</router-link>
</template>
<script>
	export default {
		name: "sidenav-collapse",
		props: {
			to: {
				type: [Object, String],
				required: true,
			},
			navText: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				isExpanded: false,
			};
		},
	};
</script>
<style lang="scss" scoped>
	.icon {
		margin-left: 8px;
	}
	.text-menu {
		margin-top: 2px;
	}
</style>
