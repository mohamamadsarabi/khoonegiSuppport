<template>
  <div
      class="nav-wrapper health position-relative end-0 py-3 px-4 mx-4"
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
        <Multiselect
            class="search-type seller-name"
            v-model="healthStatus"
            :options="healthStatusList"
            placeholder="انتخاب وضعیت "
            label="title"
            track-by="title"
            :searchable="true"
        >
        </Multiselect>
      </div>
      <div class="buttons">
        <khoonegiButton
            class="form-button mt-0 slate-not"
            text="مدیریت سوالات"
            @click="this.$router.push('/manageQuestions')"
        />
      </div>
    </div>
    <div class="table-info pt-3" v-if="windowWith > 768">
      <table-lite
          :is-slot-mode="true"
          :columns="columns"
          :rows="healthList"
          :total="totalRecordCount"
          :sortable="false"
          :is-hide-paging="true"
          :messages="message"
      >
        <template v-slot:statusDescription="item">
          <div style="padding: 0 5%;">
              <span class="statusClass">
                <khoonegi-badge
                    :status="item.value.status === 2 ? 6 : item.value.status"
                    :bgColor="item.value.status === 2 ? 6 : item.value.status"
                >{{ item.value.statusDescription }}</khoonegi-badge
                >
              </span>
          </div>
        </template>
        <template v-slot:visit="item">
          <khoonegiButton
              class="form-button mt-0 slate-not registerModal"
              text="ثبت بازدید"
              @click="registerModal(item.value.sellerId)"
          />
        </template>
        <template v-slot:haveVisit="item">
          <button @click="this.$router.push(`/visitHistory/${item.value.kitchenVisitId}/${item.value.name}`)"
                  :style="item.value.haveVisit === false ? 'user-select: none;opacity: 0.3;pointer-events: none;' : 'user-select: unset;opacity: 1;pointer-events: unset;'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
            >
              <path
                  d="M19.4424 10.8746L20.0517 11.312L19.4424 10.8746ZM19.4424 7.1254L18.8332 7.56278L19.4424 7.1254ZM20.3262 9H19.5762H20.3262ZM1.88376 10.8746L2.49302 10.4372L1.88376 10.8746ZM1.88376 7.1254L1.2745 6.68801L1.88376 7.1254ZM1 9H0.25H1ZM1.2745 11.312C2.14271 12.5214 3.43472 14.1105 5.01482 15.4043C6.58634 16.691 8.52214 17.75 10.6631 17.75V16.25C9.01732 16.25 7.41219 15.4285 5.96509 14.2437C4.52657 13.0659 3.32229 11.5923 2.49302 10.4372L1.2745 11.312ZM10.6631 17.75C12.804 17.75 14.7398 16.691 16.3114 15.4043C17.8915 14.1105 19.1835 12.5214 20.0517 11.312L18.8332 10.4372C18.0039 11.5923 16.7996 13.0659 15.3611 14.2437C13.914 15.4285 12.3089 16.25 10.6631 16.25V17.75ZM20.0517 6.68801C19.1835 5.47865 17.8915 3.88946 16.3114 2.59571C14.7398 1.30899 12.804 0.25 10.6631 0.25V1.75C12.3089 1.75 13.914 2.57146 15.3611 3.75631C16.7996 4.93414 18.0039 6.40765 18.8332 7.56278L20.0517 6.68801ZM10.6631 0.25C8.52214 0.25 6.58634 1.30899 5.01482 2.59572C3.43472 3.88946 2.1427 5.47865 1.2745 6.68801L2.49302 7.56278C3.32228 6.40765 4.52657 4.93414 5.96509 3.75631C7.41219 2.57146 9.01732 1.75 10.6631 1.75V0.25ZM20.0517 11.312C20.6061 10.5398 21.0762 9.92861 21.0762 9H19.5762C19.5762 9.35852 19.4571 9.56806 18.8332 10.4372L20.0517 11.312ZM18.8332 7.56278C19.4571 8.43194 19.5762 8.64148 19.5762 9H21.0762C21.0762 8.07139 20.6061 7.46024 20.0517 6.68801L18.8332 7.56278ZM2.49302 10.4372C1.86905 9.56806 1.75 9.35852 1.75 9H0.25C0.25 9.92861 0.72012 10.5398 1.2745 11.312L2.49302 10.4372ZM1.2745 6.68801C0.72012 7.46024 0.25 8.07139 0.25 9H1.75C1.75 8.64148 1.86905 8.43194 2.49302 7.56278L1.2745 6.68801ZM6.91309 9C6.91309 11.0711 8.59202 12.75 10.6631 12.75V11.25C9.42045 11.25 8.41309 10.2426 8.41309 9H6.91309ZM10.6631 12.75C12.7342 12.75 14.4131 11.0711 14.4131 9H12.9131C12.9131 10.2426 11.9057 11.25 10.6631 11.25V12.75ZM14.4131 9C14.4131 6.92893 12.7342 5.25 10.6631 5.25V6.75C11.9057 6.75 12.9131 7.75736 12.9131 9H14.4131ZM10.6631 5.25C8.59202 5.25 6.91309 6.92893 6.91309 9H8.41309C8.41309 7.75736 9.42045 6.75 10.6631 6.75V5.25Z"
                  fill="#393939"
              />
            </svg>
          </button>
        </template>
      </table-lite>
    </div>
    <div v-else-if="windowWith <= 768" class="table-info-mobile">
      <div v-if="healthList.length">
        <div class="info-item" v-for="(item, i) in healthList" :key="i">
          <div>
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام میزبان</span>
              <button class="btn-link">
                {{ item.name }}
              </button>
            </div>
            <div class="item">
              <span class="item-head">تاریخ</span>
              <p class="item-data">{{ item.lastModifyDate }}</p>
            </div>
            <div class="item">
              <span class="item-head">وضعیت</span>
              <p class="item-data">{{ item.statusDescription }}</p>
            </div>
            <div class="item">
              <span class="item-head">امتیاز</span>
              <p class="item-data">{{ item.score }}</p>
            </div>
            <div class="item">
              <span class="item-head">بازدید</span>
              <p class="item-data">
                <khoonegiButton
                    class="form-button mt-0 slate-not registerModal"
                    text="ثبت بازدید"
                    @click="registerModal(item.sellerId)"
                />
              </p>
            </div>
            <div class="item">
              <span class="item-head">تاریخچه بازدیدها</span>
              <p class="item-data">
                <button @click="this.$router.push(`/visitHistory/${item.kitchenVisitId}/${item.name}`)"
                        :style="item.haveVisit === false ? 'user-select: none;opacity: 0.3;pointer-events: none;' : 'user-select: unset;opacity: 1;pointer-events: unset;'">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="18"
                      viewBox="0 0 22 18"
                      fill="none"
                  >
                    <path
                        d="M19.4424 10.8746L20.0517 11.312L19.4424 10.8746ZM19.4424 7.1254L18.8332 7.56278L19.4424 7.1254ZM20.3262 9H19.5762H20.3262ZM1.88376 10.8746L2.49302 10.4372L1.88376 10.8746ZM1.88376 7.1254L1.2745 6.68801L1.88376 7.1254ZM1 9H0.25H1ZM1.2745 11.312C2.14271 12.5214 3.43472 14.1105 5.01482 15.4043C6.58634 16.691 8.52214 17.75 10.6631 17.75V16.25C9.01732 16.25 7.41219 15.4285 5.96509 14.2437C4.52657 13.0659 3.32229 11.5923 2.49302 10.4372L1.2745 11.312ZM10.6631 17.75C12.804 17.75 14.7398 16.691 16.3114 15.4043C17.8915 14.1105 19.1835 12.5214 20.0517 11.312L18.8332 10.4372C18.0039 11.5923 16.7996 13.0659 15.3611 14.2437C13.914 15.4285 12.3089 16.25 10.6631 16.25V17.75ZM20.0517 6.68801C19.1835 5.47865 17.8915 3.88946 16.3114 2.59571C14.7398 1.30899 12.804 0.25 10.6631 0.25V1.75C12.3089 1.75 13.914 2.57146 15.3611 3.75631C16.7996 4.93414 18.0039 6.40765 18.8332 7.56278L20.0517 6.68801ZM10.6631 0.25C8.52214 0.25 6.58634 1.30899 5.01482 2.59572C3.43472 3.88946 2.1427 5.47865 1.2745 6.68801L2.49302 7.56278C3.32228 6.40765 4.52657 4.93414 5.96509 3.75631C7.41219 2.57146 9.01732 1.75 10.6631 1.75V0.25ZM20.0517 11.312C20.6061 10.5398 21.0762 9.92861 21.0762 9H19.5762C19.5762 9.35852 19.4571 9.56806 18.8332 10.4372L20.0517 11.312ZM18.8332 7.56278C19.4571 8.43194 19.5762 8.64148 19.5762 9H21.0762C21.0762 8.07139 20.6061 7.46024 20.0517 6.68801L18.8332 7.56278ZM2.49302 10.4372C1.86905 9.56806 1.75 9.35852 1.75 9H0.25C0.25 9.92861 0.72012 10.5398 1.2745 11.312L2.49302 10.4372ZM1.2745 6.68801C0.72012 7.46024 0.25 8.07139 0.25 9H1.75C1.75 8.64148 1.86905 8.43194 2.49302 7.56278L1.2745 6.68801ZM6.91309 9C6.91309 11.0711 8.59202 12.75 10.6631 12.75V11.25C9.42045 11.25 8.41309 10.2426 8.41309 9H6.91309ZM10.6631 12.75C12.7342 12.75 14.4131 11.0711 14.4131 9H12.9131C12.9131 10.2426 11.9057 11.25 10.6631 11.25V12.75ZM14.4131 9C14.4131 6.92893 12.7342 5.25 10.6631 5.25V6.75C11.9057 6.75 12.9131 7.75736 12.9131 9H14.4131ZM10.6631 5.25C8.59202 5.25 6.91309 6.92893 6.91309 9H8.41309C8.41309 7.75736 9.42045 6.75 10.6631 6.75V5.25Z"
                        fill="#393939"
                    />
                  </svg>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        در حال حاضر بازخورد موجود نمی‌باشد
      </div>
    </div>
  </div>
  <Dialog v-model:visible="showAddModal" class="Visit-modal">
    <template #header>
      <div class="header">
        <h3>ثبت بازدید</h3>
        <button @click="showAddModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="input-list">
        <div class="field">
          <h6>انتخاب تاریخ:</h6>
          <date-picker
              color="#664ECA"
              type="date"
              class="datePicker"
              placeholder=""
              v-model="timeVisit"
              format="YYYY.MM.DD"
              display-format="jYYYY.jMM.jDD"
              auto-submit
          ></date-picker>
        </div>
        <div class="field">
          <h6>نوع بازدید:</h6>
          <div class="radio-select">
            <div v-for="(type , i) in visitType" :key="i">
              <input :value="type.value" type="radio" :id="i" name="type" @input="valueVisitType = type.value">
              <label :for="i">{{ type.title }}</label>
            </div>
          </div>
        </div>
        <div class="field">
          <h6 style="color: transparent;user-select: none;pointer-events: none;">نوع بازدید:</h6>
          <div class="radio-select" style="margin-top: 1rem;">
            <div v-for="(status , index) in visitStatus" :key="index">
              <input :value="status.value" type="radio" :id="index + 2" name="visit"
                     @input="valueVisitStatus = status.value">
              <label :for="index + 2">{{ status.title }}</label>
            </div>
          </div>
        </div>
      </div>
      <khoonegiButton
          class="form-button mt-0 slate create-discount"
          text="ثبت"
          :loading="isLoading"
          :disabled="setDisabled()"
          @click="registerVisit"
      />
    </div>
  </Dialog>
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
import Dialog from "primevue/dialog";
import khoonegiBadge from "@/components/khoonegiBadge";
import moment from 'moment-jalaali'

export default {
  name: "health",
  components: {
    pageToTop,
    tableLite,
    Multiselect,
    khoonegiButton,
    LoadingFull,
    Dialog,
    khoonegiBadge
  },
  data() {
    return {
      showAddModal: false,
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
          field: "name",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "تاریخ",
          field: "lastModifyDate",
          width: ".6%",
          sortable: false,
        },
        {
          label: "وضعیت",
          field: "statusDescription",
          width: ".5%",
          sortable: false,
        },
        {
          label: `امتیاز`,
          field: "score",
          width: "0.7%",
          sortable: false,
        },
        {
          label: "بازدید",
          field: "visit",
          width: "0.7%",
          sortable: false,
        },
        {
          label: "تاریخچه بازدیدها",
          field: "haveVisit",
          width: "0.8%",
          sortable: false,
        },
      ],
      rows: [],
      healthList: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر میزبان موجود نمی‌باشد",
      },
      timeVisit: moment().utc().format('YYYY.MM.DD'),
      isLoading: false,
      sellerList: [],
      sellerName: "",
      sellerStatus: "",
      sellerId: "",
      visitType: this.$store.state.visitTypes,
      visitStatus: this.$store.state.visitStatus,
      valueVisitType: -1,
      valueVisitStatus: 2,
      visitDisable: true,
      healthStatus: -1,
      healthStatusList: []

    }
  },
  mounted() {
    this.getHealthList();
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
    this.$store.dispatch("healthStatusDescription").then((respons) => {
      console.log(respons)
      this.healthStatusList = respons.data;
    });
  },
  methods: {
    setDisabled(){
      if(this.valueVisitType === 0 || this.valueVisitType === 1){
        return false;
      } else {
        return true;
      }
    },
    setStatus(value) {
      console.log(value)
    },
    setType(value) {
      console.log(value)
    },
    getHealthList() {
      console.log(this.isLoading)
      this.isLoading = true;
      let data = {
        FromDate: "",
        ToDate: "",
        SellerId: this.sellerName ? this.sellerName : "",
        Status: this.healthStatus
      };

      this.$store
          .dispatch("kitchenVisitIndex", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.healthList = respons.data.sellers;
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
    getQuestionList() {
      this.isLoading = true;
      let data = {
        Date: this.timeVisit,
        SellerId: this.sellerId,
        Description: "",
        VisitType: this.valueVisitType,
        VisitStatus: this.valueVisitStatus,
      };
      this.$store
          .dispatch("addKitchenVisit", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
               this.getHealthList();
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
    registerModal(id) {
      this.valueVisitType = -1;
      this.valueVisitStatus = 2;
      this.showAddModal = true;
      this.sellerId = id;
    },
    registerVisit() {
      console.log(this.valueVisitStatus)
      console.log(this.valueVisitType)
      if ((this.valueVisitStatus === 0 || this.valueVisitStatus === 1) && (this.valueVisitType === 0 || this.valueVisitType === 1)) {
        this.showAddModal = false;
        this.getQuestionList()
        console.log("1")
      } else if(this.valueVisitStatus === 2) {
        console.log(this.valueVisitStatus)
        this.$router.push(`/questionsSeller/${this.timeVisit}/${this.valueVisitType}/${this.valueVisitStatus}/${this.sellerId}`)
        console.log("2")
      }
    }

  },
  watch: {
    sellerName: function () {
      this.getHealthList();
    },
    healthStatus: function () {
      this.getHealthList();
    },
  }
}
</script>

<style lang="scss">

.health {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .registerModal {
    padding: 0;
    width: 8rem;
    @media (max-width: 768px) {
      padding: 12px;
    }
  }

  .header-product {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 15px;
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr auto;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;

    }

    .filters {
      display: grid;
      grid-template-columns: 17% 17%;
      grid-column-gap: 1%;
      @media (max-width: 768px) {
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
        grid-template-columns: auto 1fr;

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
