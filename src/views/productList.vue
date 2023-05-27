<template>
  <div class="product-list position-relative end-0 py-3 px-4 mx-4">
    <div class="product-filter">
      <div class="right">
				<span class="status-select">
					<Multiselect
              class="product-select"
              v-model="productStatus"
              :options="this.$store.state.productStatus"
              placeholder="وضعیت"
              label="title"
              track-by="value"
          />
				</span>
        <Multiselect
            class="seller-name"
            v-model="sellerName"
            :options="sellerList"
            placeholder="نام میزبان "
            label="title"
            track-by="title"
            :searchable="true"
        />
<!--        <span class="check">-->
<!--					<input-->
<!--              class="check-box"-->
<!--              type="checkbox"-->
<!--              id="check"-->
<!--              v-model="isTrial"-->
<!--              @click="setFilterChecked()"-->
<!--          />-->
<!--					<label for="check">محصول تستی</label>-->
<!--				</span>-->
      </div>
      <div class="searchQuery">
        <div class="search">
          <vsud-input placeholder="جستجو براساس نام محصول" @input="setSearch"/>
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
          <SearchLoading class="loading-search" v-else/>
        </div>
      </div>
    </div>
    <table-lite
        v-if="windowWith > 768"
        :is-slot-mode="true"
        :columns="columns"
        :rows="productList"
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
							`/productList/${item.value.productId}/${item.value.productName}`
						)
					"
        ></button>
      </template>
      <template v-slot:status="item">
        <div style="padding: 0 5%;">
          <span class="statusClass">
					<khoonegi-badge
              :status="
							item.value.status == 2
								? 6
								: item.value.status || item.value.status == 1
								? 8
								: item.value.status
						"
              :bgColor="
							item.value.status == 2
								? 6
								: item.value.status || item.value.status == 1
								? 8
								: item.value.status
						"
          >{{ item.value.statusStr }}</khoonegi-badge
          >
				</span>
        </div>

      </template>
    </table-lite>
    <div v-else-if="windowWith <= 768" class="table-info-mobile">
      <div v-if="productList.length">
        <div class="info-item" v-for="(item, i) in productList" :key="i">
          <div
              @click="
							$router.push(`/productList/${item.productId}/${item.productName}`)
						"
          >
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام محصول </span>
              <p class="item-data">{{ item.productName }}</p>
            </div>
            <div class="item">
              <span class="item-head">دسته بندی</span>
              <p class="item-data">{{ item.date }}</p>
            </div>
            <div class="item">
              <span class="item-head">تاریخ ثبت</span>
              <p class="item-data">{{ item.createDate }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام میزبان</span>
              <p class="item-data">
                {{ item.sellerName }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">قیمت (ریال)</span>
              <p class="item-data">
                {{ item.price }}
              </p>
            </div>
<!--            <div class="item">-->
<!--              <span class="item-head">محصول تستی</span>-->
<!--              <p class="item-data">-->
<!--                {{ item.isTrial }}-->
<!--              </p>-->
<!--            </div>-->
            <div class="item">
              <span class="item-head">وضعیت</span>
              <p class="item-data">
                <khoonegi-badge
                    :bgColor="
										item.status == 2
											? 6
											: item.status || item.status == 1
											? 8
											: item.status
									"
                >{{ item.statusStr }}
                </khoonegi-badge
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">در حال حاضر محصول موجود نمی‌باشد</div>
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
<!--  <Loading-->
<!--      :class="isLoading ? 'full-page-load' : ''"-->
<!--      :enable-loading="isLoading"-->
<!--  />-->
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import {useToast} from "vue-toastification";
import khoonegiBadge from "@/components/khoonegiBadge.vue";
import tableLite from "../components/khoonegiTable";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import VsudInput from "@/components/VsudInput.vue";
import lodash from "lodash";
import SearchLoading from "../components/searchLoading";
import Paginate from "vuejs-paginate-next";

export default {
  name: "tables",
  components: {
    LoadingFull,
    pageToTop,
    khoonegiBadge,
    tableLite,
    Multiselect,
    VsudInput,
    SearchLoading,
    Paginate
  },
  data() {
    return {
      toast: useToast(),
      windowWith: window.innerWidth,
      isSearchLoading: false,
      searchQuery: "",
      searchIndex: 0,
      message: {
        noDataAvailable: "در حال حاضر محصول موجود نمی‌باشد",
      },
      totalRecordCount: 0,
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
          field: "productName",
          width: "2.5%",
          sortable: false,
        },

        {
          label: "دسته بندی",
          field: "category",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "تاریخ ثبت",
          field: "createDate",
          width: ".6%",
          sortable: false,
        },
        {
          label: "نام میزبان",
          field: "sellerName",
          width: "1%",
          sortable: false,
        },
        {
          label: "قیمت (ریال)",
          field: "price",
          width: "1%",
          sortable: false,
        },

        // {
        //   label: "محصول تستی",
        //   field: "isTrial",
        //   width: "1%",
        //   sortable: false,
        // },
        {
          label: "وضعیت",
          field: "status",
          width: ".1%",
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
      pageCount: 1,
      pageIndex: 1,
      isLoading: false
    };
  },
  created() {
    this.getProductList();
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
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
  },
  methods: {
    changePage(pageNumber) {
      this.pageIndex = pageNumber;
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
          query.getProductList();
        }
      }, 600)();
    },
    // get product list function
    getProductList() {
      this.isLoading = true;
      const data = {
        SellerId: this.sellerName,
        QueryString: this.searchQuery,
        Status: this.productStatus | 0,
        PageNumber: this.pageIndex,
      };
      console.log(data);
      this.$store
          .dispatch("getProductList", data)
          .then((respons) => {
            this.isLoading = false;
            this.isSearchLoading = false;
            if (respons.data.succeed) {
              this.productList = respons.data.products;
              this.pageCount = respons.data.totalCount;
              this.productList.forEach((item) => {
                item.price = (item.price * 10)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              });
              this.$store.state.prodactList = respons.data.products;
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
    setFilterChecked() {
      this.isTrial = !this.isTrial;
      this.getProductList();
    },
  },
  watch: {
    sellerName: function () {
      this.getProductList();
    },
    productStatus: function () {
      this.getProductList();
    },
    pageIndex: function () {
      this.getProductList();
    },
  },
};
</script>
<style lang="scss">
.product-list {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
  border-radius: 20px;
  margin: 16px auto;

  .product-filter {
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
      grid-template-columns: 21% 21% 1fr;
      gap: 20px;
      align-items: center;
      @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        align-items: center;
        margin-bottom: 1rem;

      }

      .selected {
        display: flex;
        gap: 12px;

        .product-select {
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
        font-size: 80%;
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
          margin-bottom: 20px;
        }
      }

      .status-select {
        .multiselect {
          margin: 0;
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
    }
  }
}
</style>
