<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card infoChef-card py-2 px-4">
          <div class="header-infoChef pb-3">
            <div class="row">
              <div class="col-lg-4 selected-Condition">
                <div class="row-grid">
                  <date-picker
                      color="#664ECA"
                      class="datePicker fromDate"
                      placeholder="از تاریخ"
                      v-model="fromDate"
                      auto-submit
                  ></date-picker>
                  <date-picker
                      color="#664ECA"
                      class="datePicker toDate"
                      placeholder="تا تاریخ"
                      v-model="toDate"
                      auto-submit
                  ></date-picker>
                </div>
              </div>
              <div class="col-lg-8 col-12 new-process">
                <khoonegiButton
                    v-if="userState == 0"
                    class="form-button mt-0 slate"
                    text="جدید"
                    @click="this.$router.push('/canellingFactor')"
                />
              </div>
            </div>
          </div>
          <div class="table-info pt-3" v-if="windowWith > 768">
            <table-lite
                :is-fixed-first-column="true"
                :is-slot-mode="true"
                :columns="columns"
                :rows="processList"
                :total="totalRecordCount"
                :sortable="false"
                @do-search="doSearch"
                @is-finished="isLoading = false"
                :is-hide-paging="true"
                :messages="message"
            >
              <template v-slot:status="item">
                <div style="padding: 0 5%;">
                  <span class="statusClass">
                    <khoonegi-badge
                        :status="item.value.status"
                        :bgColor="item.value.status"
                    >{{ item.value.statusDescription }}</khoonegi-badge
                    >
                  </span>
                </div>
              </template>
              <template v-slot:details="item">
                <button
                    @click="
										$router.push(
											`/detailCancellOrder/${item.value.processId}/${item.value.status}`
										)
									"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 19 20"
                      fill="none"
                  >
                    <path
                        d="M10.4744 5.5814C10.0708 5.5814 9.74359 5.89376 9.74359 6.27907C9.74359 6.66439 10.0708 6.97674 10.4744 6.97674H13.3974C13.801 6.97674 14.1282 6.66439 14.1282 6.27907C14.1282 5.89376 13.801 5.5814 13.3974 5.5814H10.4744Z"
                        fill="#FFAC30"
                    />
                    <path
                        d="M5.60256 9.30233C5.19897 9.30233 4.87179 9.61469 4.87179 10C4.87179 10.3853 5.19897 10.6977 5.60256 10.6977H13.3974C13.801 10.6977 14.1282 10.3853 14.1282 10C14.1282 9.61469 13.801 9.30233 13.3974 9.30233H5.60256Z"
                        fill="#FFAC30"
                    />
                    <path
                        d="M10.4744 13.0233C10.0708 13.0233 9.74359 13.3356 9.74359 13.7209C9.74359 14.1062 10.0708 14.4186 10.4744 14.4186H13.3974C13.801 14.4186 14.1282 14.1062 14.1282 13.7209C14.1282 13.3356 13.801 13.0233 13.3974 13.0233H10.4744Z"
                        fill="#FFAC30"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.8491 0.115096C12.7362 -1.3515e-05 11.3335 -7.47302e-06 9.54409 1.23104e-07H9.45591C7.66647 -7.47302e-06 6.26378 -1.3515e-05 5.15093 0.115096C4.01527 0.232564 3.09511 0.476581 2.30946 1.02154C1.83383 1.35145 1.41556 1.75078 1.06999 2.20487C0.499188 2.95494 0.243596 3.83343 0.120556 4.91765C-1.41561e-05 5.9801 -7.82751e-06 7.31927 1.28945e-07 9.02767V10.9405C1.28945e-07 12.0196 1.28857e-07 12.9474 0.0286156 13.7448C0.0911564 15.4876 0.288699 16.7685 1.06999 17.7951C1.41556 18.2492 1.83383 18.6486 2.30946 18.9785C3.38482 19.7244 4.72649 19.913 6.5519 19.9727C7.38713 20 8.35894 20 9.48927 20H9.54411C11.3335 20 12.7362 20 13.8491 19.8849C14.9847 19.7674 15.9049 19.5234 16.6905 18.9785C17.1662 18.6486 17.5844 18.2492 17.93 17.7951C18.5008 17.0451 18.7564 16.1666 18.8794 15.0823C19 14.0199 19 12.6808 19 10.9724V9.02765C19 7.31929 19 5.98009 18.8794 4.91765C18.7564 3.83343 18.5008 2.95494 17.93 2.20487C17.5844 1.75078 17.1662 1.35145 16.6905 1.02154C15.9049 0.476581 14.9847 0.232564 13.8491 0.115096ZM3.16853 2.1504C3.66351 1.80706 4.29705 1.60693 5.30835 1.50233C6.33333 1.39631 7.65693 1.39535 9.5 1.39535C11.3431 1.39535 12.6667 1.39631 13.6916 1.50233C14.7029 1.60693 15.3365 1.80706 15.8315 2.1504C16.183 2.39425 16.4922 2.68941 16.7476 3.02504C17.1072 3.4976 17.3168 4.10245 17.4264 5.06795C17.5375 6.04651 17.5385 7.31017 17.5385 9.06977V10.9302C17.5385 12.6898 17.5375 13.9535 17.4264 14.9321C17.3168 15.8976 17.1072 16.5024 16.7476 16.975C16.4922 17.3106 16.183 17.6058 15.8315 17.8496C15.3365 18.1929 14.7029 18.3931 13.6916 18.4977C12.6667 18.6037 11.3431 18.6047 9.5 18.6047C8.6734 18.6047 7.94903 18.6046 7.30591 18.5946C7.30166 18.1531 7.28727 17.828 7.23872 17.5353C6.85902 15.2466 4.97886 13.4516 2.58156 13.0891C2.27502 13.0428 1.93456 13.029 1.47208 13.025C1.46159 12.411 1.46154 11.7194 1.46154 10.9302V9.06977C1.46154 7.31017 1.46254 6.04651 1.57359 5.06795C1.68316 4.10245 1.89278 3.4976 2.2524 3.02504C2.50782 2.68941 2.81698 2.39425 3.16853 2.1504ZM5.79517 17.7536C5.82681 17.9444 5.83888 18.1652 5.84344 18.5419C4.51798 18.4547 3.75261 18.2547 3.16853 17.8496C2.81698 17.6058 2.50782 17.3106 2.2524 16.975C1.82804 16.4173 1.61862 15.6866 1.52725 14.4212C1.92181 14.4255 2.15315 14.4371 2.35293 14.4673C4.12484 14.7352 5.51453 16.062 5.79517 17.7536Z"
                        fill="#FFAC30"
                    />
                  </svg>
                </button>
              </template>
            </table-lite>
            <LoadingFull :enable-loading-full="isLoading"/>
          </div>
          <div v-else-if="windowWith <= 768" class="table-info-mobile">
            <div v-if="processList.length">
              <div class="info-item" v-for="(item, i) in processList" :key="i">
                  <div class="item">
                    <span class="item-head">ردیف</span>
                    <p class="item-data">{{ item.row + 1 }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">شماره سفارش</span>
                     <p class="item-data">{{ item.orderNo }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">نام مشتری</span>
                    <p class="item-data">{{ item.name }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">تاریخ سفارش</span>
                    <p class="item-data">{{ item.orderDate }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">نام میزبان</span>
                    <p class="item-data">
                      {{ item.sellerName }}
                    </p>
                  </div>
                  <div class="item">
                    <span class="item-head">ایجاد کننده</span>
                    <p class="item-data">{{ item.supportName }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">وضعیت</span>
                    <p class="item-data">
                      <khoonegi-badge
                          :status="item.status"
                          :bgColor="item.status"
                      >{{ item.statusDescription }}</khoonegi-badge
                      >
                    </p>
                  </div>
                  <div class="item">
                    <span class="item-head">جزئیات</span>
                    <p class="item-data">    <button
                        @click="
										$router.push(
											`/detailCancellOrder/${item.processId}/${item.status}`
										)
									"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 19 20"
                          fill="none"
                      >
                        <path
                            d="M10.4744 5.5814C10.0708 5.5814 9.74359 5.89376 9.74359 6.27907C9.74359 6.66439 10.0708 6.97674 10.4744 6.97674H13.3974C13.801 6.97674 14.1282 6.66439 14.1282 6.27907C14.1282 5.89376 13.801 5.5814 13.3974 5.5814H10.4744Z"
                            fill="#FFAC30"
                        />
                        <path
                            d="M5.60256 9.30233C5.19897 9.30233 4.87179 9.61469 4.87179 10C4.87179 10.3853 5.19897 10.6977 5.60256 10.6977H13.3974C13.801 10.6977 14.1282 10.3853 14.1282 10C14.1282 9.61469 13.801 9.30233 13.3974 9.30233H5.60256Z"
                            fill="#FFAC30"
                        />
                        <path
                            d="M10.4744 13.0233C10.0708 13.0233 9.74359 13.3356 9.74359 13.7209C9.74359 14.1062 10.0708 14.4186 10.4744 14.4186H13.3974C13.801 14.4186 14.1282 14.1062 14.1282 13.7209C14.1282 13.3356 13.801 13.0233 13.3974 13.0233H10.4744Z"
                            fill="#FFAC30"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.8491 0.115096C12.7362 -1.3515e-05 11.3335 -7.47302e-06 9.54409 1.23104e-07H9.45591C7.66647 -7.47302e-06 6.26378 -1.3515e-05 5.15093 0.115096C4.01527 0.232564 3.09511 0.476581 2.30946 1.02154C1.83383 1.35145 1.41556 1.75078 1.06999 2.20487C0.499188 2.95494 0.243596 3.83343 0.120556 4.91765C-1.41561e-05 5.9801 -7.82751e-06 7.31927 1.28945e-07 9.02767V10.9405C1.28945e-07 12.0196 1.28857e-07 12.9474 0.0286156 13.7448C0.0911564 15.4876 0.288699 16.7685 1.06999 17.7951C1.41556 18.2492 1.83383 18.6486 2.30946 18.9785C3.38482 19.7244 4.72649 19.913 6.5519 19.9727C7.38713 20 8.35894 20 9.48927 20H9.54411C11.3335 20 12.7362 20 13.8491 19.8849C14.9847 19.7674 15.9049 19.5234 16.6905 18.9785C17.1662 18.6486 17.5844 18.2492 17.93 17.7951C18.5008 17.0451 18.7564 16.1666 18.8794 15.0823C19 14.0199 19 12.6808 19 10.9724V9.02765C19 7.31929 19 5.98009 18.8794 4.91765C18.7564 3.83343 18.5008 2.95494 17.93 2.20487C17.5844 1.75078 17.1662 1.35145 16.6905 1.02154C15.9049 0.476581 14.9847 0.232564 13.8491 0.115096ZM3.16853 2.1504C3.66351 1.80706 4.29705 1.60693 5.30835 1.50233C6.33333 1.39631 7.65693 1.39535 9.5 1.39535C11.3431 1.39535 12.6667 1.39631 13.6916 1.50233C14.7029 1.60693 15.3365 1.80706 15.8315 2.1504C16.183 2.39425 16.4922 2.68941 16.7476 3.02504C17.1072 3.4976 17.3168 4.10245 17.4264 5.06795C17.5375 6.04651 17.5385 7.31017 17.5385 9.06977V10.9302C17.5385 12.6898 17.5375 13.9535 17.4264 14.9321C17.3168 15.8976 17.1072 16.5024 16.7476 16.975C16.4922 17.3106 16.183 17.6058 15.8315 17.8496C15.3365 18.1929 14.7029 18.3931 13.6916 18.4977C12.6667 18.6037 11.3431 18.6047 9.5 18.6047C8.6734 18.6047 7.94903 18.6046 7.30591 18.5946C7.30166 18.1531 7.28727 17.828 7.23872 17.5353C6.85902 15.2466 4.97886 13.4516 2.58156 13.0891C2.27502 13.0428 1.93456 13.029 1.47208 13.025C1.46159 12.411 1.46154 11.7194 1.46154 10.9302V9.06977C1.46154 7.31017 1.46254 6.04651 1.57359 5.06795C1.68316 4.10245 1.89278 3.4976 2.2524 3.02504C2.50782 2.68941 2.81698 2.39425 3.16853 2.1504ZM5.79517 17.7536C5.82681 17.9444 5.83888 18.1652 5.84344 18.5419C4.51798 18.4547 3.75261 18.2547 3.16853 17.8496C2.81698 17.6058 2.50782 17.3106 2.2524 16.975C1.82804 16.4173 1.61862 15.6866 1.52725 14.4212C1.92181 14.4255 2.15315 14.4371 2.35293 14.4673C4.12484 14.7352 5.51453 16.062 5.79517 17.7536Z"
                            fill="#FFAC30"
                        />
                      </svg>
                    </button></p>
                  </div>
              </div>
            </div>
            <div v-else class="text-center">
              در حال حاضر لیست موجود نمی‌باشد
            </div>
          </div>
        </div>
        <page-to-top/>
      </div>
    </div>
  </div>
</template>

<script>

import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import tableLite from "../components/khoonegiTable";
import lodash from "lodash";
import {useToast} from "vue-toastification";
import khoonegiBadge from "@/components/khoonegiBadge.vue";
import khoonegiButton from "@/components/khoonegiButton";

export default {
  name: "InfoChef",
  components: {
    LoadingFull,
    tableLite,
    khoonegiBadge,
    pageToTop,
    khoonegiButton
  },
  data() {
    return {
      fromDate: "",
      toDate: "",
      condition: 0,
      sellerStatus: [],
      processList: [],
      searchQuery: "",
      searchIndex: 0,
      isLoading: false,
      toast: useToast(),
      isSearchLoading: false,
      userState: this.$store.state.typeUser,
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
          width: "1%",
          sortable: false,
        },

        {
          label: "نام مشتری",
          field: "name",
          width: "1%",
          sortable: false,
        },
        {
          label: "تاریخ سفارش",
          field: "orderDate",
          width: "1%",
          sortable: false,
        },
        {
          label: "نام میزبان",
          field: "sellerName",
          width: "1%",
          sortable: false,
        },
        {
          label: "ایجاد کننده",
          field: "supportName",
          width: "1%",
          sortable: false,
        },
        {
          label: "وضعیت",
          field: "status",
          width: "1%",
          sortable: false,
        },
        {
          label: "جزئیات",
          field: "details",
          width: "0.5%",
          sortable: false,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر لیست موجود نمی‌باشد",
      },
      windowWith: window.innerWidth,
    };
  },

  mounted() {
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
    this.isLoading = true;
    this.sellerStatus = this.$store.state.sellerStatus;
    this.getProcessList();
  },
  methods: {

    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    // search realTime for get seller list filter
    setSearch(val) {
      this.isSearchLoading = true;
      let query = this;
      this.searchIndex++;
      let curIndex = this.searchIndex;
      lodash.debounce(function () {
        if (query.searchIndex == curIndex || val.length == 0) {
          query.searchQuery = val.target.value;
          query.getProcessList();
        }
      }, 600)();
    },
    // get seller list function
    getProcessList() {
      const data = {
        FromDate: this.fromDate,
        ToDate: this.toDate,
      };
      this.$store
          .dispatch("processTicketIndex", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.isSearchLoading = false;
              this.processList = respons.data.processTickets;
            } else {
              this.isSearchLoading = false;
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
    condition: function () {
      this.getProcessList();
    },
    fromDate: function () {
      this.getProcessList();
    },
    toDate: function () {
      this.getProcessList();
    },
  },
};
</script>

<style lang="scss">

.card {
  .header-infoChef {
    border-bottom: 0.5px solid #e4e4e4;
    .submit-search {
      left: 1.5rem !important;
    }
    .loading-search {
      left: 18px !important;
    }
    .new-process {
      text-align: left;
      button {
        padding: 0.2rem 2rem;
        width: 11rem;
        @media (max-width: 768px){
          width: 100%;
        }
      }
    }
  }
}

.multiselect {
  grid-area: multiSelect;
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
  margin: 0;
  min-height: unset;
  padding: 6px 10px;
  background-color: #664eca;
  color: #fff;
  border-radius: 7px !important;

  &.is-active {
    box-shadow: unset;
  }

  .multiselect-clear-icon {
    display: none;
    background-color: #fff;
  }

  .multiselect-caret {
    background-color: #fff;
  }

  .multiselect-single-label {
    padding: 0 0.5rem;
    right: 0;
    font-size: 14px;
  }

  // scroll bar
  .multiselect-dropdown::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  .multiselect-dropdown::-webkit-scrollbar-track {
    background: unset;
  }

  /* Handle */
  .multiselect-dropdown::-webkit-scrollbar-thumb {
    background: #bebebe;
    border-radius: 10px;
  }

  /* Handle on hover */
  .multiselect-dropdown::-webkit-scrollbar-thumb:hover {
    background: rgb(131, 131, 131);
  }

  .multiselect-option {
    color: #000;
    font-size: 12px;

    &.is-selected {
      background-color: #664eca;
      color: #fff;
    }
  }

  .multiselect-placeholder {
    color: #fff;
    right: 0;
    padding: 0 0.5rem;
    font-size: 14px;
  }
}

.selected-Condition {
  align-self: end;

  .row-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "title multiSelect datePicker datePicker submitSeller";
    grid-column-gap: 10px;
    @media (max-width: 768px) {
      margin-bottom: 15px;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
					"title multiSelect"
					"datePicker datePicker "
					"submitSeller submitSeller";
    }
  }

  .title {
    grid-area: title;
    font-size: 15px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    @media (max-width: 768px) {
      margin-bottom: 15px;
    }
  }
}

.submit-seller {
  grid-area: submitSeller;
  width: auto;
  background-color: #664eca;
  color: #fff;
  border-radius: 5px;
  padding: 1px 25px;
  width: fit-content;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    line-height: 30px;
  }
}

.datePicker {
  .datePicker {
    grid-area: datePicker;
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  .vpd-input-group {
    .vpd-icon-btn {
      display: none !important;
    }

    input {
      border: 0.75px solid #664eca;
      border-radius: 5px;
      text-align: center;
      color: #664eca;

      &::placeholder {
        color: #664eca;
      }

      &:disabled {
        color: #b9a2a2;
        border-color: #e2e2e2;
        background-color: unset;
        cursor: not-allowed;

        &::placeholder {
          color: #e2e2e2;
        }
      }
    }
  }
}

.search-box {
  position: relative;

  .search-host {
    width: 70%;
    float: left;
    position: relative;
    @media (max-width: 768px) {
      width: 100%;
      input {
        &::placeholder {
          font-size: 9px;
        }
      }
    }
  }

  .submit-search {
    position: absolute;
    left: 1rem !important;
    top: 0.5rem;
  }

  .loading-search {
    position: absolute;
    left: 11px;
    top: 5px;
  }
}

// table
.table-info {
  .no-seller {
    text-align: center;
    width: 100%;
    margin-top: 1rem;
    font-weight: 200;
    font-size: 14px;
  }
}

.table-info-mobile {
  margin-top: 27px;

  .info-item {
    border-bottom: 0.5px solid #e9e9e9;
    margin-bottom: 28px;

    &:last-child {
      border: none;
      margin-bottom: 0;

      .item:last-child {
        margin-bottom: 0;
      }
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin-bottom: 28px;
    align-items: center;

    .item-head {
      font-weight: 600;
      font-size: 12px;
      color: #664eca;
    }

    .item-data {
      font-weight: 500;
      font-size: 12px;
      color: #2b2b2b;
      @media (max-width: 768px) {
        font-weight: 500;
      }

      .badge {
        font-weight: 300 !important;
        font-size: 10px !important;
      }
    }
  }
}

.btn-link {
  color: initial !important;

  &:hover {
    color: #cb0c9f !important;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
<style>
</style>
