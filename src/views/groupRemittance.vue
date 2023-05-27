<template>
  <div
      class="nav-wrapper groupRemittance position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header-report">
      <div class="search">
        <div class="selected-type">
          <date-picker
              color="#664ECA"
              class="datePicker"
              placeholder="از تاریخ"
              v-model="fromDate"
              auto-submit
          ></date-picker>
          <date-picker
              color="#664ECA"
              class="datePicker"
              placeholder="تا تاریخ"
              v-model="toDate"
              auto-submit
          ></date-picker>
        </div>
        <input type="text" v-model="descriptionTransfer" placeholder="توضیحات انتقال..." class="global-input" maxlength="30">
        <div class="buttons">
          <khoonegiButton
              class="form-button mt-0 slate-blur"
              text="فایل حواله"
              :icon="false"
              @click="getFileBank"
          />
          <khoonegiButton
              class="form-button mt-0 slate-blur"
              text="جستجو"
              :icon="true"
              @click="getReportList"
          />
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
              <span class="item-head">شماره سپرده</span>
              <p class="item-data">
                {{ item.depositorsId }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">نام میزبان</span>
              <p class="item-data">
                {{ item.sellerName }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">شماره حساب</span>
              <p class="item-data">
                {{ item.accountNumber }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">جمع کل</span>
              <p class="item-data">
                {{ item.totalPayment }}
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
import khoonegiButton from "../components/khoonegiButton.vue";
import tableLite from "../components/khoonegiTable";
import {useToast} from "vue-toastification";

export default {
  name: "groupRemittance",
  components: {
    pageToTop,
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
          label: "نام میزبان",
          field: "sellerName",
          width: ".3%",
          sortable: false,
        },

        {
          label: "شماره سپرده",
          field: "depositorsId",
          width: ".3%",
          sortable: false,
        },
        {
          label: "شماره حساب",
          field: "accountNumber",
          width: ".3%",
          sortable: false,
        },
        {
          label: "جمع کل",
          field: "totalPayment",
          width: ".3%",
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
      fromDate: "",
      toDate: "",
      totalItems: {},
      today: "",
      descriptionTransfer: "",
    }
  },
  mounted() {
    this.getReportList()
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
      console.log(this.customerId)
    },
    getReportList() {
      this.isLoading = true;
      let data = {
        FromDate: this.fromDate,
        ToDate: this.toDate,
      };

      this.$store
          .dispatch("bankFinanceTextFile", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.reportList = respons.data.financeResult;
              this.totalItems = respons.data.totalFinanceResult;
              this.today = respons.data.today;
              this.reportList.forEach((item, index) => {
                item.row = index;
                item.row++;
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
    getFileBank() {
      let textReportFile = [];
      textReportFile.unshift(this.totalItems.totalCount + this.totalItems.totalPrice)
      this.reportList.map((item)=>{
        textReportFile.push(item.accountNumber + item.totalPayment + item.depositorsId + this.descriptionTransfer)
      })
      for (let i = 0; i < textReportFile.length; i++) {
        textReportFile = textReportFile.toString().replace("," , "\n")
      }
      let a = document.createElement('a');
      a.href = "data:application/octet-stream," + encodeURIComponent(textReportFile);
      a.download = `ELFL${this.today}.txt`;
      a.click();
    }
  }
}
</script>
<style lang="scss">
.groupRemittance {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .header-report {
    border-bottom: 0.5px solid #e4e4e4;
    padding-bottom: 15px;

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
        display: flex;
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
        grid-template-columns: 12rem 12rem;
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
      .global-input {
        width: 25%;
      }
    }

    .filters {
      margin: 2rem 0;
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
