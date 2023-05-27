<template>
	<div
		class="nav-wrapper feedbackId position-relative end-0 py-3 px-4 mx-4"
		style="direction: rtl"
	>
		<div class="header-feedback">
			<div class="head">
				<h6>نام مشتری:</h6>
				<p>{{ customerName }}</p>
			</div>
			<div class="head">
				<h6>وضعیت:</h6>
				<p>{{ ConditionFeedback }}</p>
			</div>
			<div class="head">
				<h6>نام میزبان:</h6>
				<p>{{ sellerName }}</p>
			</div>
			<div class="head">
				<h6>تاریخ سفارش:</h6>
				<p>{{ orderDate }}</p>
			</div>
			<div class="head">
				<h6>ساعت سرویس دهی:</h6>
				<p>{{ orderTime }}</p>
			</div>
		</div>
		<div class="contentFeedback">
			<div class="table-Feedback pt-3" v-if="windowWith > 768">
				<table-lite
					:is-slot-mode="true"
					:columns="columns"
					:rows="detailTable"
					:total="totalRecordCount"
					:sortable="false"
					@do-search="doSearch"
					@is-finished="isLoading = false"
					:is-hide-paging="true"
					:messages="message"
				>
					<template v-slot:like="item">
						<span v-if="item.value.like">✔</span>
						<span v-else></span>
					</template>
					<template v-slot:disLike="item">
						<span v-if="item.value.disLike">✔</span>
						<span v-else></span>
					</template>
					<template v-slot:isFavorite="item">
						<span v-if="item.value.isFavorite">✔</span>
						<span v-else></span>
					</template>
					<template v-slot:isShare="item">
						<span v-if="item.value.isShare">✔</span>
						<span v-else></span>
					</template>
				</table-lite>
				<Loading :enable-loading="isLoading" />
			</div>
			<div v-else-if="windowWith <= 768" class="table-info-mobile">
				<div v-if="detailTable.length">
					<div class="info-item" v-for="(item, i) in detailTable" :key="i">
						<div>
							<div class="item">
								<span class="item-head">ردیف</span>
								<p class="item-data">{{ item.row }}</p>
							</div>
							<div class="item">
								<span class="item-head">محصولات خریداری شده</span>
								<p class="item-data">{{ item.productName }}</p>
							</div>
							<div class="item">
								<span class="item-head">تعداد پرس</span>
								<p class="item-data">{{ item.orderCount }}</p>
							</div>
							<div class="item">
								<span class="item-head">پسندیده</span>
								<p class="item-data">{{ item.like ? "✔" : "" }}</p>
							</div>
							<div class="item">
								<span class="item-head">نپسندیده</span>
								<p class="item-data">{{ item.disLike ? "✔" : "" }}</p>
							</div>
							<div class="item">
								<span class="item-head">علاقه‌مندی</span>
								<p class="item-data">{{ item.isFavorite ? "✔" : "" }}</p>
							</div>
							<div class="item">
								<span class="item-head">اشتراک</span>
								<p class="item-data">{{ item.isShare ? "✔" : "" }}</p>
							</div>
						</div>
					</div>
				</div>
				<div v-else class="text-center">در حال حاضر بازخورد موجود نمی‌باشد</div>
			</div>
		</div>
		<div class="feedback-text mt-4">
			<div class="item">
				<label class="mb-2"> نظر مشتری:</label>
				<textarea
					class="global-input textarea-global"
					v-model="comment"
          readonly
				/>
			</div>
			<div class="item mt-4 mb-7">
				<label class="mb-2"> جواب میزبان:</label>
				<textarea
					class="global-input textarea-global"
					v-model="response"
          readonly
				/>
			</div>
		</div>
	</div>
	<page-to-top />
</template>
<script>
	import tableLite from "../components/khoonegiTable";
	import pageToTop from "../components/pageToTop";
	export default {
		components: {
			tableLite,
			pageToTop,
		},
		data() {
			return {
				messageMenu: {
					noDataAvailable: "در حال حاضر منو موجود نمی‌باشد",
				},
				windowWith: window.innerWidth,
				customerName: "",
				ConditionFeedback: "",
				sellerName: "",
				orderDate: "",
				orderTime: "",
				detailTable: [],
        totalRecordCount: 0,
				columns: [
					{
						label: " ردیف",
						field: "row",
						width: ".1%",
						sortable: false,
					},
					{
						label: "محصولات خریداری شده",
						field: "productName",
						width: "2%",
						sortable: false,
					},
					{
						label: "تعداد پرس",
						field: "orderCount",
						width: "1%",
						sortable: false,
					},
					{
						label: `پسندیده`,
						field: "like",
						width: "0.7%",
						sortable: false,
					},
					{
						label: "نپسندیده",
						field: "disLike",
						width: "0.7%",
						sortable: false,
					},
					{
						label: "علاقه‌مندی",
						field: "isFavorite",
						width: "0.1%",
						sortable: false,
					},
					{
						label: "اشتراک",
						field: "isShare",
						width: "0.7%",
						sortable: false,
					},
				],
				comment: "",
				response: "",
			};
		},
		mounted() {
			window.addEventListener("scroll", this.handleScroll);
			window.addEventListener("resize", () => {
				this.windowWith = window.innerWidth;
			});
			this.getFeedbackDetails();
		},
		methods: {
			handleScroll: function () {
				if (this.scTimer) return;
				this.scTimer = setTimeout(() => {
					this.scY = window.scrollY;
					clearTimeout(this.scTimer);
					this.scTimer = 0;
				}, 100);
			},
			toTop: function () {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			},
			getFeedbackDetails() {
				const data = {
					id: this.$route.params.id,
				};
				this.$store
					.dispatch("feedbackDetails", data)
					.then((respons) => {
						console.log(respons);
              const itemfeedback = respons.data;
              this.customerName = itemfeedback.customerName;
              this.ConditionFeedback = itemfeedback.statusStr;
              this.sellerName = itemfeedback.seller;
              this.orderDate = itemfeedback.orderDate;
              this.orderTime = itemfeedback.orderTime;
              this.detailTable = itemfeedback.products;
              this.response = itemfeedback.response;
              this.comment = itemfeedback.comment;
					})
					.catch((error) => {
						this.isLoading = false;
						this.$store.dispatch("handleError", error);
						this.toast.error("خطا در اتصال!", {
							position: "bottom-center",
							timeout: 3000,
							icon: true,
							rtl: true,
						});
						console.log(error);
					});
			},
		},
	};
</script>
<style lang="scss">
	.feedbackId {
		.khoonegi-thead {
			font-size: 13px;
		}
		background: #ffffff;
		box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
		border-radius: 20px;
		margin: 16px auto;
		.header-feedback {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 23%;
			border-bottom: 1px solid #e9e9e9;
			padding-bottom: 1rem;
			@media (max-width: 768px) {
				grid-template-columns: 1fr;
			}
			.head {
				display: flex;
				align-items: baseline;
				gap: 2.5%;
				h6 {
					font-weight: 700;
					font-size: 85%;
					color: #664eca;
				}
				p {
					font-size: 84%;
					color: #393939;
					font-weight: 500;
				}
			}
		}
		.table-Feedback,
		.feedback-text {
			padding: 0 15%;
		}

		.feedback-text {
			label {
				font-size: 13px;
				color: #979797;
			}
			.textarea-global {
				max-height: 180px;
			}
			@media (max-width: 768px) {
				padding: 0;
			}
		}
	}
</style>
