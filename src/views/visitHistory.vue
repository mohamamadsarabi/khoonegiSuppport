<template>
  <div
      class="nav-wrapper visitHistory position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header-product">
      <h6>تاریخچه بازدیدها</h6>
      <div>
        <span>نام میزبان:</span>
        <span>{{this.$route.params.name}}</span>
      </div>
    </div>
    <div class="table-info pt-3" v-if="windowWith > 768">
      <table-lite
          :is-slot-mode="true"
          :columns="columns"
          :rows="historyList"
          :total="totalRecordCount"
          :sortable="false"
          :is-hide-paging="true"
          :messages="message"
      >
      </table-lite>
    </div>
    <div v-else-if="windowWith <= 768" class="table-info-mobile">
      <div v-if="historyList.length">
        <div class="info-item" v-for="(item, i) in historyList" :key="i">
          <div>
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">تاریخ بازدید</span>
              <button class="btn-link">
                {{ item.createDate }}
              </button>
            </div>
            <div class="item">
              <span class="item-head">نوع بازدید</span>
              <p class="item-data">{{ item.visitTypeDescription }}</p>
            </div>
            <div class="item">
              <span class="item-head">امتیاز</span>
              <p class="item-data">{{ item.score }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        در حال حاضر تاریخچه موجود نمی‌باشد
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

export default {
  name: "visitHistory",
  components: {
    pageToTop,
    tableLite,
    LoadingFull,
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
          label: "تاریخ بازدید",
          field: "createDate",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "نوع بازدید",
          field: "visitTypeDescription",
          width: ".6%",
          sortable: false,
        },
        {
          label: "امتیاز",
          field: "score",
          width: ".5%",
          sortable: false,
        },

      ],
      rows: [],
      historyList: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر تاریخچه موجود نمی‌باشد",
      },
      timeVisit: "",
      isLoading: false
    }
  },
  mounted() {
    this.getHistoryList()
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
    getHistoryList() {
      console.log(this.isLoading)
      this.isLoading = true;
      this.$store
          .dispatch("kitchenVisitsHistory", this.$route.params.id)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.historyList = respons.data.kitchenVisitHistory;
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
.visitHistory {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
.table-info {
  .khoonegi {
    padding: 0 20%;
    @media (max-width: 768px){
      padding: 0;
    }
  }
}
  .header-product {
    border-bottom: 1px solid #E9E9E9;
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr auto;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;

    }

    h6 {
      color: #664ECA;
    }
  }
}

.p-dialog.Visit-modal {
  width: 30rem;
  height: 21rem;
  @media (max-width: 768px) {
    width: 25rem;
    height: 25rem;
  }

  .content {
    margin: 5% 10%;

    .create-discount {
      width: 35%;
      display: block;
      float: left;
    }
  }

  .input-list {
    margin-bottom: 2rem;

    .field {
      display: grid;
      grid-template-columns: 35% 65%;
      align-items: baseline;
      margin-bottom: 1rem;

      .radio-select {
        display: grid;
        grid-template-columns: 1fr 1fr;

        div {
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 1rem;
          align-items: baseline;
        }
      }

      .global-input {
        padding: 0.2rem 0.8rem;

        &::placeholder {
          font-size: 12px;
          text-align: center;
        }
      }

      h6 {
        font-size: 14px;
        color: #2f2a43;
        font-weight: 500;
      }

      .flex-date {
        display: flex;
        gap: 20px;

        .form-control {
          border-radius: 8px !important;
          border-color: #b5b5b5;
          color: #b5b5b5 !important;

          &::placeholder {
            color: #b5b5b5 !important;
          }
        }
      }

      label {
        display: block;
        cursor: pointer;
        //font-weight: 300 !important;
      }

      input[type="radio"] {
        visibility: hidden;
      }

      input[type="radio"]::before {
        border: 2px solid gray;
        height: 1.2em;
        width: 1.2em;
        border-radius: 50%;
        display: block;
        content: " ";
        cursor: pointer;
        visibility: visible;
      }

      input[type="radio"]:checked ~ label {
        color: #664eca;
      }

      input[type="radio"]:checked::before {
        background: radial-gradient(#664eca 50%, transparent 60%);
        border: 2px solid #664eca;
      }
    }
  }
}
</style>
