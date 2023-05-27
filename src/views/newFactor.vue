<template>
  <div
      class="nav-wrapper newFactor position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header">
      <h6>شماره همراه:</h6>
      <div class="search-box">
        <div>
          <input type="number" placeholder="" class="global-input" @input="setSearch">
        </div>
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
    <div class="content">
      <div class="user-info">
        <div class="line-1">
          <div class="item">
            <label>نام:</label>
            <input type="text" class="global-input" v-model="firstName">
          </div>
          <div class="item">
            <label>نام خانوادگی:</label>
            <input type="text" v-model="lastName" class="global-input">
          </div>
          <div class="item">
            <label>شماره ملی:</label>
            <input type="text" v-model="nationalCode" class="global-input">
          </div>
        </div>
        <div class="line-2">
          <div class="item">
            <label :style="!isExist ? 'opacity: 0.5' : ''">اعتبار(ریال):</label>
            <input type="text" v-model="credit" :disabled="!isExist ? true : false" class="global-input">
          </div>
          <div class="item">
            <label>آدرس:</label>
            <span v-if="newAddressAllow" class="new-address" @click="addressModal = true">+ آدرس جدید</span>
            <Multiselect
                class="select-address"
                v-model="address"
                :options="addressList"
                label="title"
                track-by="title"
                :searchable="true"
            />
          </div>
        </div>
      </div>
      <div style="text-align: left">
        <khoonegiButton
            v-if="searchQuery"
            :style="!isExist ? 'width: 15% !important;' : ''"
            class="form-button mt-0 dark-slate"
            :text="isExist ? 'مرحله بعد' : 'ثبت نام و مرحله بعد'"
            @click="nextStep"
        />
      </div>

    </div>
  </div>
  <Dialog v-model:visible="addressModal" class="address-modal-factor">
    <template #header>
      <div class="header">
        <h3>آدرس جدید</h3>
        <button @click="addressModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div v-if="showMap" id="mapContainer">
        <leafletMap @setAddress="getLatLong($event)"/>
        <khoonegiButton
            @click="reversAddress"
            class="form-button mt-4 slate-not"
            :loading="isloading"
            text="تایید"
        />
      </div>
      <div v-else class="details-address">
        <div class="selected-address">
          <label>آدرس انتخاب شده:</label>
          <button class="edit-address" @click="editModalAddress">ویرایش آدرس</button>
          <textarea v-model="selectAddress" class="global-input"></textarea>
          <div class="apartman">
            <div class="plaque">
              <label>پلاک:</label>
              <input type="number" v-model="plaque" class="global-input">
            </div>
            <div class="unit">
              <label>واحد:</label>
              <input type="number" v-model="unit" class="global-input">
            </div>
          </div>
          <div class="phoneNumber">
            <label>شماره تماس گیرنده:(اختیاری)</label>
            <input type="number" v-model="phoneNumber" class="global-input">
          </div>
        </div>
        <khoonegiButton
            :loading="isloading"
            @click="createAddress"
            class="form-button w-25 mt-4 slate-not"
            text="ایجاد آدرس"
        />
      </div>
    </div>
  </Dialog>
  <page-to-top/>
</template>

<script>
import leafletMap from "../components/map"
import Dialog from "primevue/dialog";
import khoonegiButton from "@/components/khoonegiButton.vue";
import pageToTop from "../components/pageToTop";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import lodash from "lodash";
import SearchLoading from "../components/searchLoading";
import {useToast} from "vue-toastification";
export default {
  name: "newFactor",
  components: {
    khoonegiButton,
    pageToTop,
    Multiselect,
    Dialog,
    leafletMap,
    SearchLoading,
  },
  data() {
    return {
      isloading: false,
      toast: useToast(),
      firstName: "",
      lastName: "",
      nationalCode: "",
      address: "0",
      credit: "",
      addressList: [],
      addressModal: false,
      latLng: {},
      showMap: true,
      showDetailsAddress: false,
      selectAddress: "",
      plaque: "",
      unit: "",
      phoneNumber: "",
      isSearchLoading: false,
      searchIndex: 0,
      searchQuery: "",
      customerId: "",
      addressIndex: this.addressList ? this.addressList.length : 0,
      isExist: true,
      newAddressAllow: false
    }
  },
  methods: {
    setSearch(val) {
      if (val.target.value.length == 11) {
        this.newAddressAllow = true;
        this.isSearchLoading = true;
        let query = this;
        this.searchIndex++;
        let curIndex = this.searchIndex;
        lodash.debounce(function () {
          if (query.searchIndex == curIndex || val.length == 0) {
            query.searchQuery = val.target.value;
            query.getCustomer();
          }
        }, 600)();
      } else if(val.target.value.length == 0){
        this.newAddressAllow = false;
        // this.phoneNumber = "";
        // this.firstName = "";
        // this.lastName = "";
        // this.nationalCode = "";
        // val.target.value = "";
        // this.plaque = "";
        // this.address = "";
        // this.unit = "";
        // this.credit = "";
        // this.latLng = {};
        // this.searchQuery = "";
        // this.addressList.length = 0;
        location.reload();
      }
    },
    nextStep(){
      localStorage.removeItem("customerName")
      if (this.isExist == true ){
        localStorage.setItem("customerName" , this.firstName + " " + this.lastName)
        // next step
        this.$router.push(`/newFactor/selectMenu/${this.customerId}`)
      } else {
        // register new user
        const data = {
          PhoneNumber: this.searchQuery,
          FirstName: this.firstName,
          LastName: this.lastName,
          NationalCode: this.nationalCode,
          Address: {
            Address: this.address,
            Plaque: this.plaque,
            Apartment: this.unit,
            PhoneNumber: this.phoneNumber,
            Latitude: this.latLng.lat,
            Longitude: this.latLng.lng,
            RouteName: ""
          }
        };
        this.$store
            .dispatch("registerNewCustomer", data)
            .then((respons) => {
              console.log(respons)
              if (respons.data.succeed) {
                this.customerId = respons.data.customer.customerId;
                this.toast.success(respons.data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
                this.isSearchLoading = false;
                localStorage.setItem("customerName" , this.firstName)
                this.$router.push(`/newFactor/selectMenu/${this.customerId}`)
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
              this.isSearchLoading = false;
              this.$store.dispatch("handleError", error);
              this.toast.error("خطا در اتصال!", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
              console.log(error);
            });
      }
    },
    // newRegister(){
    //   const data = {
    //     PhoneNumber: this.phoneNumber,
    //     FirstName: this.firstName,
    //     LastName: this.lastName,
    //     NationalCode: this.nationalCode,
    //     Address: {
    //       Address: this.address,
    //       Plaque: this.plaque,
    //       Apartment: this.unit,
    //       PhoneNumber: this.phoneNumber,
    //       Latitude: this.latLng.lat,
    //       Longitude: this.latLng.lng,
    //       RouteName: ""
    //     }
    //   };
    //   console.log(data)
    //   this.$store
    //       .dispatch("registerNewCustomer", data)
    //       .then((respons) => {
    //         console.log(respons)
    //         if (respons.data.succeed) {
    //           this.$store.state.customerId = respons.data.customer.customerId;
    //           this.toast.success(respons.data.message, {
    //             position: "bottom-center",
    //             timeout: 3000,
    //             icon: true,
    //             rtl: true,
    //           });
    //           this.isSearchLoading = false;
    //           this.$router.push("/newFactor/selectMenu")
    //         } else {
    //           this.isSearchLoading = false;
    //           this.toast.error(respons.data.message, {
    //             position: "bottom-center",
    //             timeout: 3000,
    //             icon: true,
    //             rtl: true,
    //           });
    //         }
    //       })
    //       .catch((error) => {
    //         this.isSearchLoading = false;
    //         this.$store.dispatch("handleError", error);
    //         this.toast.error("خطا در اتصال!", {
    //           position: "bottom-center",
    //           timeout: 3000,
    //           icon: true,
    //           rtl: true,
    //         });
    //         console.log(error);
    //       });
    // },
    getCustomer() {
      const data = {
        PhoneNumber: this.searchQuery,
      };
      this.$store
          .dispatch("verifyCustomer", data)
          .then((respons) => {
            console.log(respons)
            if (respons.data.isExist) {
              this.isExist = true;
              let userInfo = respons.data.customer;
              userInfo.address.forEach((item , index)=>{
                item.title = item.addressLine;
                item.value = index;
              })
              this.firstName = userInfo.firstName;
              this.lastName = userInfo.lastName;
              this.credit = (userInfo.credit * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.addressList = userInfo.address;
              this.nationalCode = userInfo.nationalCode;
              this.customerId = respons.data.customer.customerId;
              this.isSearchLoading = false;
            } else {
              this.isExist = false;
              this.isSearchLoading = false;
              this.toast.error("کاربر یافت نشد، لطفا اطلاعات کاربر را وارد نمایید", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            }
          })
          .catch((error) => {
            this.isSearchLoading = false;
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
    createAddress() {

      this.addressList.push({
        title: this.selectAddress,
        value: this.addressList >= 1 ? ++this.addressIndex : this.addressIndex = ++this.addressIndex - 1
      })
      this.addressModal = false;
    },
    getLatLong(event) {
      this.latLng = event;
    },
    editModalAddress() {
      this.showMap = true;
      this.showDetailsAddress = false;
    },
    reversAddress() {
      this.isloading = true;
      const data = {
        latitude: this.latLng.lat,
        longitude: this.latLng.lng,
      };
      this.$store
          .dispatch("getReversAddress", data)
          .then((respons) => {
            this.isloading = false;
            this.selectAddress = respons.data.address;
            this.showMap = false;
            this.showDetailsAddress = true;
          })
          .catch((error) => {
            this.isloading = true;
            this.$store.dispatch("handleError", error);
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    }
  }
}
</script>

<style lang="scss">

.address-modal-factor {
  width: 50rem !important;
  height: 34rem !important;

  .p-dialog-content {
    .content {
      margin: 5% 6% !important;

      .form-button {
        float: left;
        width: 20%;
        @media (max-width: 768px) {
          width: 50% !important;
        }
      }

      .details-address {
        .selected-address {
          label {
            font-weight: 400 !important;
            font-size: 13px;
            color: #979797;
          }

          .apartman {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 10%;
          }

          .global-input {
            margin-bottom: 1.5rem;
          }

          .edit-address {
            color: #664eca;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
            float: left;
          }
        }
      }
    }
  }
}

.newFactor {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .header {
    display: grid;
    grid-template-columns: auto 22%;
    align-items: baseline;
    column-gap: 1%;
    justify-content: right;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 1rem;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
    }

    .search-box {
      position: relative;

      .global-input {
        padding-right: 13%;
      }

      .submit-search {
        position: absolute;
        right: 1rem;
        top: 0.3rem;
        width: fit-content;
      }

      .loading-search {
        position: absolute;
        right: 9px;
        top: 4.7px;
        left: auto;
      }
    }

    h6 {
      color: #979797;
      font-weight: 400;
    }

    .global-input {
      &:focus {
        border-color: #664ECA !important;
      }

      &::placeholder {
        text-align: right;
      }
    }
  }

  .content {
    .user-info {
      margin: 2rem 0;

      .line-1 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 10%;
        margin-bottom: 3rem;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          grid-row-gap: 1rem;
        }
      }

      .line-2 {
        display: grid;
        grid-template-columns: 26.7% 63.3%;
        column-gap: 10%;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          grid-row-gap: 1rem;
        }
      }

      .item {
        label {
          color: #979797;
          font-weight: 400 !important;
          font-size: 14px;
        }

        .new-address {
          color: #664ECA;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          float: left;
        }

        .select-address {
          height: 40px;
          border-color: #cfcfda;
          background-color: unset;

          .multiselect-single-label {
            color: #9f9fb5;
          }
        }
      }
    }

    .form-button {
      width: 10%;
    }
  }
}
</style>
