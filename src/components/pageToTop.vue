<template>
	<transition name="fade" mode="out-in">
		<div
			id="pagetop"
			class="fixed right-0 bottom-0"
			v-show="toTopBtn"
			@click="toTop"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#4a5568"
				stroke-width="1"
				stroke-linecap="square"
				stroke-linejoin="arcs"
			>
				<path d="M18 15l-6-6-6 6" />
			</svg>
		</div>
	</transition>
</template>
<script>
	export default {
		name: "page-top-top",
		data() {
			return {
				toTopBtn: false,
			};
		},
		mounted() {
			window.addEventListener("scroll", this.handleScroll);
		},
		methods: {
			handleScroll: function () {
				const scrollHeight = window.pageYOffset;
				if (scrollHeight > 300) {
					this.toTopBtn = true;
				} else {
					this.toTopBtn = false;
				}
			},
			toTop: function () {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			},
		},
	};
</script>
<style lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}

	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	#pagetop {
		display: inline-block;
		width: auto;
		box-shadow: 0 0 20px 0 #d6d6d6;
		border-radius: 50px;
		position: fixed;
		margin-top: 1.5rem;
		right: 2rem;
		bottom: 3rem !important;
		z-index: 99;
		background-color: #fff;
		padding: 8px;
	}
</style>