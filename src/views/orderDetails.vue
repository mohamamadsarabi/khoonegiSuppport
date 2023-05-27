<template>
  <div
      class="nav-wrapper newFactor orderDetails position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="customer-details">
      <div class="customer-name">
        <h6>نام مشتری:</h6>
        <p>{{ customerName }}</p>
      </div>
      <div class="seller-name">
        <h6>نام میزبان:</h6>
        <p>{{ sellerName }}</p>
      </div>
      <div class="order-date">
        <h6>تاریخ سفارش:</h6>
        <p>{{ orderDate }}</p>
      </div>
    </div>
    <table-lite
        class="mt-4"
        v-if="windowWith > 768"
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
    </table-lite>
    <div v-else-if="windowWith <= 768" class="table-info-mobile">
      <div v-if="menuList.length">
        <div class="info-item" v-for="(item, i) in menuList" :key="i">
          <div class="item">
            <span class="item-head">ردیف</span>
            <p class="item-data">{{ item.row }}</p>
          </div>
          <div class="item">
            <span class="item-head">نام محصول </span>
            <p class="item-data">{{ item.name }}</p>
          </div>
          <div class="item">
            <span class="item-head">تاریخ فروش</span>
            <p class="item-data">{{ item.date }}</p>
          </div>

          <div class="item">
            <span class="item-head">نام میزبان</span>
            <p class="item-data">
              {{ item.sellerName }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">بازه زمانی</span>
            <p class="item-data">{{ item.time }}</p>
          </div>
          <div class="item">
            <span class="item-head">تعداد کل</span>
            <p class="item-data">
              {{ item.count }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">رزرو</span>
            <p class="item-data">
              {{ item.reservedCount }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">فروش رفته</span>
            <p class="item-data">
              {{ item.sellCount }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">باقیمانده</span>
            <p class="item-data">
              {{ item.remain }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-center">در حال حاضر منو موجود نمی‌باشد</div>
    </div>
    <div class="btn-box">
      <khoonegiButton
          @click="reversAddress"
          class="form-button mt-4 dark-slate"
          text="ثبت سفارش"
      />
    </div>

  </div>
  <page-to-top/>
</template>

<script>
import pageToTop from "../components/pageToTop";
import tableLite from "../components/khoonegiTable";
import khoonegiButton from "@/components/khoonegiButton.vue";

export default {
  name: "orderDetails",
  components: {
    pageToTop,
    tableLite,
    khoonegiButton
  },
  data() {
    return {
      orderDate: "1400/12/30",
      customerName: "علی علاالدین حسینی شیرازی",
      sellerName: "گلین خاتون",
      windowWith: window.innerWidth,
      message: {
        noDataAvailable: "در حال حاضر محصول موجود نمی‌باشد",
      },
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".2%",
          sortable: false,
        },
        {
          label: "نام محصول",
          field: "name",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "تعداد سفارش",
          field: "date",
          width: ".6%",
          sortable: false,
        },
        {
          label: "بازه زمانی",
          field: "sellerName",
          width: "1%",
          sortable: false,
        },
        {
          label: "ساعت دریافت",
          field: "time",
          width: ".6%",
          sortable: false,
        },
      ],
      totalRecordCount: 0,
    }
  }
}
</script>

<style lang="scss">
.orderDetails {
  .customer-details {
    display: grid;
    grid-template-columns: 75% 1fr 1fr;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 1rem;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    div {
      display: flex;
      column-gap: 10px;
      @media (max-width: 768px) {
        justify-content: space-between;
        margin-bottom: 1rem;
        h6, p {
          font-size: 12px !important;
        }
      }

      h6 {
        font-weight: 700;
        font-size: 14px;
        line-height: 15px;
        color: #664ECA;
      }

      p {
        line-height: 15px !important;
        color: #393939;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
  .btn-box {
    text-align: left;

    button {
      width: 15%;
    }
  }
}


;
</style>
