<template>
  <div
      class="nav-wrapper ComprehensiveProductReport position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header-product">
      <div class="filters">
        <Multiselect
            class="search-type seller-name"
            v-model="sellerName"
            :options="sellerList"
            placeholder="نام میزبان "
            label="title"
            track-by="title"
            :searchable="true"

        />
        <date-picker
            color="#664ECA"
            class="datePicker selectedDate"
            placeholder="انتخاب تاریخ"
            v-model="formDate"
            auto-submit
        ></date-picker>
        <date-picker
            color="#664ECA"
            class="datePicker selectedDate"
            placeholder="انتخاب تاریخ"
            v-model="toDate"
            auto-submit
        ></date-picker>
        <Multiselect
            class="search-type seller-name"
            v-model="likeCount"
            :options="this.$store.state.likeCount"
            placeholder="تعداد لایک "
            label="title"
            track-by="title"
            :searchable="true"
        >
        </Multiselect>
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
    <div class="table-info pt-3" v-if="windowWith > 768">
      <table-lite
          :is-slot-mode="true"
          :columns="columns"
          :rows="reportList"
          :total="totalRecordCount"
          :sortable="false"
          :is-hide-paging="true"
          :messages="message"
      >
      </table-lite>
    </div>
    <div v-else-if="windowWith <= 768" class="table-info-mobile">
      <div v-if="reportList.length">
        <div class="info-item" v-for="(item, i) in reportList" :key="i">
          <div>
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام میزبان</span>
              <button class="btn-link">
                {{ item.brand }}
              </button>
            </div>
            <div class="item">
              <span class="item-head">نام محصول</span>
              <p class="item-data">{{ item.productName }}</p>
            </div>
            <div class="item">
              <span class="item-head">فروش کل</span>
              <p class="item-data">{{ item.sellCount }}</p>
            </div>
            <div class="item">
              <span class="item-head">پسندیده</span>
              <p class="item-data">{{ item.likeCount }}</p>
            </div>
            <div class="item">
              <span class="item-head">نپسندیده</span>
              <p class="item-data">{{ item.disLikeCount }}</p>
            </div>
            <div class="item">
              <span class="item-head">علاقه‌مندی</span>
              <p class="item-data">{{ item.favoriteCount }}</p>
            </div>
            <div class="item">
              <span class="item-head">اشتراک</span>
              <p class="item-data">{{ item.shareCount }}</p>
            </div>
            <div class="item">
              <span class="item-head">زنگوله</span>
              <p class="item-data">{{ item.needToReportCount }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        در حال حاضر بازخورد موجود نمی‌باشد
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
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import {useToast} from "vue-toastification";
import khoonegiButton from "../components/khoonegiButton.vue";

export default {
  name: "ComprehensiveProductReport",
  components: {
    pageToTop,
    tableLite,
    Multiselect,
    khoonegiButton,
    LoadingFull
  },
  data() {
    return {
      toast: useToast(),
      selectedDate: "",
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
          field: "brand",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "نام محصول",
          field: "productName",
          width: ".6%",
          sortable: false,
        },
        {
          label: "فروش کل",
          field: "sellCount",
          width: ".5%",
          sortable: false,
        },
        {
          label: `پسندیده`,
          field: "likeCount",
          width: "0.7%",
          sortable: false,
        },
        {
          label: "نپسندیده",
          field: "disLikeCount",
          width: "0.7%",
          sortable: false,
        },
        {
          label: "علاقه‌مندی",
          field: "favoriteCount",
          width: "0.1%",
          sortable: false,
        },
        {
          label: "اشتراک",
          field: "shareCount",
          width: "0.7%",
          sortable: false,
        },
        {
          label: "زنگوله",
          field: "needToReportCount",
          width: "0.5%",
          sortable: false,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر گزارش موجود نمی‌باشد",
      },
      reportList: [],
      sellerList: [],
      sellerName: "",
      formDate: "",
      toDate: "",
      likeCount: -1,
      isLoading: false
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
    getReportList() {
      console.log(this.isLoading)
      this.isLoading = true;
      let data = {
        FromDate: this.formDate,
        ToDate: this.toDate,
        SellerId: this.sellerName ? this.sellerName : "",
        LikeCount: this.likeCount
      };

      this.$store
          .dispatch("ComprehensiveProduct", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.reportList = respons.data.productReport;
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
.ComprehensiveProductReport {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .header-product {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 15px;
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr auto;
    @media (max-width: 768px){
      grid-template-columns: 1fr;

    }
    .filters {
      display: grid;
      grid-template-columns: 18% 12% 12% 12%;
      grid-column-gap: 1%;
      @media (max-width: 768px){
        grid-template-columns: 1fr;
        grid-row-gap: 15px;
      }
    }

    .selectedDate {
      display: block;
      margin: 0;
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
</style>
