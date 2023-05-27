<template>
  <div class="nav-wrapper reportCustomer position-relative end-0 py-3 px-4 mx-4"
       style="direction: rtl"
  >
    <div class="header-report">
      <div class="search">
        <div class="selected-type">
          <span>نوع جستجو: </span>
          <Multiselect
              class="search-type"
              v-model="searchType"
              :options="reportType"
              placeholder="انتخاب کنید "
              label="title"
              track-by="value"
          />
          <!--          <Multiselect-->
          <!--              v-if="searchType == 3"-->
          <!--              class="search-type seller-name"-->
          <!--              v-model="sellerName"-->
          <!--              :options="sellerList"-->
          <!--              placeholder="نام میزبان "-->
          <!--              label="title"-->
          <!--              track-by="value"-->
          <!--          />-->
        </div>
        <div :class="searchType == 3 ? 'single-btn' : 'buttons'">
          <khoonegiButton
              v-if="searchType == 0 || searchType == 1 || searchType == 2"
              @click="notifyModal = true"
              class="form-button mt-0 dark-slate"
              :disabled="customerId.length >= 1  ? false : true"
              text="ارسال نوتیفای"
          />
          <khoonegiButton
              class="form-button mt-0 slate-blur"
              text="جستجو"
              :icon="true"
              @click="getReportList"
          />
        </div>
      </div>
      <div class="filters">
        <div v-if="searchType == 0" class="customer-filter">
          <!-- register-->
          <div class="register">
            <h6>ثبت نام:</h6>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="fromRegister"
                auto-submit
            ></date-picker>
            <span>تا</span>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="toRegister"
                auto-submit
            ></date-picker>
          </div>
          <!--          order-price-->
          <div class="order-price">
            <h6>مبلغ سفارشات:</h6>
            <input type="text" class="global-input" placeholder="ریال" maxlength="10" v-model="fromOrderPrice">
            <span>تا</span>
            <input type="text" class="global-input" placeholder="ریال" maxlength="10" v-model="toOrderPrice">
          </div>
          <!--          order-count-->
          <div class="order-count">
            <h6>تعداد سفارشات:</h6>
            <input type="text" class="global-input" placeholder="" maxlength="10" v-model="fromOrderCount">
            <span>تا</span>
            <input type="text" class="global-input" placeholder="" maxlength="10" v-model="toOrderCount">
          </div>
          <!--          last-order-->
          <div class="last-order">
            <h6>آخرین سفارش:</h6>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="fromLast"
                auto-submit
            ></date-picker>
            <span>تا</span>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="toLast"
                auto-submit
            ></date-picker>
          </div>
          <!--          first-order-->
          <div class="first-order">
            <h6>اولین سفارش:</h6>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="fromFirst"
                auto-submit
            ></date-picker>
            <span>تا</span>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="toFirst"
                auto-submit
            ></date-picker>
          </div>
          <!--          credit-->
          <div class="credit">
            <h6>میزان اعتبار:</h6>
            <input type="text" class="global-input" placeholder="ریال" maxlength="10" v-model="fromCredit">
            <span>تا</span>
            <input type="text" class="global-input" placeholder="ریال" maxlength="10" v-model="toCredit">
          </div>
        </div>
        <div v-if="searchType == 1" class="orders-filter">
          <!-- register-->
          <div class="register">
            <h6>ثبت نام:</h6>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="fromRegisterOrder"
                auto-submit
            ></date-picker>
            <span>تا</span>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="toRegisterOrder"
                auto-submit
            ></date-picker>
          </div>
          <!--          order-price-->
          <div class="order-price">
            <h6>مبلغ سفارشات:</h6>
            <input type="text" class="global-input" placeholder="ریال" maxlength="10" v-model="fromOrderPriceOrder">
            <span>تا</span>
            <input type="text" class="global-input" placeholder="ریال" maxlength="10" v-model="toOrderPriceOrder">
          </div>
          <!--          order-count-->
          <div class="order-count">
            <h6>تعداد سفارشات:</h6>
            <input type="text" class="global-input" placeholder="" maxlength="10" v-model="fromOrderCountOrder">
            <span>تا</span>
            <input type="text" class="global-input" placeholder="" maxlength="10" v-model="toOrderCountOrder">
          </div>
          <!--          last-order-->
          <div class="last-order">
            <h6>آخرین سفارش:</h6>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="fromLastOrder"
                auto-submit
            ></date-picker>
            <span>تا</span>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="toLastOrder"
                auto-submit
            ></date-picker>
          </div>
          <!--          first-order-->
          <div class="first-order">
            <h6>اولین سفارش:</h6>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="fromFirstOrder"
                auto-submit
            ></date-picker>
            <span>تا</span>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="toFirstOrder"
                auto-submit
            ></date-picker>
          </div>
          <!--          credit-->
          <div class="credit">
            <h6>میزان اعتبار:</h6>
            <input type="text" class="global-input" placeholder="ریال" maxlength="10" v-model="fromCreditOrder">
            <span>تا</span>
            <input type="text" class="global-input" placeholder="ریال" maxlength="10" v-model="toCreditOrder">
          </div>
          <!--          food count-->
          <div class="food-count">
            <h6>تعداد غذا:</h6>
            <input type="text" class="global-input" placeholder="" maxlength="10" v-model="fromFood">
            <span>تا</span>
            <input type="text" class="global-input" placeholder="" maxlength="10" v-model="toFood">
          </div>
        </div>
        <div v-if="searchType == 2" class="identifier-filter">
          <div class="date-select">
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="fromLastIdenti"
                auto-submit
            ></date-picker>
            <span>تا</span>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="toLastIdenti"
                auto-submit
            ></date-picker>
          </div>
          <div class="identifire-code">
            <h6>کد معرف:</h6>
            <input type="text" class="global-input" v-model="identifirCode">
          </div>
          <div class="first-order">
            <input
                class="check-box"
                type="checkbox"
                id="check"
                v-model="firstOrderIdenti"
                @click="setFilterChecked()"
            />
            <label for="check">سفارش اول</label>
          </div>
        </div>
        <!--        <div v-if="searchType == 3" class="seller-filter">-->
        <!--          &lt;!&ndash; last-order&ndash;&gt;-->
        <!--          <div class="last-order">-->
        <!--            <h6>آخرین سفارش:</h6>-->
        <!--            <date-picker-->
        <!--                color="#664ECA"-->
        <!--                class="datePicker"-->
        <!--                placeholder="انتخاب کنید"-->
        <!--                v-model="fromLastOrderSellers"-->
        <!--            ></date-picker>-->
        <!--            <span>تا</span>-->
        <!--            <date-picker-->
        <!--                color="#664ECA"-->
        <!--                class="datePicker"-->
        <!--                placeholder="انتخاب کنید"-->
        <!--                v-model="toLastOrderSellers"-->
        <!--            ></date-picker>-->
        <!--          </div>-->
        <!--          &lt;!&ndash;          order-price&ndash;&gt;-->
        <!--          <div class="order-price">-->
        <!--            <h6>مبلغ سفارشات:</h6>-->
        <!--            <input type="number" class="global-input" placeholder="ریال" v-model="fromOrderPriceSellers">-->
        <!--            <span>تا</span>-->
        <!--            <input type="number" class="global-input" placeholder="ریال" v-model="toOrderPriceSellers">-->
        <!--          </div>-->
        <!--          &lt;!&ndash;  order-count&ndash;&gt;-->
        <!--          <div class="order-count">-->
        <!--            <h6>تعداد سفارشات:</h6>-->
        <!--            <input type="number" class="global-input" placeholder="" v-model="fromOrderCountSellers">-->
        <!--            <span>تا</span>-->
        <!--            <input type="number" class="global-input" placeholder="" v-model="toOrderCountSellers">-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
    <div class="content-report">
      <div class="table-info pt-3" v-if="windowWith > 768">
        <table-lite
            class="report-customer-table"
            :is-slot-mode="true"
            :columns="columns"
            :rows="searchType == 0 ? reportList : searchType == 1 ? reportListOrder : searchType == 2 ? reportListIdentifier : reportList"
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
              <span class="item-head">نام مشتری</span>
              <p class="item-data">{{ item.name }}</p>
            </div>
            <div class="item">
              <span class="item-head">تلفن</span>
              <p class="item-data">{{ item.phoneNumber }}</p>
            </div>
            <div class="item">
              <span class="item-head">تاریخ ثبت نام</span>
              <p class="item-data">{{ item.createDate }}</p>
            </div>
            <div class="item">
              <span class="item-head">اولین سفارش</span>
              <p class="item-data">
                {{ item.firstOrderDate }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">آخرین سفارش</span>
              <p class="item-data">{{ item.lastOrderDate }}</p>
            </div>
            <div class="item">
              <span class="item-head">مجموع سفارشات</span>
              <p class="item-data">
                {{ item.orderCount }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">مبلغ سفارشات (ریال)</span>
              <p class="item-data">
                {{ item.totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </p>
            </div>
            <div class="item mb-4">
              <span class="item-head">اعتبار (ریال)</span>
              <p class="item-data">
                {{ item.credit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
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
  <Dialog v-model:visible="notifyModal" class="notify-modal">
    <template #header>
      <div class="header">
        <h3>نوتیفای</h3>
        <button @click="notifyModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <textarea
          class="global-input"
          type="text"
          v-model="notifyMessage"
      ></textarea>
      <khoonegiButton
          class="form-button mt-0 slate"
          text="ارسال"
          :loading="isloading"
          @click="sendNotify()"
          :disabled="!notifyMessage ? true : false"
      />
    </div>
  </Dialog>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import khoonegiButton from "../components/khoonegiButton.vue";
import tableLite from "../components/khoonegiTable";
import {useToast} from "vue-toastification";
import Dialog from "primevue/dialog";

export default {
  name: "reportCustomer",
  components: {
    pageToTop,
    Multiselect,
    khoonegiButton,
    tableLite,
    Dialog,
    LoadingFull
  },
  data() {
    return {
      toast: useToast(),
      searchType: 0,
      reportType: [
        {
          title: "مشتریان",
          value: 0
        },
        {
          title: "سفارشات",
          value: 1
        },
        {
          title: "کد معرف",
          value: 2
        },
        // {
        //   title: "میزبانان",
        //   value: 3
        // },
      ],
      toRegister: "",
      fromRegister: "",
      fromOrderCount: "",
      toOrderCount: "",
      fromLast: "",
      toLast: "",
      fromOrderPrice: "",
      toOrderPrice: "",
      fromCredit: "",
      toCredit: "",
      fromFirst: "",
      toFirst: "",
      windowWith: window.innerWidth,
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "نام مشتری",
          field: "name",
          width: "0.3%",
          sortable: false,
        },

        {
          label: "تلفن",
          field: "phoneNumber",
          width: ".3%",
          sortable: false,
        },

        {
          label: "تاریخ ثبت نام",
          field: "createDate",
          width: ".3%",
          sortable: false,
        },
        {
          label: "اولین سفارش",
          field: "firstOrderDate",
          width: ".2%",
          sortable: false,
        },
        {
          label: "آخرین سفارش",
          field: "lastOrderDate",
          width: ".2%",
          sortable: false,
        },
        {
          label: "مجموع سفارشات",
          field: "orderCount",
          width: ".3%",
          sortable: false,
        },
        {
          label: "مبلغ سفارشات (ریال)",
          field: "totalPayment",
          width: ".4%",
          sortable: false,
        },
        {
          label: "اعتبار (ریال)",
          field: "credit",
          width: ".2%",
          sortable: false,
        },
      ],
      //columnsSellers *********************
      columnsSellers: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "نام میزبان",
          field: "name",
          width: "0.3%",
          sortable: false,
        },

        {
          label: "نام مشتری",
          field: "phoneNumber",
          width: ".3%",
          sortable: false,
        },

        {
          label: "تلفن",
          field: "createDate",
          width: ".3%",
          sortable: false,
        },

        {
          label: "آخرین سفارش",
          field: "lastOrderDate",
          width: ".2%",
          sortable: false,
        },
        {
          label: "مبلغ سفارشات (ریال)",
          field: "totalPayment",
          width: ".4%",
          sortable: false,
        },

      ],
      reportList: [],
      reportListOrder: [],
      reportListIdentifier: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر گزارش موجود نمی‌باشد",
      },
      toRegisterOrder: "",
      fromRegisterOrder: "",
      fromOrderCountOrder: "",
      toOrderCountOrder: "",
      fromLastOrder: "",
      toLastOrder: "",
      fromFirstOrder: "",
      toFirstOrder: "",
      fromOrderPriceOrder: "",
      toOrderPriceOrder: "",
      fromCreditOrder: "",
      toCreditOrder: "",
      fromFood: "",
      toFood: "",
      fromLastIdenti: "",
      toLastIdenti: "",
      identifirCode: "",
      firstOrderIdenti: "",
      sellerList: [],
      sellerName: "",
      fromLastOrderSellers: "",
      toLastOrderSellers: "",
      fromOrderPriceSellers: "",
      toOrderPriceSellers: "",
      fromOrderCountSellers: "",
      toOrderCountSellers: "",
      customerId: [],
      notifyModal: false,
      notifyMessage: "",
      isLoading: false,
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
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
  methods: {
    sendNotify() {
      this.isloading = true;
      const data = {
        Title: "",
        SendToAll: false,
        Link: "",
        Message: this.notifyMessage,
        Customers: this.customerId
      };
      this.$store
          .dispatch("createNotify", data)
          .then((respons) => {
            console.log(respons)
            if (respons.data.succeed) {
              this.isloading = true;
              this.notifyModal = false;
              this.toast.success(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            } else {
              this.isloading = true;
              this.notifyModal = false;
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
            this.isloading = true;
            console.log(error);
          });
    },
    setFilterChecked() {
      this.firstOrderIdenti = !this.firstOrderIdenti;
    },
    getReportList() {
      this.isLoading = true;
      let data = {};
      if (this.searchType == 0) {
        data = {
          CreateFromDate: this.fromRegister,
          CreateToDate: this.toRegister,
          LastOrderDateFrom: this.fromLast,
          LastOrderDateTo: this.toLast,
          FirstOrderDateFrom: this.fromFirst,
          FirstOrderDateTo: this.toFirst,
          PaymentFrom: this.fromOrderPrice / 10,
          PaymentTo: this.toOrderPrice / 10,
          OrderCountFrom: this.fromOrderCount,
          OrderCountTo: this.toOrderCount,
          CreditFrom: this.fromCredit / 10,
          CreditTo: this.toCredit / 10,
          Type: this.searchType
        };
      } else if (this.searchType == 1) {
        data = {
          CreateFromDate: this.fromRegisterOrder,
          CreateToDate: this.toRegisterOrder,
          LastOrderDateFrom: this.fromLastOrder,
          LastOrderDateTo: this.toLastOrder,
          FirstOrderDateFrom: this.fromFirstOrder,
          FirstOrderDateTo: this.toFirstOrder,
          PaymentFrom: this.fromOrderPriceOrder / 10,
          PaymentTo: this.toOrderPriceOrder / 10,
          OrderCountFrom: this.fromOrderCountOrder,
          OrderCountTo: this.toOrderCountOrder,
          CreditFrom: this.fromCreditOrder / 10,
          CreditTo: this.toCreditOrder / 10,
          ProductCountFrom: this.fromFood,
          ProductCountTo: this.toFood,
          Type: this.searchType
        };
      } else if (this.searchType == 2) {
        data = {
          CreateFromDate: this.fromLastIdenti,
          CreateToDate: this.toLastIdenti,
          Code: this.identifirCode,
          HaveOrder: this.firstOrderIdenti,
          Type: this.searchType
        };
      }
      // else if (this.searchType == 3) {
      //   console.log("test")
      // }
      this.$store
          .dispatch("reportList", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              if(this.searchType == 0){
                this.reportList = respons.data.customers;
                this.reportList.forEach((item) => {
                  item.credit = (item.credit * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  item.totalPayment = (item.totalPayment * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                })
                this.customerId = this.reportList.map((item) => {
                  return item.id;
                });
              } else if(this.searchType == 1) {
                this.reportListOrder = respons.data.customers;
                this.reportListOrder.forEach((item) => {
                  item.credit = (item.credit * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  item.totalPayment = (item.totalPayment * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                })
                this.customerId = this.reportListOrder.map((item) => {
                  return item.id;
                });
              } else if(this.searchType == 2) {
                this.reportListIdentifier = respons.data.customers;
                this.reportListIdentifier.forEach((item) => {
                  item.credit = (item.credit * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  item.totalPayment = (item.totalPayment * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                })
                this.customerId = this.reportListIdentifier.map((item) => {
                  return item.id;
                });
              }
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

}
</script>
<style lang="scss">
.reportCustomer {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .report-customer-table {
    table {
      //@media (min-width: 1440px) {
      max-height: 37rem !important;
      //}

    }

  }

  .header-report {
    .search {
      display: flex;
      justify-content: space-between;
      @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr;
      }

      .single-btn {
        display: block !important;
      }

      .buttons, .single-btn {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1rem;

        button {
          padding: 5px 20px;
          height: fit-content;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          margin-top: 15px;
          button {
            padding: 5px 0;
          }
        }

        img {
          margin-left: 10px;
        }
      }

      .selected-type {
        display: grid;
        grid-template-columns: 7rem 10rem 12rem;
        align-items: center;
        column-gap: 10px;
        @media (max-width: 768px) {
          grid-template-columns: 1fr 1fr;
          grid-row-gap: 1rem;
        }

        .search-type {
          grid-area: unset;
          background-color: #fff;
          color: #664ECA;
          border-color: #664ECA;
          height: fit-content;
          width: 100%;
          border-radius: 5px;

          .multiselect-caret {
            background-color: #664ECA !important;
          }

          .multiselect-placeholder {
            color: #664ECA;
          }

          @media (max-width: 768px) {
            width: 100%;
            margin: 0;
          }
        }
      }
    }

    .filters {
      margin: 1.5rem 0 0 0;
      padding-bottom: 25px;
      border-bottom: 1px solid #E9E9E9;

      .customer-filter, .orders-filter, .seller-filter {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 3%;
        grid-row-gap: 1rem;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        > div {
          column-gap: 2%;
          display: grid;
          grid-template-columns: 28% 1fr auto 1fr;
          align-items: baseline;

          h6 {
            font-size: 13px;
            font-weight: 400;
            margin: 0 !important;
          }

          .global-input {
            text-align: left;
            height: 32px;
          }
        }
      }

      .identifier-filter {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 5%;
        align-items: baseline;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          grid-row-gap: 1rem;
        }

        h6, label {
          font-size: 13px;
          font-weight: 400 !important;
          margin: 0 !important;
        }

        .date-select {
          column-gap: 2%;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: baseline;
        }

        .identifire-code {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: baseline;
          column-gap: 5%;

          .global-input {
            height: 32px;
          }

        }

        .check-box {
          @media (max-width: 768px) {
            margin-left: 10px !important;
          }
        }
      }
    }
  }
}

.notify-modal {
  height: 20rem !important;

  .content {
    margin: 3% 7% !important;

    button {
      width: 30%;
      float: left;
      font-size: 14px;
      padding: 5px;
    }

    .global-input {
      height: 9rem;

    }
  }
}
</style>
