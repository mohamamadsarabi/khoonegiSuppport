<template>
  <div
      class="nav-wrapper newTransaction position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="content">
      <h6>تراکنش جدید</h6>
      <hr>
      <div class="newTransaction-items">
        <div class="item">
          <span class="title">نوع:</span>
          <Multiselect
              class="search-type seller-name"
              v-model="transactionType"
              :options="this.$store.state.transactionTypeCustomer"
              placeholder="انتخاب کنید "
              label="title"
              track-by="value"
          />
        </div>
        <div v-if="transactionType >= 0">
          <div class="item" v-if="transactionType == 0 || transactionType == 2">
            <span class="title">نام مشتری:</span>
            <div class="search-customer">
              <div class="search-box">
                <vsud-input
                    :value="dataInput"
                    class="search-host"
                    @input="setSearch"
                />
                <Transition>
                  <div v-if="searchQuery.length >= 1" class="search-result">
                    <ul v-if="customerList.length">
                      <li v-for="(item, i) in customerList" :key="i">
                        <button @click.prevent="getId(item)">
                          {{ item.name }}
                        </button>
                      </li>
                    </ul>
                    <span v-else>مشتری یافت نشد</span>
                  </div>
                </Transition>
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
          <div class="item" v-if="transactionType == 0 || transactionType == 2">
            <span class="title">اعتبار کنونی:</span>
            <input disabled type="text" v-model="creditCustomer" class="global-input"
                   style="text-align: left;padding-left: 30px;pointer-events: none;user-select: none;">
            <label>ریال</label>
          </div>
          <div
              :class="transactionType == 0 ||transactionType == 1  ? 'decreased item' : transactionType == 2 ||transactionType == 3 ? 'increase item' : 'item'">
                  <span class="title">
                  {{ transactionType == 0 || transactionType == 1 ? 'مبلغ کاهش(هرنفر) :' : 'مبلغ افزایش(هرنفر) :' }}
                  </span>
            <input type="text" @keyup="check" class="global-input" style="text-align: left;padding-left: 30px;"
                   v-model="reducePrice">
            <label>ریال</label>
          </div>
          <div class="item" v-if="transactionType == 0 || transactionType == 2" @click="calculatePrice()">
            <span class="title">
              {{ transactionType == 0 ? 'اعتبار پس از کاهش:' : 'اعتبار پس از افزایش:' }}
            </span>
            <input readonly @focus="calculatePrice()" type="text" style="text-align: left;padding-left: 30px;pointer-events: none;user-select: none;"
                   :disabled="reducePrice ? false : true" v-model="creditFinall" class="global-input">
            <label>ریال</label>
          </div>
          <div class="item" v-if="transactionType == 3 || transactionType == 1">
            <span class="title">انتخاب گروه:</span>
            <Multiselect
                class="search-type seller-name"
                v-model="groupName"
                :options="transactionGroup"
                placeholder="انتخاب کنید "
                label="title"
                track-by="members"
                @select="getMembersSelect(groupName)"
            />
<!--            @select="getMembersSelect"-->
          </div>
          <div class="item" v-if="transactionType !== -1">
            <span class="title">
              {{transactionType == 2 || transactionType == 3 ? "انتقال از :" : transactionType == 0 || transactionType == 1 ? "انتقال به :" : ""}}
              </span>
            <div class="search-customer">
              <div class="search-box">
                <vsud-input
                    :value="dataInputBank"
                    class="search-host"
                    @input="setSearchBank"
                />
                <Transition>
                  <div v-if="searchQueryBank.length >= 1" class="search-result">
                    <ul v-if="customerListBank.length">
                      <li v-for="(item, i) in customerListBank" :key="i">
                        <button @click.prevent="getIdBank(item)">
                          {{ item.name }}
                        </button>
                      </li>
                    </ul>
                    <span v-else>مشتری یافت نشد</span>
                  </div>
                </Transition>
                <span class="submit-search" v-if="!isSearchLoadingBank"><svg
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
                          </svg></span>
                <SearchLoading class="loading-search" v-else/>
              </div>
            </div>
          </div>
          <textarea class="global-input" v-model="descriptionCredit" maxlength="150" placeholder="توضیحات:"></textarea>
          <khoonegiButton
              class="form-button slate"
              :text="transactionType == 0 || transactionType == 1 ? 'کاهش اعتبار' : transactionType == 2 || transactionType == 3 ? 'افزایش اعتبار' : 'افزایش اعتبار'"
              :loading="isLoading"
              :disabled="disableHandleCredit()"
              @click="handleCredit()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import VsudInput from "@/components/VsudInput";
import SearchLoading from "@/components/searchLoading";
import lodash from "lodash";
import {useToast} from "vue-toastification";
import khoonegiButton from "@/components/khoonegiButton";

export default {
  name: "newTransaction",
  components: {
    Multiselect,
    VsudInput,
    SearchLoading,
    khoonegiButton
  },

  data() {
    return {
      transactionType: -1,
      bankType: Number,
      groupName: Number,
      searchQuery: "",
      searchIndex: 0,
      toast: useToast(),
      isSearchLoading: false,
      customerList: [],
      customerId: [],
      dataInput: "",
      creditCustomer: "",
      creditFinall: "",
      reducePrice: "",
      descriptionCredit: "",
      transactionGroup: [],
      bankAccount: [],
      dataInputBank: "",
      searchQueryBank: "",
      searchIndexBank: 0,
      customerListBank: [],
      isSearchLoadingBank: false,
      customerIdBank: [],
      isLoading: false,
      groupId: "",
      membersId: []
    }
  },
  mounted() {
    this.getGroupList()
  },
  methods: {
    disableHandleCredit(){
      if(this.transactionType == 0 || this.transactionType == 2){
       if(this.customerId && this.creditCustomer && this.reducePrice && this.creditFinall && this.customerIdBank.length){
         return false;
       } else  {
         return true;
       }
      }
      if(this.transactionType == 1 || this.transactionType == 3){
        if(this.groupId && this.reducePrice && this.customerIdBank.length){
          return false;
        } else  {
          return true;
        }
      }
    },
    getMembersSelect(value){
      value.members.forEach((item)=>{
        this.membersId.push(item.customerId);
      })
      console.log(value)
      this.groupId = value.groupId;
    },
    getGroupList() {
      this.$store
          .dispatch("groupIndex")
          .then((respons) => {
            console.log(respons);
            this.transactionGroup = respons.data.groups;
            this.transactionGroup.forEach((item) => {
              console.log(item)
              item.title = item.groupName;
              item.value = item;
              // this.groupId = item.groupId;
            })
          })
          .catch((error) => {
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
    // check: function () {
    //   this.reducePrice = this.reducePrice.toString().replace(/(\d\d\d)(?=(\d\d\d)+)/g, "$1,");
    //   console.log(this.reducePrice)
    // },
    calculatePrice() {
      this.reducePrice = this.reducePrice.replace(/,/g, "");
      this.creditCustomer = this.creditCustomer.replace(/,/g, "");
      if (this.creditCustomer && this.reducePrice && this.transactionType == 0) {
        this.creditFinall = parseInt(this.creditCustomer) - parseInt(this.reducePrice);
      } else if (this.creditCustomer && this.reducePrice && this.transactionType == 2) {
        this.creditFinall = parseInt(this.creditCustomer) + parseInt(this.reducePrice);
      }
      this.creditFinall = this.creditFinall.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.reducePrice = this.reducePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.creditCustomer = this.creditCustomer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getId(item) {
      console.log(item)
      this.dataInput = " ";
      this.customerId = item.id;
      this.dataInput = item.name;
      this.searchQuery = "";
      this.creditCustomer = (item.value * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      console.log(this.dataInput)
      },
    getIdBank(item) {
      this.customerIdBank = item.id;
      this.dataInputBank = item.name;
      this.searchQueryBank = "";
    },
    setSearchBank(val) {
      if (val.target.value == "") {
        this.customerIdBank = [];
      }
      console.log(val.target.value)
      this.isSearchLoadingBank = true;
      let query = this;
      this.searchIndexBank++;
      let curIndex = this.searchIndexBank;
      lodash.debounce(function () {
        if (query.searchIndexBank == curIndex || val.length == 0) {
          query.searchQueryBank = val.target.value;
          query.getCustomerListBank();
        }
      }, 600)();
    },
    setSearch(val) {
      if(val.target.value == ""){
        this.customerId = [];
        this.creditCustomer = "";
      }
      this.isSearchLoading = true;
      let query = this;
      this.searchIndex++;
      let curIndex = this.searchIndex;
      lodash.debounce(function () {
        if (query.searchIndex == curIndex || val.length == 0) {
          query.searchQuery = val.target.value;
          query.getCustomerList();
        }
      }, 600)();
    },
    getCustomerListBank() {
      const data = {
        StringQuery: this.searchQueryBank
      };
      this.$store
          .dispatch("findCustomer", data)
          .then((respons) => {
            this.isSearchLoading = false;
            this.isSearchLoadingBank = false;
            this.customerListBank = respons.data.customers;
            console.log(respons)
          })
          .catch((error) => {
            this.isSearchLoading = false;
            this.isSearchLoadingBank = false;
            this.$store.dispatch("handleError", error);
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          })
    },
    getCustomerList() {
      const data = {
        StringQuery: this.searchQuery
      };
      this.$store
          .dispatch("findCustomer", data)
          .then((respons) => {
            this.isSearchLoading = false;
            this.isSearchLoadingBank = false;
            this.customerList = respons.data.customers;
            // if (this.searchQueryBank) {
            //   this.customerListBank = respons.data.customers;
            // }
            console.log(respons)
          })
          .catch((error) => {
            this.isSearchLoading = false;
            this.isSearchLoadingBank = false;
            this.$store.dispatch("handleError", error);
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          })
    },
    handleCredit() {
      if (this.customerId !== this.customerIdBank) {
        this.isLoading = true;
        const data = {
          groupId: this.transactionType == 3 || this.transactionType == 1 ? this.groupId : "",
          Type: this.transactionType,
          AmountSentPerPerson: this.reducePrice.replace(/,/g, "") / 10,
          Description: this.descriptionCredit,
          OriginUsers: this.transactionType == 0 ? [this.customerId] : this.transactionType == 2 || this.transactionType == 3 ? [this.customerIdBank] : this.transactionType == 1 ? this.membersId : "",
          TargetUsers: this.transactionType == 2 ? [this.customerId] : this.transactionType == 0 || this.transactionType == 1 ? [this.customerIdBank] : this.transactionType == 3 ? this.membersId : "",
        };
        console.log(data)
        this.$store
            .dispatch("creditTransfer", data)
            .then((respons) => {
              this.isLoading = false;
              if (respons.data.succeed) {
                this.$router.push(`/credits`)
              } else {
                this.toast.error(respons.data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
              }
              console.log(respons)
            })
            .catch((error) => {
              this.isLoadingButton = false;
              this.isLoading = false;
              this.$store.dispatch("handleError", error);
              this.toast.error("خطا در اتصال!", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
              console.log(error);
            })
      } else {
        this.toast.error("حساب مبدا و مقصد مشابه میباشد", {
          position: "bottom-center",
          timeout: 3000,
          icon: true,
          rtl: true,
        });
      }
    }
  },
  watch:{
    transactionType: function (){
      console.log(this.transactionType)
      if(this.transactionType == null){
        this.transactionType = -1;
      }
      this.searchQueryBank = "";
      this.descriptionCredit = "";
      this.creditFinall = "";
      this.reducePrice = "";
      this.creditCustomer = "";
      this.searchQuery = "";
      this.dataInputBank = "";
      this.dataInput = "";
    },
    dataInputBank: function (val){
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
.newTransaction {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  position: relative;

  .content {
    margin: 5rem 23%;
    @media (max-width: 768px) {
      margin: 0.5rem !important;
    }

    .newTransaction-items {
      position: relative;

      .form-button {
        width: 30%;
        float: left;
        margin-top: 3rem;
        @media (max-width: 768px) {
          width: 100%;
          float: unset;
        }
      }

      .search-host {
        width: 100%;
      }

      textarea {
        height: 10rem !important;
      }

      .increase {
        .title {
          color: #019F24;
          font-weight: 600 !important;
        }

        input {
          border-color: #019F24 !important;
          color: #019F24;
        }
      }

      .decreased {
        .title {
          color: red;
          font-weight: 600 !important;
        }

        input {
          border-color: red !important;
          color: red;
        }
      }

      .item {
        position: relative;
        display: grid;
        align-items: center;
        column-gap: 1rem;
        margin-bottom: 1.5rem;
        grid-template-columns: 25% auto;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          .title {
            margin-bottom: 0.5rem;
          }
        }

        .title, .multiselect-single-label-text {
          font-weight: 400;
          font-size: 14px;
        }

        input {
          position: relative;
          padding: 4px 10px;
        }

        .search-customer {
          position: relative;

          .submit-search {
            top: 0.2rem;
          }

          .loading-search {
            top: 2px;
          }

        }

        label {
          position: absolute;
          left: 6px;
          top: 6px;
          margin: 0;
          @media (max-width: 768px) {
            top: 37px;
          }
        }
      }
    }

    .multiselect {
      background-color: #fff;
      color: #393939;
      border-color: #CDCDCD;
      grid-area: unset;

      .multiselect-placeholder {
        color: #b9b9b9;
        font-weight: 400;
        font-size: 14px;
      }

      .multiselect-caret {
        background-color: #CDCDCD;
      }
    }
  }
}

.search-result {
  position: absolute;
  top: 3rem;
  z-index: 9;
  background-color: #fff;
  width: 100%;
  border: 1px solid #d2d6da;
  border-radius: 7px;
  padding: 15px 12px;
  max-height: 25rem;
  overflow-y: scroll;

  span {
    font-size: 13px;
  }

  button {
    color: #344767;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
