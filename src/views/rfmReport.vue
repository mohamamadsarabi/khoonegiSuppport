<template>
  <div
      class="nav-wrapper reportRFM position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header-report">
      <div class="search">
        <div class="selected-type">
          <span>نوع جستجو: </span>
          <Multiselect
              class="search-type seller-name"
              v-model="rfmName"
              :options="rfmType"
              placeholder="انتخاب کنید "
              label="title"
              track-by="value"
          />
        </div>
        <div class="buttons">
          <!--          <khoonegiButton-->
          <!--              @click="notifyModal = true"-->
          <!--              class="form-button mt-0 dark-slate"-->
          <!--              text="ارسال نوتیفای"-->
          <!--          />-->
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
          <template v-slot:totalPayment="item">
            {{ (item.value.totalPayment * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
          </template>
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
              <p class="item-data">{{ item.customerPhone }}</p>
            </div>
            <div class="item">
              <span class="item-head"> ثبت نام</span>
              <p class="item-data">{{ item.registerDate }}</p>
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
                {{ (item.totalPayment * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </p>
            </div>
            <div class="item mb-4">
              <span class="item-head">نوع</span>
              <p class="item-data">
                {{ item.typeText }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر گزارش موجود نمی‌باشد
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
      />
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
import Paginate from "vuejs-paginate-next";
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
// import searchIcon from "../components/searchIcon";
import khoonegiButton from "../components/khoonegiButton.vue";
import tableLite from "../components/khoonegiTable";
import {useToast} from "vue-toastification";
import Dialog from "primevue/dialog";

export default {
  name: "reportRFM",
  components: {
    pageToTop,
    Multiselect,
    khoonegiButton,
    tableLite,
    Dialog,
    LoadingFull,
    Paginate
  },
  data() {
    return {
      pageCount: 1,
      pageIndex: 1,
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
        {
          title: "میزبانان",
          value: 3
        },
      ],
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
          field: "customerPhone",
          width: ".3%",
          sortable: false,
        },

        {
          label: " ثبت نام",
          field: "registerDate",
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
          label: "نوع",
          field: "typeText",
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
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر گزارش موجود نمی‌باشد",
      },

      notifyModal: false,
      notifyMessage: "",
      isLoading: false,
      rfmType: [],
      rfmName: ""

    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
    //  get rfm type api
    this.$store.dispatch("customerRfmType").then((respons) => {
      this.rfmType = respons.data;
    });
  },
  methods: {
    changePage(pageNumber) {
      this.pageIndex = pageNumber;
    },
    sendNotify() {
      console.log(this.customerId)
    },
    setFilterChecked() {
      this.firstOrderIdenti = !this.firstOrderIdenti;
    },

    getReportList() {
      this.isLoading = true;
      let data = {
        Type: this.rfmName,
        PageNumber: this.pageIndex,
      };

      this.$store
          .dispatch("customerRFMReport", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.reportList = respons.data.customers;
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
  },
  watch: {
    pageIndex: function () {
      this.getReportList();
    },
  }
}
</script>
<style lang="scss">
.reportRFM {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .pagination {
    @media (max-width: 768px){
      display: inline-block;
      text-align: center;
    }
  }

  .header-report {
    border-bottom: 1px solid #E9E9E9;
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

      .buttons, .single-btn {
        display: grid;
        grid-template-columns: 1fr;
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
        grid-template-columns: 7rem 13rem;
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
