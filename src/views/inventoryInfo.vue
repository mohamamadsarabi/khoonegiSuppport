<template>
  <div
      class="nav-wrapper inventoryInfo position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header-report">
      <div class="search">
        <div class="selected-type">
          <span>نوع جستجو: </span>
          <Multiselect
              class="search-type seller-name"
              v-model="productName"
              :options="productList"
              placeholder="نام محصول "
              label="title"
              track-by="title"
              :searchable="true"
          />
          <Multiselect
              class="search-type seller-name"
              v-model="sellerName"
              :options="sellerList"
              placeholder="نام میزبان "
              label="title"
              track-by="title"
              :searchable="true"
          />
        </div>
        <div class="buttons">
          <khoonegiButton
              class="form-button mt-0 slate-blur"
              text="جستجو"
              :icon="true"
              @click="getReportList"
          />
        </div>
      </div>
      <div class="filters">
        <div class="customer-filter">
          <!-- infoDate-->
          <div class="infoDate">
            <h6>تاریخ اطلاع:</h6>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="fromInfo"
                auto-submit
            ></date-picker>
            <span>تا</span>
            <date-picker
                color="#664ECA"
                class="datePicker"
                placeholder="انتخاب کنید"
                v-model="toInfo"
                auto-submit
            ></date-picker>
          </div>
          <!--          order-last-->
          <!--          <div class="order-last">-->
          <!--            <h6>آخرین سفارش:</h6>-->
          <!--            <date-picker-->
          <!--                color="#664ECA"-->
          <!--                class="datePicker"-->
          <!--                placeholder="انتخاب کنید"-->
          <!--                v-model="fromRegister"-->
          <!--            ></date-picker>-->
          <!--            <span>تا</span>-->
          <!--            <date-picker-->
          <!--                color="#664ECA"-->
          <!--                class="datePicker"-->
          <!--                placeholder="انتخاب کنید"-->
          <!--                v-model="toRegister"-->
          <!--            ></date-picker>-->
          <!--          </div>-->
          <!--          order-count-->
          <!--          <div class="order-count">-->
          <!--            <h6>تعداد سفارشات:</h6>-->
          <!--            <input type="number" class="global-input" placeholder="" v-model="fromOrderCount">-->
          <!--            <span>تا</span>-->
          <!--            <input type="number" class="global-input" placeholder="" v-model="toOrderCount">-->
          <!--          </div>-->
        </div>
      </div>
    </div>
    <div class="content-report">
      <div class="table-info pt-0" v-if="windowWith > 768">
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
              <p class="item-data">{{ item.customerName }}</p>
            </div>
            <div class="item">
              <span class="item-head">تلفن</span>
              <p class="item-data">{{ item.phoneNumber }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام میزبان</span>
              <p class="item-data">{{ item.sellerName }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام محصول</span>
              <p class="item-data">
                {{ item.productName }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">تاریخ اطلاع</span>
              <p class="item-data">{{ item.createDateTime }}</p>
            </div>
            <div class="item">
              <span class="item-head">آخرین سفارش</span>
              <p class="item-data">
                {{ item.lastOrderDate }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">مجموع سفارشات</span>
              <p class="item-data">
                {{ item.totalOrders }}
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
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import khoonegiButton from "../components/khoonegiButton.vue";
import tableLite from "../components/khoonegiTable";
import {useToast} from "vue-toastification";

export default {
  name: "inventoryInfo",
  components: {
    pageToTop,
    Multiselect,
    khoonegiButton,
    tableLite,
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
          label: "نام مشتری",
          field: "customerName",
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
          label: "نام میزبان",
          field: "sellerName",
          width: ".3%",
          sortable: false,
        },
        {
          label: "نام محصول",
          field: "productName",
          width: ".2%",
          sortable: false,
        },
        {
          label: "تاریخ اطلاع",
          field: "createDateTime",
          width: ".2%",
          sortable: false,
        },
        {
          label: "آخرین سفارش",
          field: "lastOrderDate",
          width: ".3%",
          sortable: false,
        },
        {
          label: "مجموع سفارشات",
          field: "totalOrders",
          width: ".4%",
          sortable: false,
        },
      ],
      reportList: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر گزارش موجود نمی‌باشد",
      },
      sellerList: [],
      sellerName: "",
      customerId: [],
      isLoading: false,
      productList: [],
      productName: "",
      fromInfo: "",
      toInfo: ""
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
    const dataProduct = {
      SellerId: "",
      QueryString: "",
      Status: 5,
      IsTrial: false,
    };
    this.$store.dispatch("getProductList", dataProduct).then((respons) => {
      this.productList = respons.data.products;
      this.productList.forEach((item) => {
        item.title = item.productName;
        item.value = item.productId;
      });
    });
  },
  methods: {
    getReportList() {
      this.isLoading = true;
      let data = {
        FromDate: this.fromInfo,
        ToDate: this.toInfo,
        SellerId: this.sellerName,
        ProductId: this.productName,
      };

      this.$store
          .dispatch("inventoryInformation", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.reportList = respons.data.productShareCount;
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
  }
}
</script>
<style lang="scss">
.inventoryInfo {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

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

      .buttons {
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
      }
      .single-btn {
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
        grid-template-columns: 7rem 12rem 12rem;
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
      margin: 1rem 0;
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
