<template>
  <div class="notify position-relative end-0 py-3 px-4 mx-4">
    <div class="header-notify">
      <h6>نوتیفای عمومی</h6>
      <div class="search-phone mt-3">
        <div class="select-customer">
          <span>دریافت کننده: </span>
          <div class="searchQuery">
            <vsud-input
                placeholder="شماره همراه یا نام مشتری"
                @input="setSearch"
            />
            <Transition>
              <div v-if="searchQuery.length >= 5" class="search-result">
                <ul v-if="cutomerList.length">
                  <li v-for="(item, i) in cutomerList" :key="i">
                    <button
                        @click.prevent="
											getCustomer(item.phoneNumber, item.name, item.customerId)
										"
                    >
                      {{ item.phoneNumber + " - " + item.name }}
                    </button>
                  </li>
                </ul>
                <span v-else>مشتری یافت نشد</span>
              </div>
            </Transition>
            <button
                class="close"
                @click="closeList()"
                v-if="searchQuery.length >= 5"
            >
              ✗
            </button>
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
        <div class="import-file">
          <!--          <button v-if="fileName" @click="removefile" class="remove-file mt-0">-->
          <!--            حذف فایل ضمیمه-->
          <!--          </button>-->
          <span v-if="fileName">{{ fileName }}</span>
          <button @click="chooseImage" class="add-file mt-0">
            افزودن فایل ضمیمه
          </button>
          <input
              class="file-input"
              ref="fileInput"
              accept=".xlsx,.xls,.csv"
              type="file"
              @change="onSelectFile"
          />
        </div>
      </div>
    </div>
    <div class="content-notify">
      <div class="selected-customer">
        <h6>انتخاب شده‌‌ها</h6>
        <ul v-if="selectedCustomer.length > 0">
          <li v-for="(customer, index) in selectedCustomer" :key="index">
            {{ customer.name + " - " + customer.phone }}
            <button @click="removeCustomerSelect(index)">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
              >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.51164 0C4.55937 0 2.97675 1.58262 2.97675 3.53489V3.72094H0.55814C0.249888 3.72094 0 3.97082 0 4.27908C0 4.58733 0.249888 4.83722 0.55814 4.83722H12.4651C12.7734 4.83722 13.0233 4.58733 13.0233 4.27908C13.0233 3.97082 12.7734 3.72094 12.4651 3.72094H10.0465V3.53489C10.0465 1.58262 8.4639 0 6.51164 0ZM6.51164 1.11628C7.8474 1.11628 8.93024 2.19913 8.93024 3.53489V3.72094H4.09303V3.53489C4.09303 2.19913 5.17588 1.11628 6.51164 1.11628Z"
                    fill="#9C9C9C"
                />
                <path
                    d="M1.85797 5.71466C1.82881 5.40779 1.5564 5.18266 1.24953 5.21181C0.942664 5.24097 0.717533 5.51337 0.746689 5.82024C0.816992 6.56017 0.943872 7.47187 1.10696 8.64378L1.31649 10.1493C1.5168 11.5891 1.6304 12.4057 1.87617 13.0746C2.33355 14.3195 3.14944 15.3175 4.19875 15.7603C4.76855 16.0007 5.4203 16.0004 6.39058 16.0001H6.6327C7.60297 16.0004 8.25473 16.0007 8.82453 15.7603C9.87383 15.3175 10.6897 14.3195 11.1471 13.0746C11.3929 12.4057 11.5065 11.5891 11.7068 10.1493L11.9163 8.64379C12.0794 7.47188 12.2063 6.56017 12.2766 5.82024C12.3057 5.51337 12.0806 5.24097 11.7737 5.21181C11.4669 5.18265 11.1945 5.40779 11.1653 5.71466C11.0976 6.42756 10.9741 7.31538 10.8088 8.50316L10.6136 9.90598C10.3974 11.4596 10.2984 12.1478 10.0993 12.6896C9.71539 13.7346 9.077 14.4421 8.39053 14.7318C8.0555 14.8732 7.64962 14.8837 6.51164 14.8837C5.37365 14.8837 4.96777 14.8732 4.63274 14.7318C3.94627 14.4421 3.30788 13.7346 2.92396 12.6896C2.72488 12.1478 2.62587 11.4596 2.40966 9.90598L2.21443 8.50317C2.04913 7.31538 1.9257 6.42756 1.85797 5.71466Z"
                    fill="#9C9C9C"
                />
                <path
                    d="M5.5814 6.51164C5.5814 6.20338 5.33152 5.9535 5.02326 5.9535C4.71501 5.9535 4.46512 6.20338 4.46512 6.51164V12.4651C4.46512 12.7734 4.71501 13.0233 5.02326 13.0233C5.33152 13.0233 5.5814 12.7734 5.5814 12.4651V6.51164Z"
                    fill="#9C9C9C"
                />
                <path
                    d="M8.55815 6.51164C8.55815 6.20338 8.30826 5.9535 8.00001 5.9535C7.69176 5.9535 7.44187 6.20338 7.44187 6.51164V12.4651C7.44187 12.7734 7.69176 13.0233 8.00001 13.0233C8.30826 13.0233 8.55815 12.7734 8.55815 12.4651V6.51164Z"
                    fill="#9C9C9C"
                />
              </svg>
            </button>
          </li>
        </ul>
        <span v-else>مشتری انتخاب نشده است</span>
      </div>
      <div class="add-notify">
        <div class="title-topic">
          <h6>موضوع نوتیفای:</h6>
          <input class="global-input" v-model="topicNotify" type="text"/>
        </div>
        <div class="text-notify">
          <h6>متن نوتیفای:</h6>
          <textarea class="global-input" v-model="textNotify"></textarea>
        </div>
        <div class="link-notify">
          <h6>لینک (اختیاری):</h6>
          <input class="global-input" v-model="linkNotify" type="text"/>
        </div>
        <div class="sender">
          <div class="check" v-if="!selectedCustomer.length">
            <input
                class="check-box"
                type="checkbox"
                id="sendAll"
                v-model="sendToAll"
                @click="sendToAll = !sendToAll"
            />
            <label for="sendAll">ارسال برای همه</label>
          </div>
          <khoonegiButton
              class="form-button mt-0 dark-slate create-notify"
              text="ارسال نوتیفای"
              :loading="isloading"
              @click="createNotify"
              :disabled="setDisable()"
          />
        </div>

      </div>
    </div>
  </div>
  <page-to-top/>
</template>
<script>
import VsudInput from "@/components/VsudInput.vue";
import SearchLoading from "../components/searchLoading";
import khoonegiButton from "@/components/khoonegiButton.vue";
import pageToTop from "../components/pageToTop";
import {useToast} from "vue-toastification";
import "@vueform/multiselect/themes/default.css";
import lodash from "lodash";

export default {
  components: {
    pageToTop,
    khoonegiButton,
    VsudInput,
    SearchLoading,
  },
  data() {
    return {
      isLoading: false,
      isSearchLoading: false,
      toast: useToast(),
      windowWith: window.innerWidth,
      linkNotify: "",
      textNotify: "",
      topicNotify: "",
      customerId: "",
      searchQuery: "",
      searchIndex: 0,
      cutomerList: [],
      selectedCustomer: [],
      isDisabled: false,
      customerList: [],
      sendToAll: false,
      selectedFile: "",
      fileName: ""
    };
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    removefile() {
      console.log(this.selectedFile)
      this.selectedFile = "";
    },
    onSelectFile(event) {
      console.log(this.selectedFile)
      this.selectedFile = event.target.files[0];
      const input = event.target;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        // reader.onload = (e) => {
        //   console.log(e)
        //   this.selectedFile = e.target.result;
        // };
        this.fileName = event.target.files[0].name;
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    createNotify() {
      if (this.selectedFile) {
        this.isLoading = true;
        this.isDisabled = true;
        var headers = new Headers();
        headers.append("Authorization", `Bearer ${this.$store.state.token}`);
        var formdata = new FormData();
        formdata.append(
            "Excel",
            this.selectedFile,
            this.selectedFile.name
        );
        formdata.append("Title", this.topicNotify);
        formdata.append("Message", this.textNotify);
        formdata.append("Link", this.linkNotify);
        var requestOptions = {
          method: "post",
          headers: headers,
          body: formdata,
          redirect: "follow",
        };
        const baseUrl = this.$store.state.baseUrl;
        fetch(`${baseUrl}Customer/MessageNotifyByExcel`, requestOptions).then((result) => {
          return result
              .json()
              .then((data) => {
                console.log(data);
                if (data.succeed) {
                  this.isLoading = false;
                  this.isDisabled = false;
                  this.selectedFile = "";
                  this.topicNotify = "";
                  this.textNotify = "";
                  this.linkNotify = "";
                  location.reload();
                  this.toast.success(data.message, {
                    position: "bottom-center",
                    timeout: 3000,
                    icon: true,
                    rtl: true,
                  });
                } else {
                  this.toast.error(data.message, {
                    position: "bottom-center",
                    timeout: 3000,
                    icon: true,
                    rtl: true,
                  });
                }
                return data;
              })
              .catch((error) => {
                this.isLoading = false;
                this.isDisabled = false;
                this.showModalCreate = false;
                this.$store.dispatch("handleError", error);
                console.log(error);
              });
        });
      } else {
        this.isLoading = true;
        this.isDisabled = true;
        const data = {
          Title: this.topicNotify,
          Message: this.textNotify,
          SendToAll: this.sendToAll,
          Link: this.linkNotify,
          Customers: this.customerList,
        };
        console.log(data)
        this.$store
            .dispatch("createNotify", data)
            .then((respons) => {
              console.log(respons);
              if (respons.data.succeed) {
                this.isLoading = false;
                this.isDisabled = false;
                this.sendToAll = false;
                this.selectedCustomer = "";
                this.customerList = [];
                this.topicNotify = "";
                this.textNotify = "";
                this.linkNotify = "";
                this.toast.success(respons.data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
              } else {
                this.isloading = false;
                this.isDisabled = false;
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
              this.isloading = false;
              this.isDisabled = false;
              console.log(error);
            });
      }


    },
    getIndexCutomer() {
      const data = {
        StringQuery: this.searchQuery,
      };
      this.$store
          .dispatch("getCustomerList", data)
          .then((respons) => {
            console.log(respons);
            this.isSearchLoading = false;
            this.cutomerList = respons.data;
            console.log(this.cutomerList)
          })
          .catch((error) => {
            this.$store.dispatch("handleError", error);
            this.isSearchLoading = false;
            console.log(error);
          });
    },
    setSearch(val) {
      this.isSearchLoading = true;
      let query = this;
      this.searchIndex++;
      let curIndex = this.searchIndex;
      lodash.debounce(function () {
        if (query.searchIndex == curIndex || val.length == 0) {
          query.searchQuery = val.target.value;
          query.getIndexCutomer();
        }
      }, 600)();
    },
    getCustomer(phone, name, id) {
      let isExist = false;
      for (let i = 0; i < this.selectedCustomer.length; i++) {
        if (this.selectedCustomer.at(i).id == id) {
          isExist = true;
        }
      }
      if (!isExist) {
        this.selectedCustomer.push({phone: phone, name: name, id: id});
        this.customerList.push(id);
      }
    },
    removeCustomerSelect(value) {
      this.selectedCustomer.splice(value, 1);
      this.customerList.splice(value, 1);
    },

    closeList() {
      this.searchQuery = "";
    },
    setDisable() {
      if (this.selectedFile && this.textNotify.length > 0 && this.topicNotify.length > 0) {
        return false;
      } else if (this.isDisabled || this.textNotify <= 0 || this.topicNotify <= 0 || (!this.selectedCustomer.length && this.sendToAll == false)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss">
// style transition
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.notify {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .header-notify {
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 20px;

    h6 {
      color: #664eca;
    }

    .import-file {
      text-align: left;
      word-break: break-word;
      @media (max-width: 768px) {
        margin-top: 1rem;
        display: grid;
      }

      .add-file {
        background-color: #664eca;
        color: #fff;
        font-size: 14px;
        padding: 5px 10px;
        margin-right: 1rem;
      }

      .remove-file {
        background-color: #ffffff;
        color: #FC5C5C;
        border: 1px solid #FC5C5C;
        font-size: 14px;
        margin-left: 1rem;
        padding: 5px 10px;
      }
    }
  }

  .search-phone {
    display: grid;
    align-items: baseline;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 1320px) {
      grid-template-columns: 15% 30%;
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .select-customer {
      display: grid;
      grid-template-columns: 20% 60%;
      align-items: baseline;
      @media (max-width: 1320px) {
        grid-template-columns: 15% 30%;
      }
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .close {
      position: absolute;
      left: 11%;
      top: 20%;
      @media (max-width: 768px) {
        left: 20%;
      }
    }

    input {
      &:focus {
        border-color: #664eca !important;
      }
    }

    .search-result {
      padding: 8px !important;
      border-color: #664eca !important;
      max-height: 25rem;
      overflow: scroll;
      direction: ltr;

      &::-webkit-scrollbar {
        width: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      button {
        text-align: left;
        width: 100%;
        direction: ltr;
        color: #999ca0;
        font-weight: 400;
        font-size: 14px;
        border-radius: 0 !important;
        padding: 1px 5px;

        &:hover {
          background-color: #664eca !important;
          color: #fff;
        }
      }

      span {
        font-size: 13px;
        display: block;
        text-align: center;
      }
    }
  }

  .content-notify {
    display: grid;
    grid-template-columns: 25% 1fr;
    @media (max-width: 990px) {
      grid-template-columns: 1fr;
    }

    .add-notify {
      margin: 5% 25%;
      @media (max-width: 990px) {
        margin: 5% 5%;
      }
    }

    h6 {
      color: #979797;
      font-size: 80%;
      font-weight: 500;
      margin: 4% 0 2% 0;
    }

    .text-notify {
      textarea {
        height: 5rem;
      }
    }

    .sender {
      margin-top: 3rem;
      display: flex;
      align-items: center;
      justify-content: left;
      column-gap: 16px;

      .create-notify {
        width: 25%;
        padding: 5px 0;
        //float: left;
        @media (max-width: 768px) {
          width: 50%;
        }
      }
    }

    .selected-customer {
      border-left: 1px solid #bfbfbf;
      padding-left: 8%;
      margin-top: 5%;
      @media (max-width: 768px) {
        border-left: none;
        padding-left: 0;
      }

      h6 {
        color: #000;
        border-bottom: 1px solid #ebebeb;
        padding-bottom: 10px;
        margin-top: 0;
      }

      ul {
        margin-top: 2rem !important;

        li {
          margin-bottom: 22px;
          font-size: 13px;
          color: #9c9c9c;
          display: flex;
          justify-content: space-between;

          button:hover path {
            fill: #000;
          }
        }
      }

      span {
        margin-top: 2rem !important;
        display: block;
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>
