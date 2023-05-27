<template>
	<div class="menuMain-list position-relative end-0 py-3 px-4 mx-4">
		<div class="menuMain-filter">
			<div class="right">
				<Multiselect
					class="seller-name"
					v-model="sellerName"
					:options="sellerList"
					placeholder="نام میزبان "
					label="title"
					track-by="title"
					:searchable="true"
				/>
				<Multiselect
					class="seller-name"
					v-model="categoryId"
					:options="categoryList"
					placeholder="دسته بندی"
					label="title"
					track-by="value"
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
<!--				<span class="check">-->
<!--					<input-->
<!--						class="check-box"-->
<!--						type="checkbox"-->
<!--						id="check"-->
<!--						v-model="isTrial"-->
<!--						@click="setFilterChecked()"-->
<!--					/>-->
<!--					<label for="check">محصول تستی</label>-->
<!--				</span>-->
				<khoonegiButton
					class="form-button mt-0 dark-slate sell-report"
					text="گزارش فروش میزبان"
					@click="$router.push('/sellerReport')"
				/>
			</div>
			<div class="searchQuery">
				<div class="search">
					<vsud-input placeholder="جستجو براساس نام محصول" @input="setSearch" />
					<Transition>
						<div v-if="searchQuery.length >= 3" class="search-result">
							<ul v-if="productList.length">
								<li v-for="(item, i) in productList" :key="i">
									<button @click.prevent="getId(item.productId)">
										{{ item.productName }}
									</button>
								</li>
							</ul>
							<span v-else>محصولی یافت نشد</span>
						</div>
					</Transition>
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
		<table-lite
        class="mb-6"
			v-if="windowWith > 768"
			:is-slot-mode="true"
			:columns="columns"
			:rows="menuList"
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
							`/productList/${item.value.productId}/${item.value.name}`
						)
					"
        ></button>
      </template>
      <template v-slot:giftName="item">
        {{ item.value.giftName ? item.value.giftName : "ندارد" }}
      </template>
      <template v-slot:discountedPrice="item">
        {{ (item.value.discountedPrice * 10).toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
      </template>
      <template v-slot:balaySofre="item">
        <input
            class="check-box isActive-brand"
            type="checkbox"
            id="check"
            v-model="item.value.foodParty"
            @click="changeBalaySofre(item.value.foodParty , item.value.sellProductId)"
        />

      </template>
		</table-lite>
		<div v-else-if="windowWith <= 768" class="table-info-mobile mb-6">
			<div v-if="menuList.length">
				<div class="info-item" v-for="(item, i) in menuList" :key="i">
          <div
              @click="
							$router.push(`/productList/${item.productId}/${item.name}`)
						"
          >
					<div class="item">
						<span class="item-head">ردیف</span>
						<p class="item-data">{{ item.row }}</p>
					</div>
					<div class="item">
						<span class="item-head">نام محصول </span>
						<p class="item-data">{{ item.name }}</p>
					</div>
					<div class="item">
						<span class="item-head">تاریخ فروش</span>
						<p class="item-data">{{ item.date }}</p>
					</div>

					<div class="item">
						<span class="item-head">نام میزبان</span>
						<p class="item-data">
							{{ item.sellerName }}
						</p>
					</div>
					<div class="item">
						<span class="item-head">بازه زمانی</span>
						<p class="item-data">{{ item.time }}</p>
					</div>
					<div class="item">
						<span class="item-head">تعداد کل</span>
						<p class="item-data">
							{{ item.count }}
						</p>
					</div>
					<div class="item">
						<span class="item-head">رزرو</span>
						<p class="item-data">
							{{ item.reservedCount }}
						</p>
					</div>
					<div class="item">
						<span class="item-head">فروش رفته</span>
						<p class="item-data">
							{{ item.sellCount }}
						</p>
					</div>
					<div class="item">
						<span class="item-head">باقیمانده</span>
						<p class="item-data">
							{{ item.remain }}
						</p>
					</div>
          <div class="item">
            <span class="item-head">هدیه</span>
            <p class="item-data">
              {{ item.giftName ? item.giftName : "ندارد" }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">قیمت(ریال)</span>
            <p class="item-data">
              {{ (item.discountedPrice * 10).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </p>
          </div>
            <div class="item">
            <span class="item-head">بالای‌سفره</span>
            <p class="item-data">
              <input
                  class="check-box isActive-brand"
                  type="checkbox"
                  v-model="item.foodParty"
                  @click="changeBalaySofre(item.foodParty , item.sellProductId)"
              />
            </p>
          </div>
				</div>
				</div>
			</div>
			<div v-else class="text-center">در حال حاضر منو موجود نمی‌باشد</div>
		</div>
    <div v-if="menuList.length" class="row fix-total">
      <div class="col-lg-2"></div>
      <div class="total-items total-menu col-lg-10">
        <div class="count">
          <h6>مجموع تعداد کل:</h6>
          <span>{{ totalCount }}</span>
        </div>
        <div class="order-price">
          <h6>مجموع رزرو:</h6>
          <span>{{ totalReservedCount }}</span>
        </div>
        <div class="khoonegi-price">
          <h6>مجموع فروش رفته:</h6>
          <span>{{ totalSellCount }}</span>
        </div>
      </div>
    </div>
	</div>
<!--	<Loading-->
<!--		:class="isLoading ? 'full-page-load' : ''"-->
<!--		:enable-loading="isLoading"-->
<!--	/>-->
  <LoadingFull :enable-loading-full="isLoading"/>
  <page-to-top />
</template>

<script>
  import LoadingFull from "../components/LoadingCircle";
	import pageToTop from "../components/pageToTop";
	import { useToast } from "vue-toastification";
	import tableLite from "../components/khoonegiTable";
	import Multiselect from "@vueform/multiselect";
	import "@vueform/multiselect/themes/default.css";
	import VsudInput from "@/components/VsudInput.vue";
	import lodash from "lodash";
	import SearchLoading from "../components/searchLoading";
	import khoonegiButton from "@/components/khoonegiButton.vue";

	export default {
		name: "tables",
		components: {
      LoadingFull,
			pageToTop,
			tableLite,
			Multiselect,
			VsudInput,
			SearchLoading,
			khoonegiButton,
		},
		data() {
			return {
				toast: useToast(),
				windowWith: window.innerWidth,
				isSearchLoading: false,
				searchQuery: "",
				searchIndex: 0,
				message: {
					noDataAvailable: "در حال حاضر منو موجود نمی‌باشد",
				},
				columns: [
          {
            label: "",
            field: "link",
            width: "0%",
            sortable: false,
          },
					{
						label: " ردیف",
						field: "row",
						width: ".2%",
						sortable: false,
					},
					{
						label: "نام محصول",
						field: "name",
						width: "2%",
						sortable: false,
					},

					{
						label: "تاریخ فروش",
						field: "date",
						width: "1%",
						sortable: false,
					},
					{
						label: "نام میزبان",
						field: "sellerName",
						width: "1%",
						sortable: false,
					},
					{
						label: "بازه زمانی",
						field: "time",
						width: "1%",
						sortable: false,
					},

					{
						label: "تعداد کل",
						field: "count",
						width: "1%",
						sortable: false,
					},

					{
						label: "رزرو",
						field: "reservedCount",
						width: "1%",
						sortable: false,
					},
					{
						label: "فروش رفته",
						field: "sellCount",
						width: "1%",
						sortable: false,
					},
					{
						label: "باقیمانده",
						field: "remain",
						width: "0.2%",
						sortable: false,
					},
          {
            label: "هدیه",
            field: "giftName",
            width: "0.5%",
            sortable: false,
          },
          {
            label: "قیمت(ریال)",
            field: "discountedPrice",
            width: "0.3%",
            sortable: false,
          },
          {
            label: "بالای‌سفره",
            field: "balaySofre",
            width: "0.3%",
            sortable: false,
          },
				],
				condition: 0,
				productList: [],
				productStatus: "",
				sellerName: "",
				productName: "",
				isTrial: false,
				sellerList: [],
				selectedDate: "",
				fromDate: "",
				toDate: "",
				searchResult: [],
				productId: "",
				menuList: [],
				showResult: false,
        totalRecordCount: 0,
        totalCount: 0,
        totalReservedCount: 0,
        totalSellCount: 0,
        isLoading: false,
        categoryList: [],
        categoryId: 0
			};
		},
		created() {
      this.isLoading = true;
			this.getMenuProduct();
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
      // get category list
      this.$store
          .dispatch("getCategoriesList")
          .then((respons) => {
            console.log(respons)
            this.categoryList = respons.data;
            this.categoryList.forEach((item) => {
              item.title = item.name;
              item.value = item.categoryId;
            });
          })
          .catch((error) => {
            this.$store.dispatch("handleError", error);
            this.isLoading = false;
            console.log(error);
          });
		},
		mounted() {
			window.addEventListener("resize", () => {
				this.windowWith = window.innerWidth;
			});
		},
		methods: {
			getIndexProduct() {
				const data = {
					SellerId: this.sellerName,
					QueryString: this.searchQuery,
				};
				this.$store
					.dispatch("getProductListIndex", data)
					.then((respons) => {
            this.isLoading = false;
            this.isSearchLoading = false;
            this.productList = respons.data;
					})
					.catch((error) => {
						this.$store.dispatch("handleError", error);
						this.isLoading = false;
						console.log(error);
					});
			},

			getId(id) {
				this.productId = id;
				this.searchQuery = "";
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
						if (this.productId) {
							this.productList.forEach((item) => {
								val = item.productName;
							});
						}
						query.getIndexProduct();
					}
				}, 600)();
			},

			// get menuMain list function
			getMenuProduct() {
				const data = {
					FromDate: this.fromDate,
					ToDate: this.toDate,
					ProductId: this.productId,
					SellerId: this.sellerName,
					IsTrial: this.isTrial,
          CategoryId: this.categoryId
        };
				this.$store
					.dispatch("getProductMenuV1", data)
					.then((respons) => {
						this.isLoading = false;
						if (respons.data.succeed) {
							this.menuList = respons.data.menu;
              this.totalCount = respons.data.columnsSummary.totalCount;
              this.totalReservedCount = respons.data.columnsSummary.totalReservedCount;
              this.totalSellCount = respons.data.columnsSummary.totalSellCount;
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
						this.isLoading = false;
						console.log(error);
					});
			},
			setFilterChecked() {
				this.isTrial = !this.isTrial;
				this.getMenuProduct();
			},
      changeBalaySofre(active , id) {
        active = !active;
        let data = {
          SellProductId: id,
          IsActive: active,
        };
        console.log(data)
        this.$store
            .dispatch("balaySofreApi", data)
            .then((respons) => {
              console.log(respons);
              if (respons.data.succeed) {
                this.getMenuProduct();
                this.toast.success(respons.data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
              } else {
                this.isLoading = false;
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
		},
		watch: {
			sellerName: function () {
				this.getMenuProduct();
			},
			fromDate: function () {
				this.getMenuProduct();
			},
			toDate: function () {
				this.getMenuProduct();
			},
			productId: function () {
				this.getMenuProduct();
			},
      categoryId: function () {
				this.getMenuProduct();
			},
		},
	};
</script>
<style lang="scss">
.total-items.total-menu {
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: left;
}
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
	.menuMain-list {
		background: #ffffff;
		box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
		border-radius: 20px;
		margin: 16px auto;
		.menuMain-filter {
			border-bottom: 0.5px solid #e4e4e4;
			display: grid;
			grid-template-columns: 70% 30%;
			padding-bottom: 15px;
			margin-bottom: 15px;
			@media (max-width: 768px) {
				grid-template-columns: 1fr;
			}
			.right {
				display: grid;
				grid-template-columns: 20% 17% 17% 17% 20%;
				gap: 1.5%;
				align-items: center;
				margin-left: 15px;
				@media (max-width: 768px) {
					grid-template-columns: 1fr 1fr;
					margin-left: 0px;
          gap: 13px;
        }
				.selected {
					display: flex;
					gap: 12px;

					.menuMain-select {
						width: 23%;
						grid-area: unset;
						background-color: #fff;
						color: #664eca;
						border-color: #664eca;
						height: fit-content;
						.multiselect-caret {
							background-color: #664eca !important;
						}
						.multiselect-placeholder {
							color: #664eca;
						}
						@media (max-width: 768px) {
							width: 100%;
						}
					}
				}
				.seller-name {
					grid-area: unset;
					background-color: #fff;
					color: #664eca;
					border-color: #664eca;
					height: fit-content;
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
				label {
					font-weight: 600;
					font-size: 12px;
					color: #664eca;
					cursor: pointer;
					@media (max-width: 768px) {
						display: contents;
					}
				}
				.check {
					margin-left: 28px;
					background-color: unset;
					@media (max-width: 768px) {
						margin-bottom: 0px;
						margin-left: 0;
					}
				}

				.status-select {
					.multiselect {
						margin: 0;
					}
				}
				.sell-report {
					padding: 3.5% 3%;
					font-size: 80%;
					//height: -webkit-fill-available;
					@media (max-width: 768px) {
						padding: 0.4rem 0px;
						font-size: 12px;
						margin-bottom: 20px;
					}
				}
			}

			.datePicker {
				@media (max-width: 768px) {
					margin-bottom: 0;
				}
			}
		}
    .fix-total {
      left: 3%;
    }
	}

	.check {
		margin-left: 28px;
		background-color: unset;
		@media (max-width: 768px) {
			margin-bottom: 0px;
			margin-left: 0;
		}
		label {
			font-weight: 600;
			font-size: 12px;
			color: #664eca;
			cursor: pointer;
			@media (max-width: 768px) {
				display: contents;
			}
		}
	}
	.searchQuery {
		position: relative;
		@media (max-width: 768px) {
			width: 100%;
			input {
				&::placeholder {
					font-size: 9px;
				}
			}
		}

		.submit-search {
			position: absolute;
			left: 0.8rem;
			top: 0.4rem;
		}
		.loading-search {
			position: absolute;
			left: 5px;
			top: 5px;
		}
		.search-result {
			position: absolute;
			top: 3rem;
			z-index: 9999999999999;
			background-color: #fff;
			width: 100%;
			border: 1px solid #d2d6da;
			border-radius: 7px;
			padding: 15px 12px;
			span {
				font-size: 13px;
			}
		}
	}
</style>
