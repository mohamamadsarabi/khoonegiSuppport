<template>
	<nav aria-label=" khoonegi-breadcrumb">
		<ol class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb">
			<li class="text-sm breadcrumb-item title-fix active" :class="textWhite">
				<span :class="textWhite" class="opacity-5 ps-2">پنل مدیریت خونگی</span>
			</li>
			<li
				v-if="currentRouteName.name"
				class="text-sm breadcrumb-item"
				aria-current="page"
			>
				<button @click="routeLink" class="text-sm breadcrumb-item">
					{{ currentRouteName.name }}
				</button>
			</li>
			<li
				v-if="paramCurrentRouteName"
				class="text-sm breadcrumb-item font-weight-bold last-item"
				aria-current="page"
			>
				{{ paramCurrentRouteName }}
			</li>
		</ol>
	</nav>
</template>

<script>
	export default {
		name: "breadcrumbs",
		props: {
			currentPage: {
				required: true,
			},
			paramCurrentPage: {
				required: true,
			},
			textWhite: {
				type: String,
			},
		},

		computed: {
			currentRouteName() {
				return this.$route;
			},

			paramCurrentRouteName() {
				return this.$route.params.name;
			},
		},
		methods: {
			routeLink() {
				return this.$router.back();
			},
		},
	};
</script>
<style lang="scss" scoped>
	.breadcrumb {
		@media (max-width: 768px) {
			align-items: end;
		}
		.last-item:last-child {
			color: #2f2a43 !important;
		}
	}
	.breadcrumb-item.title-fix {
		@media (max-width: 768px) {
			display: none;
		}
	}
	.breadcrumb-item {
		color: #979797 !important;
		padding-left: 0.5rem;
		&:last-child {
			&::before {
				display: none;
			}
		}
		&::before {
			content: url("../assets/img/arrows/arrow-left.svg") !important;
			float: left !important;
			padding-left: 0 !important;
			color: #6c757d;
		}
	}
</style>
