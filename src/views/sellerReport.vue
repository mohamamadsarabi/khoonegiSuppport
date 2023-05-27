<template>
	<div
		class="nav-wrapper productId position-relative end-0 py-3 px-4 mx-4"
		style="direction: rtl"
	>
		<div class="menu-list">
			<div class="select-filter">
				<Multiselect
					class="seller-name"
					v-model="sellerName"
					:options="sellerList"
					placeholder="نام میزبان "
					label="title"
					track-by="title"
					:searchable="true"
				/>
				<date-picker
					color="#664ECA"
					class="datePicker fromDate"
					placeholder="از تاریخ"
					v-model="fromDate"
          auto-submit
				></date-picker>
				<date-picker
					color="#664ECA"
					class="datePicker toDate"
					placeholder="تا تاریخ"
					v-model="toDate"
          auto-submit
				></date-picker>
			</div>
			<table-lite
				class="mt-4"
				v-if="windowWith > 768"
				:is-slot-mode="true"
				:columns="columns"
				:rows="reportList"
				:total="totalRecordCount"
				:sortable="false"
				@do-search="doSearch"
				@is-finished="isLoading = false"
				:is-hide-paging="true"
				:messages="message"
			>
			</table-lite>
			<div v-else-if="windowWith <= 768" class="table-info-mobile">
				<div v-if="reportList">
					<div class="info-item" v-for="(item, i) in reportList" :key="i">
						<div class="item">
							<span class="item-head">ردیف</span>
							<p class="item-data">{{ item.row }}</p>
						</div>
						<div class="item">
							<span class="item-head">تاریخ فروش </span>
							<p class="item-data">{{ item.orderDate }}</p>
						</div>
						<div class="item">
							<span class="item-head">نام میزبان</span>
							<p class="item-data">{{ item.sellerName }}</p>
						</div>
						<div class="item">
							<span class="item-head">شماره سفارش</span>
							<p class="item-data">{{ item.orderId }}</p>
						</div>
						<div class="item">
							<span class="item-head">نام مشتری</span>
							<p class="item-data">{{ item.customerName }}</p>
						</div>
						<div class="item">
							<span class="item-head">بازه زمانی</span>
							<p class="item-data">
								{{ item.delieveryTime }}
							</p>
						</div>
						<div class="item">
							<span class="item-head">تعداد</span>
							<p class="item-data">
								{{ item.orderCount }}
							</p>
						</div>
						<div class="item">
							<span class="item-head">محصول</span>
							<p class="item-data">
								{{ item.productName }}
							</p>
						</div>
					</div>
				</div>
				<div v-else class="text-center">در حال حاضر محصول موجود نمی‌باشد</div>
			</div>
		</div>
    <LoadingFull :enable-loading-full="isLoading"/>
		<page-to-top />
	</div>
</template>
<script>
import LoadingFull from "../components/LoadingCircle";
	import pageToTop from "../components/pageToTop";
	import { useToast } from "vue-toastification";
	import tableLite from "../components/khoonegiTable";
	import Multiselect from "@vueform/multiselect";
	import "@vueform/multiselect/themes/default.css";
	export default {
		components: {
      LoadingFull,
			pageToTop,
			tableLite,
			Multiselect,
		},
		data() {
			return {
				toast: useToast(),
				windowWith: window.innerWidth,
				fromDate: "",
				toDate: "",
				reportList: [],
				columns: [
					{
						label: " ردیف",
						field: "row",
						width: ".2%",
						sortable: false,
					},
					{
						label: "تاریخ ",
						field: "orderDate",
						width: ".5%",
						sortable: false,
					},

					{
						label: "نام میزبان",
						field: "sellerName",
						width: "1%",
						sortable: false,
					},

					{
						label: "شماره سفارش",
						field: "orderId",
						width: "1%",
						sortable: false,
					},

					{
						label: "نام مشتری",
						field: "customerName",
						width: "1%",
						sortable: false,
					},
					{
						label: "بازه زمانی",
						field: "delieveryTime",
						width: "0.5%",
						sortable: false,
					},
					{
						label: "تعداد",
						field: "orderCount",
						width: ".5%",
						sortable: false,
					},
					{
						label: "محصول",
						field: "productName",
						width: "1.5%",
						sortable: false,
					},
				],
				sellerName: "",
				sellerList: [],
				message: {
					noDataAvailable: "در حال حاضر گزارش فروش موجود نمی‌باشد",
				},
        totalRecordCount: 0,
        isLoading: false
			};
		},
		created() {
      this.isLoading = true;
			this.getReportList();
			const data = {
				QueryString: "",
			};
			this.$store.dispatch("getSellerActive", data).then((respons) => {
				this.sellerList = respons.data;
				this.sellerList.forEach((item) => {
					item.title = item.brand;
					item.value = item.sellerId;
				});
			});
			window.addEventListener("resize", () => {
				this.windowWith = window.innerWidth;
			});
		},
		methods: {
			getReportList() {
				const data = {
					SellerId: this.sellerName,
					FromDate: this.fromDate,
					ToDate: this.toDate,
				};
				this.$store
					.dispatch("getReportList", data)
					.then((respons) => {
						console.log(respons);
            this.isLoading = false;
						if (respons.data.succeed) {
							this.reportList = respons.data.orders;
						} else {
							this.toast.error(respons.data.message, {
								position: "bottom-center",
								timeout: 3000,
								icon: true,
								rtl: true,
							});
						}
					})
					.catch((error) => {
						this.$store.dispatch("handleError", error);
						this.toast.error("خطا در اتصال!", {
							position: "bottom-center",
							timeout: 3000,
							icon: true,
							rtl: true,
						});
						this.isLoading = false;
						console.log(error);
					});
			},
		},
		watch: {
			sellerName: function () {
				this.getReportList();
			},
			fromDate: function () {
				this.getReportList();
			},
			toDate: function () {
				this.getReportList();
			},
		},
	};
</script>
<style lang="scss">
	.select-filter {
		padding: 15px 0;
		border-bottom: 0.5px solid #e9e9e9;
		display: flex;
		gap: 13px;
		@media (max-width: 768px) {
			display: grid;
			gap: 0;
		}
		.seller-name {
			grid-area: unset;
			background-color: #fff;
			color: #664eca;
			border-color: #664eca;
			height: fit-content;
			width: 15%;
			margin-bottom: 15px !important;
			.multiselect-caret {
				background-color: #664eca !important;
			}
			.multiselect-placeholder {
				color: #664eca;
			}
			@media (max-width: 768px) {
				width: 100%;
				margin: 0;
			}
		}
	}
</style>
