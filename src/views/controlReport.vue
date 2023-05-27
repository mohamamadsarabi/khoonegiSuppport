<template>
  <div
      class="nav-wrapper creditCustomer position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header-report">
      <div class="search">
        <div class="selected-period">
          <date-picker
              color="#664ECA"
              class="datePicker"
              placeholder="از تاریخ"
              v-model="fromDateCredit"
              simple
          ></date-picker>
          <date-picker
              color="#664ECA"
              class="datePicker"
              placeholder="تا تاریخ"
              v-model="toDateCredit"
              simple
          ></date-picker>
        </div>
        <div class="search-box">
          <vsud-input
              class="search-host"
              placeholder="شماره سفارش، نام میزبان، نام مشتری"
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
      </div>
    </div>
    <div class="content-report">
      <div class="table-info pt-3" v-if="windowWith > 768">
        <table-lite
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
        <Loading :enable-loading="isLoading"/>
      </div>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="reportList.length">
          <div class="info-item" v-for="(item, i) in reportList" :key="i">
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">شماره سفارش</span>
              <p class="item-data">{{ item.orderId }}</p>
            </div>
            <div class="item">
              <span class="item-head">تاریخ</span>
              <p class="item-data">{{ item.orderDate }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام مشتری</span>
              <p class="item-data">{{ item.customerName  }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام میزبان</span>
              <p class="item-data">{{ item.sellerName  }}</p>
            </div>
            <div class="item">
              <span class="item-head">مبلغ سفارش</span>
              <p class="item-data">
                {{ item.orderWalletPayment }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">هزینه ارسال</span>
              <p class="item-data">
                {{ item.orderDistributionPrice }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">کسر از اعتبار</span>
              <p class="item-data">
                {{ item.orderWalletPayment }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">پرداخت آنلاین</span>
              <p class="item-data">
                {{ item.orderOnlinePayment }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">تخفیف</span>
              <p class="item-data">
                {{ item.orderDiscountPrice }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">شماره مرجع</span>
              <p class="item-data">
                {{ item.orderPaymentReference }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">جمع پرداختی بابت سفارش</span>
              <p class="item-data">
                {{ item.orderTotalPayment }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">اختلاف</span>
              <p class="item-data">
                {{ item.paymentDiscrepancy }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر گزارش موجود نمی‌باشد
        </div>
      </div>
    </div>
  </div>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import tableLite from "../components/khoonegiTable";
import {useToast} from "vue-toastification";
import VsudInput from "@/components/VsudInput.vue";
import SearchLoading from "../components/searchLoading";
import lodash from "lodash";

export default {
  name: "controlReport",
  components: {
    pageToTop,
    tableLite,
    VsudInput,
    SearchLoading,
    LoadingFull
  },
  data() {
    return {
      toast: useToast(),
      windowWith: window.innerWidth,
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "شماره سفارش",
          field: "orderId",
          width: "0.3%",
          sortable: false,
        },

        {
          label: "تاریخ",
          field: "orderDate",
          width: ".1%",
          sortable: false,
        },

        {
          label: "نام مشتری",
          field: "customerName",
          width: ".2%",
          sortable: false,
        },
        {
          label: "نام میزبان",
          field: "sellerName",
          width: ".2%",
          sortable: false,
        },
        {
          label: "مبلغ سفارش",
          field: "orderTotalPayment",
          width: ".1%",
          sortable: false,
        },
        {
          label: "هزینه ارسال",
          field: "orderDistributionPrice",
          width: ".1%",
          sortable: false,
        },
        {
          label: "کسر از اعتبار",
          field: "orderWalletPayment",
          width: ".3%",
          sortable: false,
        },
        {
          label: "پرداخت آنلاین",
          field: "orderOnlinePayment",
          width: ".1%",
          sortable: false,
        },
        {
          label: "تخفیف",
          field: "orderDiscountPrice",
          width: ".1%",
          sortable: false,
        },
        {
          label: "شماره مرجع",
          field: "orderPaymentReference",
          width: ".1%",
          sortable: false,
        },
        {
          label: "جمع پرداختی بابت سفارش",
          field: "orderWalletPayment",
          width: ".2%",
          sortable: false,
        },
        {
          label: "اختلاف",
          field: "paymentDiscrepancy",
          width: ".1%",
          sortable: false,
        },
      ],
      reportList: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر گزارش موجود نمی‌باشد",
      },
      isLoading: false,
      paymentType: Number,
      fromDateCredit: "",
      toDateCredit: "",
      referenceNo: "",
      searchQuery: "",
      searchIndex: 0,
      isSearchLoading: false,
    }
  },
  mounted() {
    this.getReportList()
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
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
          query.getReportList();
        }
      }, 600)();
    },
    getReportList() {
      this.isLoading = true;
      let data = {
        FromDate: this.fromDateCredit,
        ToDate: this.toDateCredit,
        QueryString: this.searchQuery,
      };
      this.$store
          .dispatch("paymentControlReport", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            this.isSearchLoading = false;
            if (respons.data.succeed) {
              this.reportList = respons.data.payment;
              this.reportList.map((item , i)=>{
                item.row = i;
                item.row++;
                item.orderOnlinePayment = (item.orderOnlinePayment * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.orderWalletPayment = (item.orderWalletPayment * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.paymentDiscrepancy = (item.paymentDiscrepancy * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.paymentTotalValue = (item.paymentTotalValue * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.orderTotalPayment = (item.orderTotalPayment * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.orderDiscountPrice = (item.orderDiscountPrice * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.orderDistributionPrice = (item.orderDistributionPrice * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              })
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

  },
  watch:{
    toDateCredit: function () {
      this.getReportList()
    },
    fromDateCredit: function () {
      this.getReportList()
    },
  }
}
</script>
<style lang="scss">
.creditCustomer {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .header-report {
    margin-bottom: 10px;
    padding-bottom: 15px;
    border-bottom: 0.5px solid #e9e9e9;

    .number-input {
      padding: 4px 1rem;
      text-align: left;
      color: #664ECA !important;
      border-color: #664ECA !important;

      &::placeholder {
        text-align: right;
        color: #664ECA;
      }
    }

    .search {
      display: grid;
      grid-template-columns: 1fr 30%;
      @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 1rem;
      }
      //
      //.single-btn {
      //  display: block !important;
      //}
      //
      //
      //.single-btn {
      //  display: grid;
      //  grid-template-columns: 1fr 1fr;
      //  column-gap: 1rem;
      //
      //  button {
      //    padding: 5px 20px;
      //    height: fit-content;
      //    font-size: 14px;
      //  }
      //
      //  @media (max-width: 768px) {
      //    margin-top: 15px;
      //    button {
      //      padding: 5px 0;
      //    }
      //  }
      //
      //  img {
      //    margin-left: 10px;
      //  }
      //}

      .selected-period {
        display: grid;
        grid-template-columns: 10rem 10rem 9rem;
        align-items: center;
        column-gap: 10px;
        @media (max-width: 768px) {
          grid-template-columns: 1fr 1fr;
          grid-row-gap: 1rem;
        }


      }

      button {
        padding: 4px 20px;
        height: fit-content;
        font-size: 14px;
      }
    }

  }

  .khoonegi-table {
    th {
      font-size: 12px !important;

    }
  }
}

</style>
