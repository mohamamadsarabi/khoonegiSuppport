<template>
	<div class="khoonegi-input">
		<div class="input-div" :class="`${inputMode ? inputMode : ''}`">
			<input :disabled="disabled" :placeholder="placeholder" :type="inputType" v-model="inputValue" />
		</div>
	</div>
</template>

<script>
	export default {
		name: "khoonegiInput",
		data() {
			return {
				inputValue: "",
				waitTimer: null,
			};
		},
		props: {
			disabled: {
				type: Boolean,
				require: true,
			},
			inputType: {
				type: String,
				require: false,
				default: "text",
			},
      placeholder:{type: String},
		},

		watch: {
			inputValue: function (newValue) {
				if (this.isUsername) {
					this.inputValue = newValue.replace(/[^A-za-z0-9]/g, "");
					this.$emit("globalInputValue", this.inputValue);
				} else {
					this.$emit("globalInputValue", newValue);
				}
				if (this.isNumber) {
					this.inputValue = newValue.replace(/\D/g, "");
					this.$emit("globalInputValue", this.inputValue);
				} else {
					this.$emit("globalInputValue", newValue);
				}
				if (this.isFulName) {
					this.inputValue = newValue.replace(/[^\u0600-\u06FF ]/g, "");
					this.$emit("globalInputValue", this.inputValue);
				} else {
					this.$emit("globalInputValue", newValue);
				}
			},
			inputAutoValue: function (newValue) {
				this.inputValue = newValue;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/variables.scss";

	.khoonegi-input {
		display: flex;
		flex-direction: column;
		position: relative;

		.label-trans {
			/* Enter and leave animations can use different */
			/* durations and timing functions.              */
			.slide-fade-enter-active {
				transition: all 0.3s ease;
			}

			.slide-fade-leave-active {
				transition: all 0.3s ease;
			}

			.slide-fade-enter,
			.slide-fade-leave-to {
				transform: translatey(5px);
				opacity: 0;
			}

			label {
				color: $input-label-color;
				font-weight: 500;
				margin-bottom: 0.7rem;
				position: absolute;
				bottom: 55px;
				font-size: 15px;
			}
		}

		.input-div {
			display: flex;
			align-items: center;
			background: #ffffff;
			border: 1px solid rgba(159, 159, 181, 0.5);
			border-radius: $radius-8;
			transition: 0.3s ease-in-out;

			input {
				color: $input-color;
				font-size: 0.9em;
				border-radius: $radius-8;
				border: none;
				width: 100%;
				padding: 0.5rem 1rem;
				transition: 0.3s ease-in-out;

				&.text-left {
					text-align: left;
					direction: ltr;
				}

				&.text-ltr {
					text-align: right;
					direction: ltr;
				}

				&:focus {
					color: $input-focus-color;
				}
				&:disabled {
					background-color: #fff;
					pointer-events: none;
					user-select: none;
				}
			}

			span {
				padding-right: 1.5rem;
				color: $input-focus-color;
				transition: 0.3s ease-in-out;
			}

			.detail-icon {
				height: 1.5rem;
				width: 2.5rem;
				padding-right: 1rem;
			}

			.detail-icon-waiting {
				height: 3rem;
				width: 4rem;
			}

			&:focus-within {
				border: 1px solid $Complement-khoonegi !important;

				span {
					color: $input-focus-color;
				}
			}

			&.succeed {
				border: 1px solid #2cb149;
			}

			&.failed {
				border: 1px solid #ff2626;
			}

			&.unset,
			&.waiting {
				border: 1px solid rgba(159, 159, 181, 0.5);
			}
		}

		/* Enter and leave animations can use different */
		/* durations and timing functions.              */
		.slide-fade-enter-active {
			transition: all 0.4s ease;
		}

		.slide-fade-leave-active {
			transition: all 0.4s ease;
		}

		.slide-fade-enter,
		.slide-fade-leave-to {
			transform: translatey(-5px);
			opacity: 0;
		}

		.more-detail {
			position: relative;
			top: 7px;

			&.succeed {
				color: #2cb149;
			}

			&.failed {
				color: #ff2626;
			}

			&.unset,
			&.waiting {
				color: initial;
			}
		}
	}

	// Responsive Style
	// Extra Extra small devices
	@media only screen and (max-width: 400px) {
		.more-detail {
			font-size: 0.7em;
		}
	}

	// Extra small devices
	@media only screen and (min-width: 401px) and (max-width: 575px) {
		.more-detail {
			font-size: 0.75em;
		}
	}

	// Small devices
	@media only screen and (min-width: 576px) and (max-width: 767px) {
		.more-detail {
			font-size: 0.8em;
		}
	}

	// Medium devices
	@media only screen and (min-width: 768px) and (max-width: 991px) {
		.more-detail {
			font-size: 0.8em;
		}
	}

	// Large devices
	@media only screen and (min-width: 992px) and (max-width: 1200px) {
		.more-detail {
			font-size: 0.85em;
		}
	}

	// Extra large devices
	@media only screen and (min-width: 1201px) {
	}
</style>
