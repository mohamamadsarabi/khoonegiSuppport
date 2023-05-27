<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card infoChef-card py-2 px-4">
          <div class="header-infoChef pb-3">
            <div class="row">
              <div class="col-lg-6 selected-Condition">
                <div class="row-grid">
                  <div class="selected">
                    <Multiselect
                        class="seller-name"
                        v-model="categoryId"
                        :options="categoryList"
                        placeholder="دسته بندی"
                        label="title"
                        track-by="value"
                        :searchable="true"
                    />
                  </div>
                  <Multiselect
                      class="seller-name"
                      v-model="sellerName"
                      :options="sellerList"
                      placeholder="نام میزبان "
                      label="title"
                      track-by="title"
                      :searchable="true"
                  />
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
              <div class="col-lg-6 col-12 search-box">

              </div>
            </div>
          </div>
          <div class="table-info pt-3" v-if="windowWith > 768">
            <table class="menu-table">
              <thead>
              <tr>
                <th>ردیف</th>
                <th>تاریخ</th>
                <th>روز</th>
                <th>میزبان</th>
                <th>تعداد منو باز شده</th>
                <th>درصد منو</th>
                <th>تعداد فروش رفته</th>
                <th>درصد فروش رفته</th>
                <th>مانده خالص</th>
                <th>درصد مانده خالص</th>
                <th>مجموع قیمت فروش</th>
                <th>تعداد فیدبک مثبت</th>
                <th>تعداد فیدبک منفی</th>
                <th>میانگین درصد رضایت مشتریان</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="seller in sellerListReport" :key="seller" class="custom-table" :style="!seller.sellerId ? 'background-color: #dedede' : 'background-color:#fff'">
                <td> {{ seller.row }}</td>
                <td> {{ seller.sellerId ? seller.dateTime : 'مجموع' }}</td>
                <td> {{ seller.sellerId ? seller.dayTime : '' }}</td>
                <td> {{ seller.sellerName ? seller.sellerName : '' }}</td>
                <td> {{ seller.count }}</td>
                <td> {{ seller.percentageOfOpendMenu + '%' }}</td>
                <td> {{ seller.sellCount }}</td>
                <td> {{ seller.percentageSold + '%' }}</td>
                <td> {{ seller.remainingCount }}</td>
                <td> {{ seller.remainingPercentage + '%' }}</td>
                <td> {{ seller.totalPrice }}</td>
                <td> {{ seller.like }}</td>
                <td> {{ seller.disLike }}</td>
                <td> {{ seller.likesAverage + '%' }}</td>
              </tr>
              <tr class="custom-table" v-if="totalItems">
                <td colspan="3">مجموع کل</td>
                <td> {{ totalItems.totalSellerName}}</td>
                <td> {{ totalItems.totalCount }}</td>
                <td> {{ totalItems.totalPercentageOfOpendMenu + '%' }}</td>
                <td> {{ totalItems.totalSellCount }}</td>
                <td> {{ totalItems.totalPercentageSold + '%' }}</td>
                <td> {{ totalItems.totalRemainingCount }}</td>
                <td> {{ totalItems.totalRemainingPercentage + '%' }}</td>
                <td> {{ totalItems.totalPrice }}</td>
                <td> {{ totalItems.totalLike }}</td>
                <td> {{ totalItems.totalDisLike }}</td>
                <td> {{ totalItems.totalLikesAverage + '%' }}</td>
              </tr>
              </tbody>
            </table>
            <LoadingFull :enable-loading-full="isLoading"/>
          </div>
          <div v-else-if="windowWith <= 768" class="table-info-mobile">
            <div class="text-center">
              این بخش فقط در سایز دسکتاپ قابل مشاهده است
            </div>
          </div>
        </div>
        <page-to-top/>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import lodash from "lodash";
import {useToast} from "vue-toastification";

export default {
  name: "statisticsSeller",
  components: {
    Multiselect,
    LoadingFull,
    pageToTop,
  },
  data() {
    return {
      fromDate: "",
      toDate: "",
      condition: 0,
      sellerStatus: [],
      sellerListReport: [],
      searchQuery: "",
      searchIndex: 0,
      isLoading: false,
      toast: useToast(),
      isSearchLoading: false,
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "تاریخ",
          field: "link",
          width: ".1%",
          sortable: false,
        },
        {
          label: "روز",
          field: "name",
          width: ".1%",
          sortable: false,
        },

        {
          label: "میزبان",
          field: "brand",
          width: ".1%",
          sortable: false,
        },
        {
          label: "تعداد منو بازشده",
          field: "phonNumber",
          width: ".1%",
          sortable: false,
        },
        {
          label: "درصد منو",
          field: "nationalCode",
          width: ".1%",
          sortable: false,
        },
        {
          label: "تعداد فروش رفته",
          field: "accountNumber",
          width: ".1%",
          sortable: false,
        },
        {
          label: "درصد فروش رفته",
          field: "address",
          width: ".1%",
          sortable: false,
        },
        {
          label: "مانده خالص",
          field: "createDate",
          width: ".1%",
          sortable: false,
        },
        {
          label: "درصد مانده",
          field: "status",
          width: "0.1%",
          sortable: false,
        },
        {
          label: "مجموع قیمت فروش",
          field: "status",
          width: "0.1%",
          sortable: false,
        },
        {
          label: "تعداد فیدبک مثبت",
          field: "status",
          width: "0.1%",
          sortable: false,
        },
        {
          label: "تعداد فیدبک منفی",
          field: "status",
          width: "0.1%",
          sortable: false,
        },
        {
          label: "میانگین درصد رضایت مشتریان",
          field: "status",
          width: "0.1%",
          sortable: false,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر میزبان موجود نمی‌باشد",
      },
      windowWith: window.innerWidth,
      sellerName: "",
      sellerList: [],
      categoryList: [],
      categoryId: 0,
      totalItems: {}
    };
  },

  mounted() {
    const accessToken = localStorage.getItem("token");
    if (!accessToken && this.$route.name !== "Login") {
      return this.$route.name = "Login";
    }
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
    window.addEventListener("scroll", this.handleScroll);
    this.isLoading = true;
    this.sellerStatus = this.$store.state.sellerStatus;
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
    // get category list
    this.$store
        .dispatch("getCategoriesList")
        .then((respons) => {
          console.log(respons)
          this.categoryList = respons.data;
          this.categoryList.forEach((item) => {
            item.title = item.name;
            item.value = item.categoryId;
          });
        })
        .catch((error) => {
          this.$store.dispatch("handleError", error);
          this.isLoading = false;
          console.log(error);
        });
    this.getSellerList();
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
          query.getSellerList();
        }
      }, 600)();
    },
    // get seller list function
    getSellerList() {
      const data = {
        FromDate: this.fromDate,
        ToDate: this.toDate,
        SellerId: this.sellerName,
        CategoryId: this.categoryId,
        QueryString: this.searchQuery,
      };
      this.$store
          .dispatch("getSellerMenuReport", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.isSearchLoading = false;
              this.totalItems = respons.data.aggregateSellProductsReport;
              this.totalItems.totalPrice = (this.totalItems.totalPrice* 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.totalItems.totalPercentageOfOpendMenu = this.totalItems.totalPercentageOfOpendMenu.toFixed(2);
              this.totalItems.totalPercentageSold = this.totalItems.totalPercentageSold.toFixed(2);
              this.totalItems.totalRemainingPercentage = this.totalItems.totalRemainingPercentage.toFixed(2);
              this.sellerListReport = respons.data.sellProductsReport;
              this.sellerListReport.map((item)=>{
                item.totalPrice = (item.totalPrice * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              })
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
    sellerName: function () {
      this.getSellerList();
    },
    categoryId: function () {
      this.getSellerList();
    },
    fromDate: function () {
      this.getSellerList();
    },
    toDate: function () {
      this.getSellerList();
    },
  },
};
</script>

<style lang="scss">
.menu-table {
  width: 100%;

  th {
    color: #664eca;
    background-color: unset;
    border: 1px solid #e4e4e4 !important;
    padding: 10px;
    text-align: center;
  }

  thead {
    background-color: white;
    position: sticky;
    top: 0;
  }

  .custom-table {
    td {
      padding: 15px 5px;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      background-color: unset;
      border: 1px solid #e4e4e4 !important;
    }
  }
}

.card {
  .header-infoChef {
    border-bottom: 0.5px solid #e4e4e4;

    .submit-search {
      left: 1.5rem !important;
    }

    .loading-search {
      left: 18px !important;
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
    grid-template-columns: 28% 1fr 1fr 1fr;
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
    .seller-name {
      grid-area: unset;
      background-color: #fff;
      color: #664eca;
      border-color: #664eca;
      height: fit-content;

      .multiselect-caret {
        background-color: #664eca !important;
      }

      .multiselect-placeholder {
        color: #664eca;
      }

      @media (max-width: 768px) {
        width: 100%;
        margin: 0;
      }
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
