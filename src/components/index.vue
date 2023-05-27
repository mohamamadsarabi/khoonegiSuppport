<template>
	<div class="background-menu"></div>
	<div
		class="
			sidbar-mobile
			rotate-caret
			my-4
			overflow-auto
			border-0
			sidenav
			border-radius-xl
			py-3
			navbar navbar-vertical navbar-expand-xs
			fixed-end
			menu-box
		"
		id="sidenav-main"
	>
		<aside class="">
			<div class="">
				<i
					class="
						top-0
						p-3
						cursor-pointer
						fas
						fa-times
						text-secondary
						opacity-5
						position-absolute
						end-0
						d-none d-xl-none
					"
					aria-hidden="true"
					id="iconSidenav"
				></i>
				<div class="m-0 khoonegi-brand">
					<img
						:src="logo"
						class="navbar-brand-img h-100 w-auto d-none d-xl-block"
						alt="main_logo"
					/>
					<div class="d-inline-block" style="line-height: 20px">
						<span class="ms-1 font-weight-bold" style="font-size: 13px">{{
							userName
						}}</span>
						<h6 class="info-user">پنل مدیریت خونگی</h6>
					</div>
					<button class="close-sidbar d-xl-none d-block" @click="closeSidebar">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 22 22"
							fill="none"
						>
							<path
								d="M9.40529 5.00625C9.08658 4.69037 8.57213 4.69267 8.25625 5.01138C7.94037 5.33009 7.94266 5.84453 8.26138 6.16042L10.1713 8.05333C10.9464 8.82157 11.4781 9.35028 11.8379 9.79826C12.1873 10.2334 12.3072 10.513 12.3391 10.7633C12.3592 10.9205 12.3592 11.0795 12.3391 11.2367C12.3072 11.487 12.1873 11.7666 11.8379 12.2017C11.4781 12.6497 10.9464 13.1784 10.1713 13.9467L8.26138 15.8396C7.94266 16.1555 7.94037 16.6699 8.25625 16.9886C8.57213 17.3073 9.08658 17.3096 9.40529 16.9937L11.3496 15.0667C12.0819 14.341 12.6804 13.7478 13.1049 13.2193C13.5462 12.6697 13.8657 12.1118 13.9511 11.4422C13.9885 11.1486 13.9885 10.8514 13.9511 10.5578C13.8657 9.8882 13.5462 9.33035 13.1049 8.78075C12.6804 8.25222 12.0819 7.65906 11.3496 6.9333L9.40529 5.00625Z"
								fill="#929292"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M15.8355 0.571539C14.5982 0.437484 13.0386 0.437491 11.049 0.4375H10.951C8.9614 0.437491 7.40183 0.437484 6.16452 0.571539C4.90185 0.70834 3.87877 0.992518 3.00525 1.62717C2.47643 2.01138 2.01138 2.47643 1.62717 3.00525C0.992518 3.87877 0.70834 4.90185 0.571539 6.16452C0.437484 7.40183 0.437491 8.9614 0.4375 10.951V11.049C0.437491 13.0386 0.437484 14.5982 0.571539 15.8355C0.70834 17.0981 0.992518 18.1212 1.62717 18.9947C2.01138 19.5236 2.47643 19.9886 3.00525 20.3728C3.87877 21.0075 4.90185 21.2917 6.16452 21.4285C7.40181 21.5625 8.96135 21.5625 10.9509 21.5625H11.049C13.0386 21.5625 14.5982 21.5625 15.8355 21.4285C17.0981 21.2917 18.1212 21.0075 18.9947 20.3728C19.5236 19.9886 19.9886 19.5236 20.3728 18.9947C21.0075 18.1212 21.2917 17.0981 21.4285 15.8355C21.5625 14.5982 21.5625 13.0387 21.5625 11.0491V10.951C21.5625 8.96143 21.5625 7.40181 21.4285 6.16452C21.2917 4.90185 21.0075 3.87877 20.3728 3.00525C19.9886 2.47643 19.5236 2.01138 18.9947 1.62717C18.1212 0.992518 17.0981 0.70834 15.8355 0.571539ZM3.96041 2.94182C4.51074 2.54197 5.21515 2.30891 6.33955 2.18708C7.47916 2.06362 8.9508 2.0625 11 2.0625C13.0492 2.0625 14.5208 2.06362 15.6605 2.18708C16.7849 2.30891 17.4893 2.54197 18.0396 2.94182C18.4305 3.2258 18.7742 3.56954 19.0582 3.96041C19.458 4.51074 19.6911 5.21514 19.8129 6.33955C19.9364 7.47916 19.9375 8.9508 19.9375 11C19.9375 13.0492 19.9364 14.5208 19.8129 15.6605C19.6911 16.7849 19.458 17.4893 19.0582 18.0396C18.7742 18.4305 18.4305 18.7742 18.0396 19.0582C17.4893 19.458 16.7849 19.6911 15.6605 19.8129C14.5208 19.9364 13.0492 19.9375 11 19.9375C8.9508 19.9375 7.47916 19.9364 6.33955 19.8129C5.21514 19.6911 4.51074 19.458 3.96041 19.0582C3.56954 18.7742 3.2258 18.4305 2.94182 18.0396C2.54197 17.4893 2.30891 16.7849 2.18708 15.6605C2.06362 14.5208 2.0625 13.0492 2.0625 11C2.0625 8.9508 2.06362 7.47916 2.18708 6.33955C2.30891 5.21515 2.54197 4.51074 2.94182 3.96041C3.2258 3.56954 3.56954 3.2258 3.96041 2.94182Z"
								fill="#929292"
							/>
						</svg>
					</button>
				</div>
			</div>
			<hr class="mt-0 horizontal dark" />
			<sidenav-list @click="navbarMinimize()" :cardBg="custom_class" />
		</aside>
	</div>
</template>
<script>
	import SidenavList from "./SidenavList.vue";
	import logo from "@/assets/img/logo.png";
	import { mapMutations } from "vuex";

	export default {
		name: "index",
		components: {
			SidenavList,
		},
		data() {
			return {
				logo,
				userName: this.$store.state.userName,
			};
		},
    mounted() {
    },
    props: ["custom_class"],
		methods: {
			...mapMutations(["navbarMinimize", "toggleConfigurator"]),
			closeSidebar() {
				document.body.style.overflow = "unset";
				this.navbarMinimize();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.sidbar-mobile {
		@media (max-width: 768px) {
			z-index: 999999999999999;
		}
	}
	.menu-box {
		background: #ffffff !important;
		box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2) !important;
	}
	.khoonegi-brand {
		display: flex;
		gap: 10px;
		justify-content: center;
		align-items: center;
		margin-bottom: 0.5rem !important;

		.info-user {
			font-weight: 400;
			font-size: 10px;
			line-height: 15px;
			color: #979797;
			margin: 0;
		}
	}

	.menu-box::-webkit-scrollbar {
		width: 3px;
	}

	/* Track */
	.menu-box::-webkit-scrollbar-track {
		background: unset;
	}

	/* Handle */
	.menu-box::-webkit-scrollbar-thumb {
		background: #bebebe;
		border-radius: 10px;
	}

	/* Handle on hover */
	.menu-box::-webkit-scrollbar-thumb:hover {
		background: rgb(131, 131, 131);
	}

	@media (max-width: 768px) {
		.menu-box {
			margin-top: 0 !important;
			margin-bottom: 0 !important;
			z-index: 99999999999999999999999;
			border-radius: 1.5rem 0 0 1.5rem;
		}
	}

	.close-sidbar {
		position: relative;
		right: 1rem;
	}
	@media (max-width: 768px) {
		.g-sidenav-pinned {
			.background-menu {
				content: "";
				width: 100%;
				height: 100%;
				top: 0;
				position: fixed;
				background-color: #000000a8;
				left: 0;
				z-index: 9999999999;
				user-select: none;
			}
		}
	}
</style>

