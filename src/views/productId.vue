<template>
  <div
      class="nav-wrapper productId position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <ul class="nav" id="myTab" role="tablist">
      <li
          class="nav-item px-0"
          role="presentation"
          v-for="(tab, i) in tabLinks"
          :key="i"
      >
        <button
            class="nav-link"
            :class="tab.active"
            :id="tab.id"
            data-bs-toggle="tab"
            :data-bs-target="tab.target"
            type="button"
            role="tab"
            :aria-controls="tab.controls"
            aria-selected="true"
        >
          <khoonegi-badge
              v-if="tab.isNew || tab.isNew > 0"
              :status="tab.isNew"
              :bgColor="tab.isNew"
          >
          </khoonegi-badge>
          {{ tab.name }}
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="seller-name">
        <span>نام میزبان: </span>
        {{ sellerName }}
      </div>
      <!-- info product -->
      <div
          class="tab-pane fade show active"
          id="info"
          role="tabpanel"
          aria-labelledby="info-tab"
      >
        <div class="container-xl">
          <div class="info-item">
            <div class="first-col">
              <div class="item">
                <label class="mb-2">نام محصول:</label>
                <input
                    class="global-input"
                    type="text"
                    v-model="productName"

                />
              </div>
              <div class="item">
                <label class="mb-2">قیمت (ریال):</label>
                <input
                    style="text-align: left; padding-left: 1rem"
                    class="global-input"
                    type="text"
                    v-model="productPrice"
                    disabled
                />
              </div>
              <div class="item">
                <label class="mb-2">دسته بندی:</label>
                <Multiselect
                    v-model="categoryName"
                    :options="categoryList"
                    placeholder="نام دسته بندی "
                    label="title"
                    track-by="value"
                />
<!--                @Select="getId(categoryName)"-->

              </div>
            </div>

            <div class="item">
              <label class="mb-2">توضیحات:</label>
              <textarea
                  class="global-input textarea-global"
                  v-model="productDescription"
              />
            </div>
            <div class="item" v-if="productImages.length">
              <label class="mb-2" :class="NewProductImages ? 'NewChanged' : ''">
                تصاویر محصول:
              </label>
              <div class="otherImage">

                <div  v-for="(media, i) in productImages"
                      :key="i">
                   <span class="default-flag" v-if="media.isDefault">
                       پیشفرض
                </span>
                  <img
                      :src="media.fileName"
                      :class="NewProductImages ? 'NewChanged' : ''"

                      alt="nationalImage"
                  />
                </div>

              </div>
            </div>
          </div>
          <div class="confirmation-info">

            <khoonegiButton
                class="form-button mt-5 slate-not"
                text="ویرایش اطلاعات"
                @click.prevent="editInfo"
            />
            <khoonegiButton
                style="margin-left: 18px;margin-right: 18px;"
                class="form-button mt-5 failed"
                text="رد اطلاعات"
                :disabled="!isNewProductMedia && !isNewProduct ? true : false"
                @click.prevent="submitInfo(2)"
            />

            <khoonegiButton
                class="form-button mt-5"
                text="تایید اطلاعات"
                :disabled="!isNewProductMedia && !isNewProduct ? true : false"
                @click.prevent="submitInfo(1)"
            />
          </div>
        </div>
      </div>
      <!-- menu product -->
      <div
          class="tab-pane fade"
          id="menu"
          role="tabpanel"
          aria-labelledby="menu-tab"
      >
        <div class="menu-list">
          <div class="select-date">
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
            <div v-if="menuList">
              <div class="info-item" v-for="(item, i) in menuList" :key="i">
                <div class="item">
                  <span class="item-head">ردیف</span>
                  <p class="item-data">{{ item.row }}</p>
                </div>
                <div class="item">
                  <span class="item-head">تاریخ فروش </span>
                  <p class="item-data">{{ item.date }}</p>
                </div>
                <div class="item">
                  <span class="item-head">بازه زمانی</span>
                  <p class="item-data">{{ item.time }}</p>
                </div>
                <div class="item">
                  <span class="item-head">تعداد کل</span>
                  <p class="item-data">{{ item.count }}</p>
                </div>
                <div class="item">
                  <span class="item-head">فروش رفته</span>
                  <p class="item-data">
                    {{ item.sellCount }}
                  </p>
                </div>
                <div class="item">
                  <span class="item-head">رزرو شده</span>
                  <p class="item-data">
                    {{ item.reservedCount }}
                  </p>
                </div>
                <div class="item">
                  <span class="item-head">باقیمانده</span>
                  <p class="item-data">
                    {{ item.remain }}
                  </p>
                </div>
                <div class="item">
                  <span class="item-head">توضیحات</span>
                  <p class="item-data">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              در حال حاضر محصول موجود نمی‌باشد
            </div>
          </div>
        </div>
      </div>
      <!-- price history product -->
      <div
          class="tab-pane fade"
          id="history"
          role="tabpanel"
          aria-labelledby="history-tab"
      >
        <div class="history-list">
          <table-lite
              class="mt-4"
              v-if="windowWith > 768"
              :is-slot-mode="true"
              :columns="columnsHistory"
              :rows="historyList"
              :total="totalRecordCount"
              :sortable="false"
              @do-search="doSearch"
              @is-finished="isLoading = false"
              :is-hide-paging="true"
              :messages="messageHistory"
          >
          </table-lite>
          <div v-else-if="windowWith <= 768" class="table-info-mobile">
            <div v-if="historyList">
              <div class="info-item" v-for="(item, i) in historyList" :key="i">
                <div class="item">
                  <span class="item-head">ردیف</span>
                  <p class="item-data">{{ item.row }}</p>
                </div>
                <div class="item">
                  <span class="item-head">تاریخ بروزرسانی </span>
                  <p class="item-data">{{ item.date }}</p>
                </div>
                <div class="item">
                  <span class="item-head">ساعت بروزرسانی</span>
                  <p class="item-data">{{ item.time }}</p>
                </div>
                <div class="item">
                  <span class="item-head">قیمت (ریال)</span>
                  <p class="item-data">{{ item.newPrice }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              در حال حاضر محصول موجود نمی‌باشد
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <Loading-->
<!--        :class="isLoading ? 'full-page-load' : ''"-->
<!--        :enable-loading="isLoading"-->
<!--    />-->
    <page-to-top/>
    <LoadingFull :enable-loading-full="isLoading"/>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import {useToast} from "vue-toastification";
import khoonegiBadge from "@/components/khoonegiBadge.vue";
import khoonegiButton from "@/components/khoonegiButton.vue";
import tableLite from "../components/khoonegiTable";

export default {
  components: {
    LoadingFull,
    pageToTop,
    khoonegiBadge,
    khoonegiButton,
    tableLite,
    Multiselect
  },
  data() {
    return {
      totalRecordCount: 0,
      isLoading: false,
      toast: useToast(),
      tabLinks: [
        {
          id: "info-tab",
          name: "اطلاعات",
          target: "#info",
          controls: "info",
          isNew: false,
          active: "active",
        },
        {
          id: "menu-tab",
          name: "منو",
          target: "#menu",
          controls: "menu",
          isNewProfile: false,
        },
        {
          id: "history-tab",
          name: "تاریخچه قیمت",
          target: "#history",
          controls: "history",
          isNew: false,
        },
        // {
        // 	id: "menu-tab",
        // 	name: "بازخورد",
        // 	target: "#menu",
        // 	controls: "menu",
        // 	isNew: false,
        // },
      ],
      message: {
        noDataAvailable: "در حال حاضر منو موجود نمی‌باشد",
      },
      windowWith: window.innerWidth,
      sellerName: "",
      // info product {
      productName: "",
      productPrice: "",
      productDescription: "",
      productImages: [],
      NewProductImages: false,
      isNewProduct: false,
      isNewProductMedia: false,
      // }
      // menu list {
      selectedDate: "",
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".2%",
          sortable: false,
        },
        {
          label: "تاریخ فروش",
          field: "date",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "بازه زمانی",
          field: "time",
          width: ".6%",
          sortable: false,
        },
        {
          label: "تعداد کل",
          field: "count",
          width: ".5%",
          sortable: false,
        },
        {
          label: "فروش رفته",
          field: "sellCount",
          width: "2%",
          sortable: false,
        },
        {
          label: "رزرو شده",
          field: "reservedCount",
          width: "2%",
          sortable: false,
        },
        {
          label: "باقیمانده",
          field: "remain",
          width: "1%",
          sortable: false,
        },
        {
          label: "توضیحات",
          field: "description",
          width: "1%",
          sortable: false,
        },
      ],
      // }
      // history list {
      columnsHistory: [
        {
          label: " ردیف",
          field: "row",
          width: ".3%",
          sortable: false,
        },
        {
          label: "تاریخ بروزرسانی",
          field: "date",
          width: ".3%",
          sortable: false,
        },

        {
          label: "ساعت بروزرسانی",
          field: "time",
          width: ".3%",
          sortable: false,
        },
        {
          label: "قیمت (ریال)",
          field: "newPrice",
          width: ".3%",
          sortable: false,
        },
      ],
      historyList: [],
      messageHistory: {
        noDataAvailable: "در حال حاضر تاریخچه قیمت موجود نمی‌باشد",
      },
      fromDate: "",
      toDate: "", // }
      categoryName: "",
      categoryList: [],
      categoryId: ""
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
    this.isLoading = true;
    try {
      this.$store.dispatch("getCategoryList").then((respons) => {
        console.log(respons)
        this.categoryList = respons.data.category;
        this.categoryList.forEach((item) => {
          console.log(item)
          item.title = item.name;
          item.value = item.categoryId;
        });
      });
      this.getInfoProduct();
      this.getMenuProduct();
      this.getProductHistory();
    } catch (error) {
      this.$store.dispatch("handleError", error);
      this.toast.error("خطا در اتصال!", {
        position: "bottom-center",
        timeout: 3000,
        icon: true,
        rtl: true,
      });
    }
  },
  methods: {
    // edit info product
    editInfo(){
      this.isLoading = true;
      const data = {
        ProductId: this.$route.params.id,
        Name: this.productName,
        Description: this.productDescription,
        CategoryId: this.categoryName,
      };
      this.$store
          .dispatch("editProduct", data)
          .then((respons) => {
            console.log(respons);
            if (respons.data.succeed) {
              this.isLoading = false;
              // location.reload();
              this.toast.success(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            } else {
              this.isLoading = false;
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
            console.log(error);
          });
    },
    submitInfo(value) {
      this.isLoading = true;
      const data = {
        ProductId: this.$route.params.id,
        AcceptStatus: value,
      };
      this.$store
          .dispatch("confirmProductProfileInfo", data)
          .then((respons) => {
            console.log(respons);
            if (respons.data.succeed) {
              this.isLoading = false;
              location.reload();
              this.toast.success(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
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
            console.log(error);
          });
    },
    //edit product category
    editCategoryProduct(categoryId) {
      const data = {
        ProductId: this.$route.params.id,
        CategoryId: categoryId,
      };
      this.$store
          .dispatch("editProductCategory", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              this.getInfoProduct()
              this.toast.success(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
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
            this.$store.dispatch("handleError", error);
            this.isLoading = false;
            console.log(error);
          });
    },
    // get product info function
    getInfoProduct() {
      const data = {
        ProductId: this.$route.params.id,
      };
      this.$store
          .dispatch("getProductProfile", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              const info = respons.data;
              console.log(info);
              info.profile.medias.forEach((item) => {
                this.isNewProductMedia = item.isNew;
              });
              this.sellerName = info.profile.sellerName;
              this.productName = info.profile.name;
              this.productPrice = (info.profile.price * 10)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.productDescription = info.profile.description;
              this.productImages = info.profile.medias;
              // this.categoryName = info.profile.categoryName;
              this.categoryName = info.profile.categoryId;
              this.isNewProduct = info.profile.IsNew;
              this.tabLinks.forEach((item) => {
                if (item.id == "info-tab") {
                  this.productImages.forEach((i) => {
                    item.isNew = i.isNew;
                    this.NewProductImages = i.isNew;
                  });
                }
              });
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
            console.log(error);
          });
    },
    // get menu info function
    getMenuProduct() {
      const data = {
        FromDate: this.fromDate,
        ToDate: this.toDate,
        ProductId: this.$route.params.id,
      };
      this.$store
          .dispatch("getProductMenu", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.menuList = respons.data.menu;
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
            this.$store.dispatch("handleError", error);
            this.isLoading = false;
            console.log(error);
          });
    },
    // get history price function
    getProductHistory() {
      const data = {
        ProductId: this.$route.params.id,
      };
      this.$store
          .dispatch("getProductHistoryPrice", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
              this.historyList = respons.data;
              this.historyList.forEach((item) => {
                item.newPrice = (item.newPrice * 10)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              });

          })
          .catch((error) => {
            this.$store.dispatch("handleError", error);
            this.isLoading = false;
            console.log(error);
          });
    },
    //get id category
    getId(categoryId){
      this.editCategoryProduct(categoryId)
    }
  },
  watch: {
    fromDate: function () {
      this.getMenuProduct();
    },
    toDate: function () {
      this.getMenuProduct();
    },
    // categoryName: function () {
    //   this.editCategoryProduct()
    // }
  },
};
</script>
<style lang="scss">
label {
  font-weight: 600 !important;
}

.productId {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
  border-radius: 20px;
  margin: 16px auto;

  .container-xl {
    max-width: 1000px !important;
    @media (max-width: 768px) {
      padding: 0;
    }
  }

  .bage-tab {
    background: #ffa460;
    border-radius: 3px;
    color: #fff;
    font-size: 11px;
    padding: 2px;
  }

  .nav {
    border-bottom: 0.5px solid #bfbfbf;
    padding: 0;

    .nav-item {
      margin-left: 5rem;
    }

    @media (max-width: 768px) {
      flex-wrap: nowrap;
      overflow-x: scroll;
    }
  }

  .nav::-webkit-scrollbar {
    display: none;
  }

  .nav-link {
    color: #b9b9b9 !important;
    margin: 0;
    padding: 0.5rem 0 !important;
    align-items: center;
    gap: 5px;

    &:hover {
      color: #664eca !important;
    }

    display: flex;
    white-space: nowrap;
  }

  .nav-link.active {
    font-weight: bold;
    border-radius: 0 !important;
    color: #664eca !important;
    border-bottom: 1px solid #a192de;
    padding: 0.5rem 0;
  }

  .tab-content {
    padding: 30px 0;
    @media (max-width: 768px) {
      padding: 30px 0;
    }
    position: relative;

    .seller-name {
      color: #2f2a43;
      font-size: 15px;
      position: absolute;
      left: 0;
      top: -35px;
      font-weight: 600;

      span {
        color: #979797;
        font-size: 14px;
        font-weight: 500;
      }

      @media (max-width: 768px) {
        top: 10px;
        right: 0;
      }
    }

    .history-list {
      padding: 0 25%;
      @media (max-width: 768px) {
        padding: 0;
      }
    }
  }

  .info-item {
    .textarea-global {
      height: 180px;
    }

    .first-col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 5%;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        column-gap: 1rem;
        margin-top: 2rem;
      }

      .multiselect {
        grid-area: unset;
        background-color: #fff;
        color: #664eca;
        border-color: #664eca;
        height: 40px;

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

    .item {
      margin-bottom: 3rem;
      @media (max-width: 768px) {
        margin-bottom: 1rem;
      }
    }

    .nationalImage {
      padding: 30px 22px;
      background: #ffffff;
      border: 1px solid rgba(159, 159, 181, 0.5);
      border-radius: 7px;

      img {
        height: 300px;
        max-width: 100%;
        max-height: 15rem;
        border-radius: 10px;
      }
    }

    img {
      // height: 300px;
      max-width: 100%;
      max-height: 15rem;
      height: 100%;
      border-radius: 10px;
      border: 1px solid rgba(159, 159, 181, 0.5);
      object-fit: contain;
      @media (max-width: 768px) {
        width: 100% !important;
        max-width: 100%;
      }
    }

    .biography {
      max-height: 15rem;
    }

    .otherImage {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 32.3%);
      gap: 15px;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      img {
        // border: 1px solid transparent;
        height: 180px;
        width: 100% !important;
      }
      div {
        position: relative;
      }
      .default-flag {
        background: #664eca;
        padding: 5px;
        font-size: 11px;
        position: absolute;
        top: 10px;
        border-radius: 5px;
        color: #fff;
        right: 10px;
      }
    }

    .coverImage {
      height: 240px;

      img {
        // width: 71% !important;
        object-fit: fill;

        @media (max-width: 768px) {
          width: 100% !important;
          max-width: 100%;
          object-fit: contain;
        }
      }
    }
  }

  .confirmation-info {
    text-align: left;
    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    button {
      @media (max-width: 768px) {
        padding: 0.5rem 1rem;
      }
      width: auto;
    }
  }

  .selected-status {
    width: 14rem;
    @media (max-width: 768px) {
      position: unset;
      width: 100%;
    }
  }

  .menu-list {
    .select-date {
      display: flex;
      gap: 18px;
      @media (max-width: 768px) {
        margin-top: 1.5rem;
      }

      .datePicker {
        @media (max-width: 768px) {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
