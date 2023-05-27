<template>
	<div class="py-4 container-fluid">
		<div class="row">
			<div class="col-12">
				<div class="card customerInfo-card py-2 px-4">
					<div class="header-customerInfo pb-3">
						<div class="row">
							<div class="col-lg-8 selected-Filter">
								<div class="row-grid">
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
									<span class="check">
										<input
											class="check-box"
											type="checkbox"
											id="checkWithOrder"
											v-model="WithOrder"
											@click="setWithOrderChecked"
										/>
										<label for="checkWithOrder">مشتریان سفارش دار</label>
									</span>
									<span class="check">
										<input
											class="check-box"
											type="checkbox"
											id="check"
											v-model="WithoutOrder"
											@click="setWithoutOrderChecked"
										/>
										<label for="check">مشتریان بدون سفارش</label>
									</span>
								</div>
                <div style="display: grid;grid-template-columns: 40% 55%;    column-gap: 5%;">
                  <input type="number" min="0" max="500"
                         class="order-counter" v-model="recordNumber">
                  <khoonegiButton
                      class="form-button mt-0 slate"
                      style="font-size: 13px;padding: 0"
                      text=" اکسل"
                      :icon="false"
                      @click.prevent="exportCsv()"
                  />
                </div>
							</div>
							<div class="col-lg-4 col-12 search-box">

								<vsud-input
									class="search-host"
									placeholder="جستجو براساس نام مشتری،شماره همراه"
									@input="setSearch"
								/>
								<span class="submit-search" v-if="!isSearchLoading">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											d="M5.56977 3.13606C5.85161 3.09142 6.04389 2.82676 5.99926 2.54492C5.95462 2.26309 5.68996 2.0708 5.40812 2.11544C3.71319 2.38389 2.38387 3.71321 2.11542 5.40814C2.07078 5.68998 2.26307 5.95464 2.5449 5.99928C2.82674 6.04392 3.0914 5.85163 3.13604 5.56979C3.33446 4.31701 4.31699 3.33448 5.56977 3.13606Z"
											fill="#979797"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M6.7167 0C3.00717 0 0 3.00717 0 6.7167C0 10.4262 3.00717 13.4334 6.7167 13.4334C10.4262 13.4334 13.4334 10.4262 13.4334 6.7167C13.4334 3.00717 10.4262 0 6.7167 0ZM1.03334 6.7167C1.03334 3.57786 3.57786 1.03334 6.7167 1.03334C9.85553 1.03334 12.4001 3.57786 12.4001 6.7167C12.4001 9.85553 9.85553 12.4001 6.7167 12.4001C3.57786 12.4001 1.03334 9.85553 1.03334 6.7167Z"
											fill="#979797"
										/>
										<path
											d="M12.5932 11.8626C12.3914 11.6608 12.0643 11.6608 11.8625 11.8626C11.6608 12.0643 11.6608 12.3915 11.8625 12.5932L14.618 15.3488C14.8198 15.5505 15.1469 15.5505 15.3487 15.3488C15.5505 15.147 15.5505 14.8199 15.3487 14.6181L12.5932 11.8626Z"
											fill="#979797"
										/>
									</svg>
								</span>
								<SearchLoading class="loading-search" v-else />
							</div>
						</div>
					</div>
					<div class="table-info pt-3" v-if="windowWith > 768">
						<table-lite
							:is-slot-mode="true"
							:columns="columns"
							:rows="customerList"
							:total="totalRecordCount"
							:sortable="false"
							@do-search="doSearch"
							@is-finished="isLoading = false"
							:is-hide-paging="true"
							:messages="message"
						>
							<template v-slot:link="item">
								<button
									class="full-link"
									@click="
										$router.push(
											`/customerInfo/${item.value.customerId}/${item.value.name}`
										)
									"
								></button>
							</template>
							<template v-slot:address="item">
								{{ item.value.address.slice(0, 50) }}
								<span v-if="item.value.address.length > 50">.....</span>
							</template>
							<template v-slot:credit="item">
								<span>
									{{
										(item.value.credit * 10)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}}
								</span>
							</template>
						</table-lite>
						<Loading :enable-loading="isLoading" />

						<paginate
							v-if="pageCount > 1"
							:page-count="pageCount"
							:page-range="10"
							:click-handler="changePage"
							:prev-text="'<'"
							:next-text="'>'"
							:container-class="'pagination'"
							:page-class="'page-item'"
							:page-link-class="'link'"
						>
						</paginate>
					</div>
					<div v-else-if="windowWith <= 768" class="table-info-mobile">
						<div v-if="customerList.length">
							<div class="info-item" v-for="(item, i) in customerList" :key="i">
								<div
									@click="
										$router.push(`/customerInfo/${item.customerId}/${item.name}`)
									"
								>
									<div class="item">
										<span class="item-head">ردیف</span>
										<p class="item-data">{{ item.row }}</p>
									</div>
									<div class="item">
										<span class="item-head">نام مشتری</span>
										<p class="item-data">{{ item.name }}</p>
									</div>
									<div class="item">
										<span class="item-head">شماره همراه</span>
										<p class="item-data">{{ item.phoneNumber }}</p>
									</div>
									<div class="item">
										<span class="item-head">آدرس</span>
										<p class="item-data">
											{{ item.address.slice(0, 35) }}
											<span v-if="item.address.length > 35">.....</span>
										</p>
									</div>
									<div class="item">
										<span class="item-head">تاریخ ثبت نام</span>
										<p class="item-data">{{ item.createDate }}</p>
									</div>
									<div class="item">
										<span class="item-head">تعداد سفارش</span>
										<p class="item-data">{{ item.orderCount }}</p>
									</div>
									<div class="item">
										<span class="item-head">آخرین سفارش</span>
										<p class="item-data">{{ item.lastOrderDate }}</p>
									</div>
									<div class="item" style="margin-bottom: 25px">
										<span class="item-head">اعتبار (ریال)</span>
										<p class="item-data">
											{{
												(item.credit * 10)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
											}}
										</p>
									</div>
								</div>
							</div>
							<paginate
								v-if="pageCount > 1"
								:page-count="pageCount"
								:page-range="10"
								:click-handler="changePage"
								:prev-text="'<'"
								:next-text="'>'"
								:container-class="'pagination'"
								:page-class="'page-item'"
								:page-link-class="'link'"
							>
							</paginate>
						</div>
						<div v-else class="text-center">
							در حال حاضر مشتری موجود نمی‌باشد
						</div>
					</div>
				</div>
				<page-to-top />
			</div>
		</div>
	</div>
  <div class="table-info ">
    <table-lite
        class-main="export-exell d-none"
        :is-slot-mode="true"
        :columns="columns"
        :rows="customerListExell"
        :total="totalRecordCount"
        :sortable="false"
        @do-search="doSearch"
        @is-finished="isLoading = false"
        :is-hide-paging="true"
        :messages="messageExell"
    >
      <template v-slot:link="item">
        <button
            class="full-link"
            @click="
										$router.push(
											`/customerInfo/${item.value.customerId}/${item.value.name}`
										)
									"
        ></button>
      </template>
      <template v-slot:address="item">
        {{ item.value.address.slice(0, 50) }}
        <span v-if="item.value.address.length > 50">.....</span>
      </template>
      <template v-slot:credit="item">
								<span>
									{{
                    (item.value.credit * 10)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
								</span>
      </template>
    </table-lite>
  </div>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
	import Paginate from "vuejs-paginate-next";
	import VsudInput from "@/components/VsudInput.vue";
  import LoadingFull from "../components/LoadingCircle";
  import pageToTop from "../components/pageToTop";
	import SearchLoading from "../components/searchLoading";
	import tableLite from "../components/khoonegiTable";
	import lodash from "lodash";
	import { useToast } from "vue-toastification";
  import khoonegiButton from "../components/khoonegiButton";

	export default {
		name: "customerInfo",
		components: {
			VsudInput,
      LoadingFull,
			tableLite,
			SearchLoading,
			pageToTop,
			Paginate,
      khoonegiButton
		},
		data() {
			return {
				fromDate: "",
				toDate: "",
				condition: 0,
				sellerStatus: [],
				customerList: [],
        customerListExell: [],
				searchQuery: "",
				searchIndex: 0,
				isLoading: false,
				toast: useToast(),
				isSearchLoading: false,
				columns: [
					{
						label: " ردیف",
						field: "row",
						width: ".1%",
						sortable: false,
					},
					{
						label: "",
						field: "link",
						width: "0%",
						sortable: false,
					},
					{
						label: "نام مشتری",
						field: "name",
						width: "0.8%",
						sortable: false,
					},

					{
						label: "شماره همراه",
						field: "phoneNumber",
						width: ".2%",
						sortable: false,
					},
					{
						label: "آدرس",
						field: "address",
						width: "2.8%",
						sortable: false,
					},
					{
						label: "تاریخ ثبت نام",
						field: "createDate",
						width: "0.5%",
						sortable: false,
					},
					{
						label: "تعداد سفارش",
						field: "orderCount",
						width: ".5%",
						sortable: false,
					},
					{
						label: "آخرین سفارش",
						field: "lastOrderDate",
						width: ".5%",
						sortable: false,
					},
					{
						label: "اعتبار (ریال)",
						field: "credit",
						width: ".5%",
						sortable: false,
					},
				],
				rows: [],
				totalRecordCount: 0,
				message: {
					noDataAvailable: "در حال حاضر مشتری موجود نمی‌باشد",
				},
        messageExell: {
					noDataAvailable: "",
				},
				windowWith: window.innerWidth,
				pageCount: 1,
				pageIndex: 1,
        WithoutOrder: false,
        WithOrder: false,
        recordNumber: 0
			};
		},

		mounted() {
      this.getCustomerListExell();
      window.addEventListener("resize", () => {
				this.windowWith = window.innerWidth;
			});
			window.addEventListener("scroll", this.handleScroll);
			this.isLoading = true;
			this.sellerStatus = this.$store.state.sellerStatus;
			this.getCustomerList();
		},
		methods: {
      exportCsv() {
        if(this.recordNumber <= 500){
          var htmltable = document.getElementsByClassName("export-exell");
          var html = htmltable[0].outerHTML;
          console.log(html)
          window.open("data:application/vnd.ms-excel," + encodeURIComponent(html));
        } else {
          this.toast.error("تعداد رکوردها باید کمتر از 500 باشد", {
            position: "bottom-center",
            timeout: 3000,
            icon: true,
            rtl: true,
          });
        }

      },
			changePage(pageNumber) {
				this.pageIndex = pageNumber;
			},
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
			// search realTime for get seller list filter
			setSearch(val) {
				this.isSearchLoading = true;
				let query = this;
				this.searchIndex++;
				let curIndex = this.searchIndex;
				lodash.debounce(function () {
					if (query.searchIndex == curIndex || val.length == 0) {
						query.searchQuery = val.target.value;
						query.getCustomerList();
					}
				}, 600)();
			},
			// get customer list function
			getCustomerList() {
        this.isLoading = true;
				const data = {
					FromDate: this.fromDate,
					ToDate: this.toDate,
					WithOrder: this.WithOrder,
					WithoutOrder: this.WithoutOrder,
					StringQuery: this.searchQuery,
					PageNumber: this.pageIndex,
				};
				this.$store
					.dispatch("CustomerList", data)
					.then((respons) => {
						console.log(respons);
						this.isLoading = false;
						if (respons.data.succeed) {
							this.isSearchLoading = false;
							this.customerList = respons.data.customers;
							this.pageCount = respons.data.totalCount;
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
			getCustomerListExell() {
        // this.isLoading = true;
				const data = {
					FromDate: this.fromDate,
					ToDate: this.toDate,
					WithOrder: this.WithOrder,
					WithoutOrder: this.WithoutOrder,
					StringQuery: this.searchQuery,
					PageNumber: 0,
          ItemPrePage: this.recordNumber,
				};
				this.$store
					.dispatch("CustomerListExell", data)
					.then((respons) => {
						console.log(respons);
						this.isLoading = false;
							this.isSearchLoading = false;
							this.customerListExell = respons.data;
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
			setWithOrderChecked() {
				this.WithOrder = !this.WithOrder;
				this.getCustomerList();
			},

			setWithoutOrderChecked() {
				this.WithoutOrder = !this.WithoutOrder;
				this.getCustomerList();
			},
		},
		watch: {
			WithOrder: function () {
        this.getCustomerListExell();
				this.getCustomerList();
			},
			WithoutOrder: function () {
        this.getCustomerListExell();
				this.getCustomerList();
			},
			fromDate: function () {
        this.getCustomerListExell();
				this.getCustomerList();
			},
			toDate: function () {
        this.getCustomerListExell();
				this.getCustomerList();
			},
			pageIndex: function () {
				this.getCustomerList();
			},
      recordNumber: function () {
        this.getCustomerListExell();
        },
		},
	};
</script>

<style lang="scss">
	.card {
		.header-customerInfo {
			border-bottom: 0.5px solid #e4e4e4;
			@media (max-width: 768px) {
				.check-box {
					margin-left: 10px !important;
				}
			}
      .submit-search {
        left: 1.5rem !important;
      }
      .loading-search {
        left: 18px !important;
      }
		}
	}
	.multiselect {
		grid-area: multiSelect;
		@media (max-width: 768px) {
			margin-bottom: 15px;
		}
		margin: 0;
		min-height: unset;
		padding: 6px 10px;
		background-color: #664eca;
		color: #fff;
		border-radius: 7px !important;
		&.is-active {
			box-shadow: unset;
		}
		.multiselect-clear-icon {
			display: none;
			background-color: #fff;
		}
		.multiselect-caret {
			background-color: #fff;
		}
		.multiselect-single-label {
			padding: 0 0.5rem;
			right: 0;
			font-size: 14px;
		}
		// scroll bar
		.multiselect-dropdown::-webkit-scrollbar {
			width: 3px;
		}
		/* Track */
		.multiselect-dropdown::-webkit-scrollbar-track {
			background: unset;
		}
		/* Handle */
		.multiselect-dropdown::-webkit-scrollbar-thumb {
			background: #bebebe;
			border-radius: 10px;
		}
		/* Handle on hover */
		.multiselect-dropdown::-webkit-scrollbar-thumb:hover {
			background: rgb(131, 131, 131);
		}

		.multiselect-option {
			color: #000;
			font-size: 12px;
			&.is-selected {
				background-color: #664eca;
				color: #fff;
			}
		}
		.multiselect-placeholder {
			color: #fff;
			right: 0;
			padding: 0 0.5rem;
			font-size: 14px;
		}
	}
	.selected-Filter {
		align-self: end;
    display: grid;
    grid-template-columns: auto 20%;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
    .order-counter {
      display: grid;
      grid-template-columns: 45% 55%;
      width: 100%;
    }
		.row-grid {
			display: grid;
			grid-template-columns: auto auto 31% 30%;
			grid-template-areas: "title multiSelect datePicker datePicker submitSeller";
			grid-column-gap: 10px;
			align-items: baseline;
			@media (max-width: 768px) {
				margin-bottom: 15px;
				grid-template-columns: 1fr 1fr;
				grid-template-areas:
					"title multiSelect"
					"datePicker datePicker "
					"submitSeller submitSeller";
			}
		}
		.title {
			grid-area: title;
			font-size: 15px;
			display: flex;
			align-items: center;
			margin-left: 15px;
			@media (max-width: 768px) {
				margin-bottom: 15px;
			}
		}
	}
	.submit-seller {
		grid-area: submitSeller;
		width: auto;
		background-color: #664eca;
		color: #fff;
		border-radius: 5px;
		padding: 1px 25px;
		width: fit-content;
		&:disabled {
			opacity: 0.3;
			cursor: not-allowed;
		}
		@media (max-width: 768px) {
			width: 100%;
			line-height: 30px;
		}
	}
	.datePicker {
		.datePicker {
			grid-area: datePicker;
		}
		@media (max-width: 768px) {
			margin-bottom: 15px;
		}

		.vpd-input-group {
			.vpd-icon-btn {
				display: none !important;
			}
			input {
				border: 0.75px solid #664eca;
				border-radius: 5px;
				text-align: center;
				color: #664eca;
				&::placeholder {
					color: #664eca;
				}
				&:disabled {
					color: #b9a2a2;
					border-color: #e2e2e2;
					background-color: unset;
					cursor: not-allowed;
					&::placeholder {
						color: #e2e2e2;
					}
				}
			}
		}
	}

	.search-box {
		position: relative;
		.search-host {
			width: 100% !important;
			float: left;
      position: relative;
			@media (max-width: 768px) {
				width: 100%;
				input {
					&::placeholder {
						font-size: 9px;
					}
				}
			}
		}
		.submit-search {
			position: absolute;
      left: 1rem;
      top: 0.5rem;
		}
		.loading-search {
			position: absolute;
			left: 11px;
			top: 5px;
		}
	}

	// table
	.table-info {
		.no-seller {
			text-align: center;
			width: 100%;
			margin-top: 1rem;
			font-weight: 200;
			font-size: 14px;
		}
	}

	.table-info-mobile {
		margin-top: 27px;
		.info-item {
			border-bottom: 0.5px solid #e9e9e9;
			margin-bottom: 28px;
			&:last-child {
				border: none;
				margin-bottom: 0;
				.item:last-child {
					margin-bottom: 0;
				}
			}
		}
		.item {
			display: flex;
			justify-content: space-between;
			align-content: space-between;
			margin-bottom: 28px;
			align-items: center;

			.item-head {
				font-weight: 600;
				font-size: 12px;
				color: #664eca;
			}
			.item-data {
				font-weight: 500;
				font-size: 12px;
				color: #2b2b2b;
				@media (max-width: 768px) {
					font-weight: 500;
				}
				.badge {
					font-weight: 300 !important;
					font-size: 10px !important;
				}
			}
		}
	}
	.btn-link {
		color: initial !important;
		&:hover {
			color: #cb0c9f !important;
		}
		@media (max-width: 768px) {
			font-size: 12px;
			font-weight: 500;
		}
	}

	.pagination {
		display: flex;
		justify-content: center;
		margin-top: 3rem;
		align-items: baseline;
		a {
			font-size: 15px !important;
			line-height: 25px;
		}
		.page-item {
			display: inline-block;
			margin: 8px;
			.link {
				color: #828282 !important;
				cursor: pointer;
				border-radius: 8px;
				width: 30px;
				height: 22px;
				display: inline-block;
				text-align: center;
				&:hover {
					color: #664eca !important;
					background-color: #e9ecef;
					border-radius: 8px !important;
				}
			}
			&.disabled {
				opacity: 0.5;
				pointer-events: none;
				.page-link {
					border: none !important;
					cursor: pointer;
				}
			}
			&.active {
				.link {
					cursor: pointer;
					background-color: #664eca;
					color: #fff !important;
					border-radius: 8px;
					width: 30px;
					height: 22px;
					display: inline-block;
					text-align: center;
				}
			}
			.page-link {
				border: none !important;
				cursor: pointer;
				width: 25px;
				height: 22px;
				&:hover {
					color: #664eca;
					background-color: #e9ecef;
					border-radius: 8px !important;
				}
				&:focus {
					color: #664eca;
					background-color: #e9ecef;
					border-radius: 8px !important;
					box-shadow: none !important;
				}
			}
		}
	}
</style>
<style >
</style>
