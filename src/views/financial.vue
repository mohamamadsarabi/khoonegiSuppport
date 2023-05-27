<template>
  <div
      class="nav-wrapper financial-support position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header">
      <div class="filter">
        <Multiselect
            class="selected-name"
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
            simple
        ></date-picker>
        <date-picker
            color="#664ECA"
            class="datePicker toDate"
            placeholder="تا تاریخ"
            v-model="toDate"
            simple
        ></date-picker>
        <khoonegiButton
            class="form-button mt-0 slate slate-blur"
            text="جستجو"
            :icon="true"
            @click="getFinancial"
        />
      </div>
      <div class="left-box">
        <div class="search-box">
          <vsud-input
              class="search-host"
              placeholder="جستجو براساس نام میزبان"
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
          <SearchLoading class="loading-search" v-else/>
        </div>
        <khoonegiButton
            class="form-button mt-0 slate slate-blur"
            text="لیست سفارشات"
            :icon="false"
            @click='this.$router.push({path: "/orderList"})'
        />
      </div>

    </div>
    <div class="content">
      <div class="table-info pt-3" v-if="windowWith > 768">
        <table-lite
            :is-slot-mode="true"
            :columns="columns"
            :rows="financialList"
            :total="totalRecordCount"
            :sortable="false"
            @do-search="doSearch"
            @is-finished="isLoading = false"
            :is-hide-paging="true"
            :messages="message"
        >
          <template v-slot:totalPayment="item">
            {{
              (item.value.totalPayment * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </template>
          <template v-slot:companyWage="item">
            {{
              (item.value.companyWage * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </template>
          <template v-slot:paykOnWage="item">
            {{
              (item.value.paykOnWage * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </template>
          <template v-slot:accountBalance="item">
            {{
              (item.value.accountBalance * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </template>
        </table-lite>
      </div>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="financialList.length">
          <div class="info-item" v-for="(item, i) in financialList" :key="i">
            <div>
              <div class="item">
                <span class="item-head">ردیف</span>
                <p class="item-data">{{ item.row }}</p>
              </div>
              <div class="item">
                <span class="item-head">شماره سفارش</span>
                <button class="btn-link">
                  {{ item.orderNo }}
                </button>
              </div>
              <div class="item">
                <span class="item-head">نام میزبان</span>
                <p class="item-data">{{ item.sellerName }}</p>
              </div>
              <div class="item">
                <span class="item-head">نام برند</span>
                <p class="item-data">{{ item.brand }}</p>
              </div>

              <div class="item">
                <span class="item-head">تاریخ</span>
                <p class="item-data">{{ item.orderDate }}</p>
              </div>
              <div class="item">
                <span class="item-head">تعداد</span>
                <p class="item-data">{{ item.orderCount }}</p>
              </div>
              <div class="item">
                <span class="item-head">مبلغ سفارش(ریال)</span>
                <p class="item-data">{{
                    (item.totalPayment * 10).toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</p>
              </div>
              <div class="item">
                <span class="item-head">کارمزد ننه قا(ریال)</span>
                <p class="item-data">{{
                    (item.companyWage * 10).toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</p>
              </div>
              <div class="item">
                <span class="item-head">تسویه پیک آن(ریال)</span>
                <p class="item-data">{{
                    (item.paykOnWage * 10).toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</p>
              </div>
              <div class="item">
                <span class="item-head">مانده (ریال)</span>
                <p class="item-data">{{
                    (item.accountBalance * 10).toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</p>
              </div>

            </div>
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر بازخورد موجود نمی‌باشد
        </div>
      </div>
    </div>
    <div v-if="financialList.length" class="row fix-total">
      <div class="col-lg-2"></div>
      <div class="total-items col-lg-10">
        <div class="count">
          <h6>تعداد کل:</h6>
          <span>{{ totalCount }}</span>
        </div>
        <div class="order-price">
          <h6>مبلغ کل:</h6>
          <span>{{ totalOrderPrice }}</span>
        </div>
        <div class="khoonegi-price">
          <h6>کارمزد کل خونگی:</h6>
          <span>{{ totalKhoonegi }}</span>
        </div>
        <div class="peykon-price">
          <h6>مبلغ کل تسویه پیک آن:</h6>
          <span>{{ totalPeykon}}</span>
        </div>
        <div class="remain">
          <h6>مانده کل:</h6>
          <span>{{ totalRemain }}</span>
        </div>
      </div>
    </div>
  </div>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import khoonegiButton from "@/components/khoonegiButton.vue";
import tableLite from "../components/khoonegiTable";
import pageToTop from "../components/pageToTop";
import { useToast } from "vue-toastification";
import SearchLoading from "../components/searchLoading";
import VsudInput from "@/components/VsudInput.vue";
import lodash from "lodash";
export default {
  components: {
    Multiselect,
    tableLite,
    pageToTop,
    khoonegiButton,
    VsudInput,
    LoadingFull,
    SearchLoading,
  },
  data() {
    return {
      toast: useToast(),
      sellerList: [],
      windowWith: window.innerWidth,
      sellerName: "",
      fromDate: "",
      toDate: "",
      pageCount: 1,
      pageIndex: 1,
      financialList: [],
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "شماره سفارش",
          field: "orderNo",
          width: ".7%",
          sortable: false,
        },
        {
          label: "نام میزبان",
          field: "sellerName",
          width: ".7%",
          sortable: false,
        },
        {
          label: "نام برند",
          field: "brand",
          width: ".7%",
          sortable: false,
        },

        {
          label: "تاریخ",
          field: "orderDate",
          width: ".7%",
          sortable: false,
        },
        {
          label: "تعداد",
          field: "orderCount",
          width: ".3%",
          sortable: false,
        },
        {
          label: "مبلغ سفارش(ریال)",
          field: "totalPayment",
          width: "1%",
          sortable: false,
        },
        {
          label: "کارمزد خونگی",
          field: "companyWage",
          width: "1%",
          sortable: false,
        },
        {
          label: "تسویه پیک آن",
          field: "paykOnWage",
          width: "1%",
          sortable: false,
        },
        {
          label: "مانده",
          field: "accountBalance",
          width: "0.2%",
          sortable: false,
        },
      ],
      totalCount: "",
      totalOrderPrice: "",
      totalKhoonegi: "",
      totalPeykon: "",
      totalRemain: "",
      message: {
        noDataAvailable: "در حال حاضر منو موجود نمی‌باشد",
      },
      totalRecordCount: 0,
      isLoading: false,
      searchQuery: "",
      searchIndex: 0,
    }
  },
  mounted() {
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
    this.getFinancial();
  },
  methods: {
    setSearch(val) {
      this.isSearchLoading = true;
      let query = this;
      this.searchIndex++;
      let curIndex = this.searchIndex;
      lodash.debounce(function () {
        if (query.searchIndex == curIndex || val.length == 0) {
          query.searchQuery = val.target.value;
          query.getFinancial();
        }
      }, 600)();
    },
    changePage(pageNumber) {
      this.pageIndex = pageNumber;
    },
    getFinancial() {
      this.isLoading = true;
      const data = {
        SellerId: this.sellerName,
        FromDate: this.fromDate,
        ToDate: this.toDate,
        PageNumber: this.pageIndex,
        QueryString: this.searchQuery,
      };
      this.$store
          .dispatch("financialListMain", data)
          .then((respons) => {
            this.isLoading = false;
            this.isSearchLoading = false;
            if (respons.data.succeed) {
              this.pageCount = respons.data.totalCount;
              this.financialList = respons.data.financeResult;
              let totalPrices = respons.data.totalFinanceResult;
              this.totalCount = respons.data.financeResult.reduce((accumulator, object) => {
                return accumulator + object.orderCount;
              }, 0);
              this.totalOrderPrice = (totalPrices.totalPrice * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.totalKhoonegi = (totalPrices.totalCompanyWage * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

              this.totalPeykon = (totalPrices.totalPaykOnDistributionPrice * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.totalRemain = (totalPrices.totalAccountBalance * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    }
  },
  watch:{
    pageIndex: function () {
      this.getFinancial();
    },
  }

}
</script>

<style lang="scss">
.total-items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  justify-items: center;
  margin-top: 1.5rem !important;
  @media (max-width: 768px) {
    border-top: 1px solid #e4e4e4;
    padding-top: 2.5rem;
    margin-top: 2.5rem;
    grid-template-columns: 1fr;
    justify-items: right;
  }

  h6 {
    font-weight: 600;
    font-size: 13px;
    color: #664eca;
  }

  span {
    font-size: 13px;
    color: #2b2b2b;
  }

  div {
    display: grid;
    margin-bottom: 1.5rem;
    grid-template-columns: auto 1fr;
    column-gap: 20px;
  }
}
.fix-total {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  /* border: 1px solid #e4e4e4; */
  left: 0;
}
.financial-support {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  position: relative;
  .content {
    margin-bottom: 4rem;
  }

  .header {
    display: grid;
    grid-template-columns: 55% 42%;
    align-items: center;
    padding-bottom: 15px;
    column-gap: 2rem;
    border-bottom: 1px solid #E9E9E9;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    button {
      padding: 5px 20px;
      height: fit-content;
      font-size: 14px;
      @media (max-width: 768px) {
        width: 100%;
      }
    }

    .filter {
      display: grid;
      grid-template-columns: 25% 25% 25% 1fr;
      column-gap: 2%;
      @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }
    }
    .left-box {
      display: grid;
      grid-template-columns: 60% 36%;
      column-gap: 1rem;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        row-gap: 1rem;
      }

      .form-control {
        padding: 0.3rem 0.75rem;

      }
      .submit-search {
        top: 0.2rem;

      }
    }
  }

  .selected-name {
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

}
</style>
