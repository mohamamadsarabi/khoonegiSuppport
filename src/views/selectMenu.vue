<template>
  <div
      class="nav-wrapper newFactor selected-menu position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header-menu">
      <date-picker
          color="#664ECA"
          class="datePicker date"
          placeholder="تاریخ دریافت"
          v-model="selectedDate"
          auto-submit
      ></date-picker>
      <Multiselect
          class="select-seller"
          v-model="sellerName"
          :options="sellerList"
          placeholder="انتخاب میزبان"
          label="title"
          track-by="title"
          :searchable="true"
      />
      <khoonegiButton
          @click="searchMenu"
          class="form-button mt-0 slate"
          text="جستجو"
      />
    </div>
    <div class="content-menu">
      <div class="table-info pt-3" v-if="windowWith > 768">
        <table-lite
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
          <template v-slot:distributionPrice="item">
            {{ item.value.distributionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
          </template>
          <template v-slot:orderCount="item">
            <input type="number" min="0" :max="item.value.remain" v-model="item.value.orderCount"
                   @input="getOrderCount(item.value)" class="order-counter">
          </template>
        </table-lite>
      </div>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="menuList.length">
          <div class="info-item" v-for="(item, i) in menuList" :key="i">
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام میزبان</span>
              <p class="item-data">{{ item.sellerName }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام محصول</span>
              <p class="item-data">{{ item.productName }}</p>
            </div>
            <div class="item">
              <span class="item-head">بازه زمانی</span>
              <p class="item-data">{{ item.time }}</p>
            </div>
            <div class="item">
              <span class="item-head">هزینه ارسال</span>
              <p class="item-data">
                {{ item.distributionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">باقیمانده</span>
              <p class="item-data">{{ item.remain }}</p>
            </div>
            <div class="item">
              <span class="item-head">سفارش</span>
              <p class="item-data">
                <input type="number" min="0" :max="item.remain" v-model="item.orderCount" @input="getOrderCount(item)"
                       class="order-counter">
              </p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر گزارش موجود نمی‌باشد
        </div>
      </div>
    </div>
    <div class="complete-purchase">
      <khoonegiButton
          @click="completePurchase"
          class="form-button dark-slate"
          text="تکمیل خرید"
      />
    </div>
  </div>
  <LoadingFull :enable-loading-full="isLoading"/>

  <page-to-top/>
</template>

<script>
import pageToTop from "../components/pageToTop";
import Multiselect from "@vueform/multiselect";
import khoonegiButton from "@/components/khoonegiButton.vue";
import tableLite from "../components/khoonegiTable";
import {useToast} from "vue-toastification";
import LoadingFull from "@/components/LoadingCircle";

export default {
  name: "selectMenu",
  components: {
    khoonegiButton,
    pageToTop,
    Multiselect,
    tableLite,
    LoadingFull
  },

  data() {
    return {
      isLoading: false,
      toast: useToast(),
      selectedDate: "",
      sellerList: [],
      sellerName: "",
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
          width: "0.3%",
          sortable: false,
        },

        {
          label: "نام محصول",
          field: "productName",
          width: ".3%",
          sortable: false,
        },

        {
          label: "بازه زمانی",
          field: "time",
          width: ".3%",
          sortable: false,
        },
        {
          label: "هزینه ارسال",
          field: "distributionPrice",
          width: ".2%",
          sortable: false,
        },
        {
          label: "باقیمانده",
          field: "remain",
          width: ".2%",
          sortable: false,
        },
        {
          label: " سفارش",
          field: "orderCount",
          width: ".3%",
          sortable: false,
        },
      ],
      menuList: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر منو موجود نمی‌باشد",
      },
      orderCount: 0,
      selectedItem: []
    }
  },
  mounted() {
    this.searchMenu()
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
    searchMenu() {
      this.isLoading = true;
      const data = {
        SellerId: this.sellerName,
        Date: this.selectedDate,
        CustomerId: this.$route.params.id,
      };
      this.$store
          .dispatch("customerMenu", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              this.menuList = respons.data.menu;
              this.menuList.forEach((item) => {
                item.orderCount = 0
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
            this.isloading = true;
            console.log(error);
          });
    },
    getOrderCount(item) {
      if (item.orderCount > item.remain) {
        item.orderCount = item.remain;
      }
    },
    completePurchase() {
      localStorage.removeItem("orderCustomer")
      const menuSelect = this.menuList.filter(item => item.orderCount > 0);
      this.isLoading = true;
      const data = menuSelect;
      this.$store
          .dispatch("factorDeliveryMenu", data)
          .then((respons) => {
            this.isLoading = false;
            console.log(respons)
            const menuList = respons.data;
            menuList.menuDelivery.forEach((order)=>{
              console.log(order)
              order.deliveryTimes.forEach((item)=>{
                console.log(item)
                item.title = item.text;
                item.value = item.date;
              })
            })
            localStorage.setItem("orderCustomer", JSON.stringify(respons.data))
            this.$router.push(`/selectTimeOrder/${this.$route.params.id}`)
          })
          .catch((error) => {
            this.isLoading = false;
            this.$store.dispatch("handleError", error);
            this.isloading = true;
            console.log(error);
          });
    }
  }
}
</script>

<style lang="scss">
.complete-purchase {
  text-align: left;
  margin-top: 1rem;
}


.selected-menu {
  .header-menu {
    display: grid;
    grid-template-columns: 14% 14% 76%;
    align-items: center;
    column-gap: 1%;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 1rem;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .form-button {
    padding: 4px 0;
    font-size: 14px;
    font-weight: 400;
    width: 15% !important;
    @media (max-width: 768px) {
      width: 100% !important;
      margin-top: 1rem !important;
    }
  }

  .select-seller {
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

.order-counter {
  direction: ltr;
  border: 1px solid #BCBCBC;
  width: 20%;
  padding-left: 10px;
}
</style>
