<template>
	<div>
		<transition name="fade" mode="out-in">
			<div v-if="enableLoadingFull" class="loading">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					style="
						margin: auto;
						background: none;
						display: block;
						shape-rendering: auto;
					"
					width="200px"
					height="200px"
					viewBox="0 0 100 100"
					preserveAspectRatio="xMidYMid"
				>
					<g transform="translate(80,50)">
						<g transform="rotate(0)">
							<circle cx="0" cy="0" r="4" fill="#664eca" fill-opacity="1">
								<animateTransform
									attributeName="transform"
									type="scale"
									begin="-1.0542168674698795s"
									values="1.5 1.5;1 1"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="fill-opacity"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
									values="1;0"
									begin="-1.0542168674698795s"
								/>
							</circle>
						</g>
					</g>
					<g transform="translate(71.21320343559643,71.21320343559643)">
						<g transform="rotate(45)">
							<circle cx="0" cy="0" r="4" fill="#664eca" fill-opacity="0.875">
								<animateTransform
									attributeName="transform"
									type="scale"
									begin="-0.9036144578313252s"
									values="1.5 1.5;1 1"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="fill-opacity"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
									values="1;0"
									begin="-0.9036144578313252s"
								/>
							</circle>
						</g>
					</g>
					<g transform="translate(50,80)">
						<g transform="rotate(90)">
							<circle cx="0" cy="0" r="4" fill="#664eca" fill-opacity="0.75">
								<animateTransform
									attributeName="transform"
									type="scale"
									begin="-0.753012048192771s"
									values="1.5 1.5;1 1"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="fill-opacity"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
									values="1;0"
									begin="-0.753012048192771s"
								/>
							</circle>
						</g>
					</g>
					<g transform="translate(28.786796564403577,71.21320343559643)">
						<g transform="rotate(135)">
							<circle cx="0" cy="0" r="4" fill="#664eca" fill-opacity="0.625">
								<animateTransform
									attributeName="transform"
									type="scale"
									begin="-0.6024096385542168s"
									values="1.5 1.5;1 1"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="fill-opacity"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
									values="1;0"
									begin="-0.6024096385542168s"
								/>
							</circle>
						</g>
					</g>
					<g transform="translate(20,50.00000000000001)">
						<g transform="rotate(180)">
							<circle cx="0" cy="0" r="4" fill="#664eca" fill-opacity="0.5">
								<animateTransform
									attributeName="transform"
									type="scale"
									begin="-0.4518072289156626s"
									values="1.5 1.5;1 1"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="fill-opacity"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
									values="1;0"
									begin="-0.4518072289156626s"
								/>
							</circle>
						</g>
					</g>
					<g transform="translate(28.78679656440357,28.786796564403577)">
						<g transform="rotate(225)">
							<circle cx="0" cy="0" r="4" fill="#664eca" fill-opacity="0.375">
								<animateTransform
									attributeName="transform"
									type="scale"
									begin="-0.3012048192771084s"
									values="1.5 1.5;1 1"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="fill-opacity"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
									values="1;0"
									begin="-0.3012048192771084s"
								/>
							</circle>
						</g>
					</g>
					<g transform="translate(49.99999999999999,20)">
						<g transform="rotate(270)">
							<circle cx="0" cy="0" r="4" fill="#664eca" fill-opacity="0.25">
								<animateTransform
									attributeName="transform"
									type="scale"
									begin="-0.1506024096385542s"
									values="1.5 1.5;1 1"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="fill-opacity"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
									values="1;0"
									begin="-0.1506024096385542s"
								/>
							</circle>
						</g>
					</g>
					<g transform="translate(71.21320343559643,28.78679656440357)">
						<g transform="rotate(315)">
							<circle cx="0" cy="0" r="4" fill="#664eca" fill-opacity="0.125">
								<animateTransform
									attributeName="transform"
									type="scale"
									begin="0s"
									values="1.5 1.5;1 1"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="fill-opacity"
									keyTimes="0;1"
									dur="1.2048192771084336s"
									repeatCount="indefinite"
									values="1;0"
									begin="0s"
								/>
							</circle>
						</g>
					</g>
					<!-- [ldio] generated by https://loading.io/ -->
				</svg>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "Loading-Full",
		props: {
			enableLoadingFull: {
				type: Boolean,
				require: true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}

	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(253, 253, 253, 0.8);
	}
</style>
