<template>
  <div>
    <transition name="fade" mode="out-in">
      <div class="loading">
        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px"
             width="30px" height="30px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
      <path opacity="0.2" fill="#664eca" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
          <path fill="#664eca" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 20 20"
                      to="360 20 20"
                      dur="0.5s"
                      repeatCount="indefinite"/>
        </path>
      </svg>



        <!--				<svg-->
        <!--					xmlns="http://www.w3.org/2000/svg"-->
        <!--					xmlns:xlink="http://www.w3.org/1999/xlink"-->
        <!--					style="-->
        <!--						margin: auto;-->
        <!--						background: none;-->
        <!--						display: block;-->
        <!--						shape-rendering: auto;-->
        <!--					"-->
        <!--					width="80px"-->
        <!--					height="22px"-->
        <!--					viewBox="0 0 100 100"-->
        <!--					preserveAspectRatio="xMidYMid"-->
        <!--				>-->
        <!--					<circle cx="84" cy="50" r="10" fill="#d0d0d0">-->
        <!--						<animate-->
        <!--							attributeName="r"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="0.4629629629629629s"-->
        <!--							calcMode="spline"-->
        <!--							keyTimes="0;1"-->
        <!--							values="9;0"-->
        <!--							keySplines="0 0.5 0.5 1"-->
        <!--							begin="0s"-->
        <!--						/>-->
        <!--						<animate-->
        <!--							attributeName="fill"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="1.8518518518518516s"-->
        <!--							calcMode="discrete"-->
        <!--							keyTimes="0;0.25;0.5;0.75;1"-->
        <!--							values="#d0d0d0;#d0d0d0;#d0d0d0;#d0d0d0;#d0d0d0"-->
        <!--							begin="0s"-->
        <!--						/>-->
        <!--					</circle>-->
        <!--					<circle cx="16" cy="50" r="10" fill="#d0d0d0">-->
        <!--						<animate-->
        <!--							attributeName="r"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="1.8518518518518516s"-->
        <!--							calcMode="spline"-->
        <!--							keyTimes="0;0.25;0.5;0.75;1"-->
        <!--							values="0;0;9;9;9"-->
        <!--							keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"-->
        <!--							begin="0s"-->
        <!--						/>-->
        <!--						<animate-->
        <!--							attributeName="cx"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="1.8518518518518516s"-->
        <!--							calcMode="spline"-->
        <!--							keyTimes="0;0.25;0.5;0.75;1"-->
        <!--							values="16;16;16;50;84"-->
        <!--							keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"-->
        <!--							begin="0s"-->
        <!--						/>-->
        <!--					</circle>-->
        <!--					<circle cx="50" cy="50" r="10" fill="#d0d0d0">-->
        <!--						<animate-->
        <!--							attributeName="r"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="1.8518518518518516s"-->
        <!--							calcMode="spline"-->
        <!--							keyTimes="0;0.25;0.5;0.75;1"-->
        <!--							values="0;0;9;9;9"-->
        <!--							keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"-->
        <!--							begin="-0.4629629629629629s"-->
        <!--						/>-->
        <!--						<animate-->
        <!--							attributeName="cx"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="1.8518518518518516s"-->
        <!--							calcMode="spline"-->
        <!--							keyTimes="0;0.25;0.5;0.75;1"-->
        <!--							values="16;16;16;50;84"-->
        <!--							keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"-->
        <!--							begin="-0.4629629629629629s"-->
        <!--						/>-->
        <!--					</circle>-->
        <!--					<circle cx="84" cy="50" r="10" fill="#d0d0d0">-->
        <!--						<animate-->
        <!--							attributeName="r"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="1.8518518518518516s"-->
        <!--							calcMode="spline"-->
        <!--							keyTimes="0;0.25;0.5;0.75;1"-->
        <!--							values="0;0;9;9;9"-->
        <!--							keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"-->
        <!--							begin="-0.9259259259259258s"-->
        <!--						/>-->
        <!--						<animate-->
        <!--							attributeName="cx"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="1.8518518518518516s"-->
        <!--							calcMode="spline"-->
        <!--							keyTimes="0;0.25;0.5;0.75;1"-->
        <!--							values="16;16;16;50;84"-->
        <!--							keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"-->
        <!--							begin="-0.9259259259259258s"-->
        <!--						/>-->
        <!--					</circle>-->
        <!--					<circle cx="16" cy="50" r="10" fill="#d0d0d0">-->
        <!--						<animate-->
        <!--							attributeName="r"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="1.8518518518518516s"-->
        <!--							calcMode="spline"-->
        <!--							keyTimes="0;0.25;0.5;0.75;1"-->
        <!--							values="0;0;9;9;9"-->
        <!--							keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"-->
        <!--							begin="-1.3888888888888888s"-->
        <!--						/>-->
        <!--						<animate-->
        <!--							attributeName="cx"-->
        <!--							repeatCount="indefinite"-->
        <!--							dur="1.8518518518518516s"-->
        <!--							calcMode="spline"-->
        <!--							keyTimes="0;0.25;0.5;0.75;1"-->
        <!--							values="16;16;16;50;84"-->
        <!--							keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"-->
        <!--							begin="-1.3888888888888888s"-->
        <!--						/>-->
        <!--					</circle>-->
        <!--					&lt;!&ndash; [ldio] generated by https://loading.io/ &ndash;&gt;-->
        <!--				</svg>-->
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "searchLoading",
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
