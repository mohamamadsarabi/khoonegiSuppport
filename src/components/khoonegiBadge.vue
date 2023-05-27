<template>
	<span class="badge" :class="getClasses(bgColor)" :status="status">
		<slot />
	</span>
</template>

<script>
	export default {
		name: "khoonegi-badge",
		props: {
			size: {
				type: String,
				default: "md",
			},
			color: {
				type: String,
				default: "success",
			},
			bgColor: {
				type: String,
				default: "check-contract",
			},
			variant: {
				type: String,
				default: "fill",
			},
			circle: {
				type: Boolean,
				default: false,
			},
			floating: {
				type: Boolean,
				default: false,
			},
			status: {
				type: Number,
				default: 1,
			},
		},
		methods: {
			getClasses: (status, bgColor) => {
				// let colorValue, sizeValue, circleValue, floatingValue;
				if (status === 1) {
					bgColor = "inactive";
				}
				if (status === 2) {
					bgColor = "check-contract";
				}
				if (status === 3) {
					bgColor = "check-profiles";
				}
				if (status === 4) {
					bgColor = "checkBage";
				}
				if (status === 8) {
					bgColor = "product-review";
				}
				if (status === 5 || status === 0) {
					bgColor = "seller-new";
				}
				if (status === 6) {
					bgColor = "accepted";
				}
				if (status === true) {
					bgColor = "new";
				}
				// sizeValue = size ? `badge-${size}` : null;
				// circleValue = circle ? "badge-circle" : null;
				// floatingValue = floating ? "badge-floating" : null;
				return ` ${bgColor} ${status}`;
			},
		},
	};
</script>
<style lang="scss">
	@import "../assets/scss/variables.scss";
	.badge {
		border-radius: 7px !important;
		padding: 7px 10px !important;
		color: #fff !important;
		font-size: 12px !important;
		font-weight: 600 !important;
		width: 100%;
		text-align: center;
		@media (max-width: 768px) {
			width: 100%;
		}
	}
	.check-contract {
		background: #f9b9af;
	}
	.check-profiles {
		background: #8ba59f;
	}

	.inactive {
		background: #ff7471;
	}
	.seller-new {
		background: #f1bf6f;
	}
	.product-review {
		background: #73c6f7;
	}
	.accepted {
		background: #5dd270;
	}
	.checkBage {
		background: #b65bc5;
	}
	.new {
		background: #ffa460;
	}
</style>
