<template>
  <div class="py-4 container-fluid support">
    <div class="row">
      <div class="col-12">
        <div class="card support-card py-2 px-4">
          <div class="header-support pb-3">
            <div class="row">
              <div class="col-lg-7" style="display: grid; align-items: center">
                <div class="row-grid">
                  <Multiselect
                      class="selected-name"
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
                  <Multiselect
                      class="selected-name"
                      v-model="statusName"
                      :options="this.$store.state.ticketStatus"
                      placeholder="وضعیت "
                      label="title"
                      track-by="title"
                      :searchable="true"
                  />
                </div>
              </div>
              <div class="col-lg-5 col-12 grid-left">
                <khoonegiButton
                    class="form-button mt-0 slate create-ticket"
                    text="+  پیام جدید"
                    @click="$router.push({path: '/support/addTicket'})"
                />
                <div class="search-box">
                  <vsud-input
                      class="search-host"
                      placeholder="جستجو براساس محتوای پیام"
                      @input="setSearch"
                  />
                  <span class="submit-search" v-if="!isSearchLoading">
										<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
											<path
                          d="M5.56977 3.13606C5.85161 3.09142 6.04389 2.82676 5.99926 2.54492C5.95462 2.26309 5.68996 2.0708 5.40812 2.11544C3.71319 2.38389 2.38387 3.71321 2.11542 5.40814C2.07078 5.68998 2.26307 5.95464 2.5449 5.99928C2.82674 6.04392 3.0914 5.85163 3.13604 5.56979C3.33446 4.31701 4.31699 3.33448 5.56977 3.13606Z"
                          fill="#979797"
                      />
											<path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.7167 0C3.00717 0 0 3.00717 0 6.7167C0 10.4262 3.00717 13.4334 6.7167 13.4334C10.4262 13.4334 13.4334 10.4262 13.4334 6.7167C13.4334 3.00717 10.4262 0 6.7167 0ZM1.03334 6.7167C1.03334 3.57786 3.57786 1.03334 6.7167 1.03334C9.85553 1.03334 12.4001 3.57786 12.4001 6.7167C12.4001 9.85553 9.85553 12.4001 6.7167 12.4001C3.57786 12.4001 1.03334 9.85553 1.03334 6.7167Z"
                          fill="#979797"
                      />
											<path
                          d="M12.5932 11.8626C12.3914 11.6608 12.0643 11.6608 11.8625 11.8626C11.6608 12.0643 11.6608 12.3915 11.8625 12.5932L14.618 15.3488C14.8198 15.5505 15.1469 15.5505 15.3487 15.3488C15.5505 15.147 15.5505 14.8199 15.3487 14.6181L12.5932 11.8626Z"
                          fill="#979797"
                      />
										</svg>
									</span>
                  <SearchLoading class="loading-search" v-else/>
                </div>
              </div>
            </div>
          </div>
          <div class="table-info pt-3" v-if="windowWith > 768">
            <table-lite
                :is-slot-mode="true"
                :columns="columns"
                :rows="ticketList"
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
                        :status="
                        item.value.status === 1
                          ? 6
                          : item.value.status || item.value.status === 2
                          ? 1
                          : item.value.status || item.value.status === 0
                          ? 5
                          : item.value.status
                      "
                        :bgColor="
                        item.value.status === 1
                          ? 6
                          : item.value.status || item.value.status === 2
                          ? 1
                          : item.value.status || item.value.status === 0
                          ? 5
                          : item.value.status
                      "
                    >{{ item.value.statusDescription }}</khoonegi-badge
                    >
                  </span>

                </div>
              </template>
              <template v-slot:details="item">
                <button
                    @click="
										$router.push(
											`/ticketInfo/${item.value.tiketId}/${item.value.title}`
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

          </div>
          <div v-else-if="windowWith <= 768" class="table-info-mobile">
            <div v-if="ticketList.length">
              <div class="info-item" v-for="(item, i) in ticketList" :key="i">
                <div>
                  <div class="item">
                    <span class="item-head">ردیف</span>
                    <p class="item-data">{{ item.row }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">نام میزبان</span>
                    <button class="btn-link">
                      {{ item.sellerName }}
                    </button>
                  </div>
                  <div class="item">
                    <span class="item-head">شماره همراه</span>
                    <button class="btn-link">
                      {{ item.sellerPhoneNumber }}
                    </button>
                  </div>
                  <div class="item">
                    <span class="item-head">ثبت سفارش</span>
                    <p class="item-data">{{ item.createDate }}</p>
                  </div>

                  <div class="item">
                    <span class="item-head">دسته بندی</span>
                    <p class="item-data">{{ item.partName }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">موضوع</span>
                    <p class="item-data">{{ item.title }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">وضعیت</span>
                    <p class="item-data">
                      <khoonegi-badge
                          :status="
													item.status === 1
														? 6
														: item.status || item.status === 2
														? 1
														: item.status || item.status === 0
														? 5
														: item.status
												"
                          :bgColor="
													item.status === 1
														? 6
														: item.status || item.status === 2
														? 1
														: item.status || item.status === 0
														? 5
														: item.status
												"
                      >{{ item.statusDescription }}
                      </khoonegi-badge
                      >
                    </p>
                  </div>
                  <div class="item">
                    <span class="item-head">جزئیات</span>
                    <button
                        @click="
                          $router.push(
                            `/ticketInfo/${item.tiketId}/${item.title}`
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
      </div>
    </div>
  </div>
  <LoadingFull :enable-loading-full="isLoading"/>

</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import VsudInput from "@/components/VsudInput.vue";
import pageToTop from "../components/pageToTop";
import SearchLoading from "../components/searchLoading";
import tableLite from "../components/khoonegiTable";
import lodash from "lodash";
import {useToast} from "vue-toastification";
import khoonegiBadge from "@/components/khoonegiBadge.vue";
import khoonegiButton from "@/components/khoonegiButton.vue";

export default {
  name: "support",
  components: {
    Multiselect,
    VsudInput,
    tableLite,
    SearchLoading,
    khoonegiBadge,
    pageToTop,
    khoonegiButton,
    LoadingFull
  },
  data() {
    return {
      fromDate: "",
      toDate: "",
      condition: -1,
      sellerStatus: [],
      sellerList: [],
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
          label: "نام میزبان",
          field: "sellerName",
          width: ".5%",
          sortable: false,
        },
        {
          label: "شماره همراه",
          field: "sellerPhoneNumber",
          width: ".5%",
          sortable: false,
        },
        {
          label: "ثبت سفارش",
          field: "createDate",
          width: ".6%",
          sortable: false,
        },
        {
          label: "دسته بندی",
          field: "partName",
          width: "0.6%",
          sortable: false,
        },
        {
          label: `موضوع`,
          field: "title",
          width: "2%",
          sortable: false,
        },
        {
          label: "وضعیت",
          field: "status",
          width: "0.5%",
          sortable: false,
        },
        {
          label: "جزئیات",
          field: "details",
          width: "0.1%",
          sortable: false,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر تیکت موجود نمی‌باشد",
      },
      windowWith: window.innerWidth,
      productList: [],
      productName: "",
      ticketList: [],
      sellerName: "",
      statusName: -1,
    };
  },

  mounted() {
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
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
    window.addEventListener("scroll", this.handleScroll);
    this.isLoading = true;
    this.getTicketList();
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
          query.getTicketList();
        }
      }, 600)();
    },
    // get seller list function
    getTicketList() {
      const data = {
        SellerId: this.sellerName,
        FromDate: this.fromDate,
        ToDate: this.toDate,
        Status: this.statusName,
        StringQuery: this.searchQuery,
      };
      this.$store
          .dispatch("ticketList", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.isSearchLoading = false;
              this.ticketList = respons.data.tikets;
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
      this.getTicketList();
    },
    fromDate: function () {
      this.getTicketList();
    },
    toDate: function () {
      this.getTicketList();
    },
    statusName: function () {
      this.getTicketList();
    },
  },
};
</script>

<style lang="scss">
.support {
  .khoonegi-thead {
    font-size: 13px;
  }

  .header-support {
    border-bottom: 0.5px solid #e4e4e4;

    .selected-name {
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

    .row-grid {
      display: grid;
      grid-template-columns: 25% 20% 18% 32%;
      grid-column-gap: 10px;
      @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .grid-left {
      display: grid;
      grid-template-columns: 33% 65%;
      gap: 2%;
      align-items: center;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-row-gap: 10px;
      }
    }

    .create-ticket {
      font-size: 80%;
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
      width: 100% !important;
      position: relative;
      float: left;
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
      left: 1.3rem;
      top: 0.3rem;
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
}
</style>
