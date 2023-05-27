<template>
  <div
      class="nav-wrapper financial position-relative end-0 py-3 px-4 mx-4"
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
      </div>
      <khoonegiButton
          class="form-button mt-0 slate slate-blur"
          text="جستجو"
          :icon="true"
          @click="getFinancial"
      />
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
              item.value.companyWage.toString()
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
              item.value.accountBalance.toString()
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
              <!--              <div class="item">-->
              <!--                <span class="item-head">کارمزد ننه قا(ریال)</span>-->
              <!--                <p class="item-data">{{-->
              <!--                    item.companyWage.toString()-->
              <!--                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")-->
              <!--                  }}</p>-->
              <!--              </div>-->
              <div class="item">
                <span class="item-head">تسویه پیک آن(ریال)</span>
                <p class="item-data">{{
                    (item.paykOnWage * 10).toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</p>
              </div>
              <!--              <div class="item">-->
              <!--                <span class="item-head">مانده (ریال)</span>-->
              <!--                <p class="item-data">{{-->
              <!--                    item.accountBalance.toString()-->
              <!--                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")-->
              <!--                  }}</p>-->
              <!--              </div>-->

            </div>
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر بازخورد موجود نمی‌باشد
        </div>
      </div>
    </div>
    <div v-if="financialList.length" class="row fix-total">
      <div class="col-lg-4"></div>
      <div class="total-items col-lg-8">
        <div class="count">
          <h6>تعداد کل:</h6>
          <span>{{ totalCount }}</span>
        </div>
        <div class="order-price">
          <h6>مبلغ کل:</h6>
          <span>{{ totalOrderPrice }}</span>
        </div>
        <!--        <div class="khoonegi-price">-->
        <!--          <h6>کارمزد کل خونگی:</h6>-->
        <!--          <span>{{ totalKhoonegi }}</span>-->
        <!--        </div>-->
        <div class="peykon-price">
          <h6>مبلغ کل تسویه پیک آن:</h6>
          <span>{{ totalPeykon }}</span>
        </div>
        <!--        <div class="remain">-->
        <!--          <h6>مانده کل:</h6>-->
        <!--          <span>{{ totalRemain }}</span>-->
        <!--        </div>-->
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
export default {
  components: {
    Multiselect,
    tableLite,
    pageToTop,
    khoonegiButton,
    LoadingFull
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
        // {
        //   label: "کارمزد ننه قا(ریال)",
        //   field: "companyWage",
        //   width: "1%",
        //   sortable: false,
        // },
        {
          label: "تسویه پیک آن(ریال)",
          field: "paykOnWage",
          width: "1%",
          sortable: false,
        },
        // {
        //   label: "مانده (ریال)",
        //   field: "accountBalance",
        //   width: "1%",
        //   sortable: false,
        // },
      ],
      totalCount: "10",
      totalOrderPrice: "35.000",
      totalKhoonegi: "35.000",
      totalPeykon: "35.000",
      totalRemain: "35.000",
      message: {
        noDataAvailable: "در حال حاضر منو موجود نمی‌باشد",
      },
      totalRecordCount: 0,
      isLoading: false
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
    changePage(pageNumber) {
      this.pageIndex = pageNumber;
    },
    getFinancial() {
      this.isLoading = true;
      const data = {
        SellerId: this.sellerName,
        FromDate: this.fromDate,
        ToDate: this.toDate,
        PageNumber: this.pageIndex
      };
      this.$store
          .dispatch("financialList", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              this.pageCount = respons.data.totalCount;
              this.financialList = respons.data.financeResult;
              this.totalCount = respons.data.financeResult.reduce((accumulator, object) => {
                return accumulator + object.orderCount;
              }, 0);
              this.totalOrderPrice = respons.data.financeResult.reduce((accumulator, object) => {
                return accumulator + object.totalPayment * 10;
              }, 0).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.totalKhoonegi = respons.data.financeResult.reduce((accumulator, object) => {
                return accumulator + object.companyWage;
              }, 0).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.totalPeykon = respons.data.financeResult.reduce((accumulator, object) => {
                return accumulator + object.paykOnWage * 10;
              }, 0).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.totalRemain = respons.data.financeResult.reduce((accumulator, object) => {
                return accumulator + object.accountBalance;
              }, 0).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
.financial {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  .content {
    margin-bottom: 4rem;
  }
  .total-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    justify-items: center;
    margin-top: 1.5rem !important;
    @media (max-width: 768px) {
      border-top: 1px solid #e4e4e4;
      padding-top: 2.5rem;
      margin-top: 2.5rem;
      grid-template-columns:  1fr;
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

  .header {
    display: grid;
    grid-template-columns: 40% auto;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid #E9E9E9;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    button {
      padding: 5px 20px;
      height: fit-content;
      font-size: 14px;
      @media (max-width: 768px) {
        width: fit-content;
      }
    }

    .filter {
      display: grid;
      grid-template-columns: 45% 1fr 1fr;
      column-gap: 2%;
      @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
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
  .fix-total {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    /* border: 1px solid #e4e4e4; */
    left: 0;
  }
}
</style>
