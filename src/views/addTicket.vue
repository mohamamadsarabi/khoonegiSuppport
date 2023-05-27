<template>
  <div class="seller-banner position-relative end-0 py-3 px-4 mx-4">
    <div class="row py-4">
      <div class="seller-list col-lg-3">
        <div class="search-seller search-box">

          <vsud-input
              class="search-host"
              placeholder="جستجو براساس نام میزبان"
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
        <div class="head">
          <h6 v-if="sellerList">نام میزبان</h6>
          <div class="check">
            <input
                class="check-box"
                type="checkbox"
                id="sendAll"
                v-model="sendToAll"
                @click="sendToAll = !sendToAll"
            />
            <label for="sendAll">ارسال برای همه</label>
          </div>
        </div>
        <hr v-if="sellerList"/>
        <div class="sellers" v-if="sellerList.length >= 0">

          <div class="seller" id="sellerList" v-for="(seller, index1) in sellerListItems" :key="index1">

            <label :for="index1">{{ seller.name + `(${seller.brand})` }}</label>
            <input
                class="check-box"
                type="checkbox"
                :id="index1"
                :name="'seller' + index1"
                v-model="seller.selected"
                @click="seller.selected = !seller.selected"
                @input="sellerListAdd(seller.sellerId , seller.selected , seller)"
                :value="index1"
            />
          </div>
        </div>
        <div v-else style="text-align: center; font-size: 14px">
          موردی یافت نشد
        </div>
      </div>
      <div class="seprator col-lg-1"></div>
      <div class="add-new col-lg-8">
        <h6 class="title">پیام جدید</h6>
        <div class="details-message mt-3">
          <div class="selectCategory">
            <h6>دسته بندی:</h6>
            <Multiselect
                class="category-name"
                v-model="categoryTicket"
                :options="ticketParts"
                placeholder="انتخاب کنید "
                label="title"
                track-by="value"
            />
          </div>
          <div class="topic">
            <h6>موضوع:</h6>
            <input
                class="global-input"
                type="text"
                maxlength="70"
                v-model="topicTicket"
            />
          </div>
          <textarea placeholder="پیام خود را اینجا بنویسید... " v-model="descriptionTicket"
                    class="description-message global-input"></textarea>
          <div class="upload-image mt-3">
            <div>
              <div
                  class="image-input"
                  :style="{ 'background-image': `url(${addMedia})`, 'background-size' : `${mediaType == 'application/pdf' ? `15%` : `100%`}` }"
                  @click="chooseImage"
              >
                <button v-if="!addMedia" class="placeholder-add mt-0">
                  افزودن فایل
                </button>
                <input
                    accept="image/x-png,image/jpeg,application/pdf"
                    class="file-input"
                    ref="fileInput"
                    type="file"
                    @change="onSelectFile"
                />
              </div>
            </div>
          </div>
          <khoonegiButton
              class="form-button mt-4 slate create-banner"
              text="ارسال پیام"
              :loading="isloading"
              @click="createTicket"
              :disabled="setDisable()"
          />
        </div>
      </div>
    </div>
  </div>
  <page-to-top/>
</template>
<script>
// import lodash from "lodash";
import VsudInput from "@/components/VsudInput.vue";
import SearchLoading from "../components/searchLoading";
import {useToast} from "vue-toastification";
import khoonegiButton from "@/components/khoonegiButton.vue";
import defaultImage from "@/assets/img/placeholder-banner.png";
import pageToTop from "../components/pageToTop";
import pdfPlaceholder from "../assets/img/pdf.svg";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default {
  components: {
    VsudInput,
    SearchLoading,
    khoonegiButton,
    pageToTop,
    Multiselect
  },
  data() {
    return {
      pdfPlaceholder,
      defaultImage,
      toast: useToast(),
      windowWith: window.innerWidth,
      isSearchLoading: false,
      searchQuery: "",
      searchIndex: 0,
      sellerList: [],
      banner: {},
      ticketMedia: null,
      getticketMedia: null,
      selectedTicketMedia: null,
      topicTicket: "",
      getBannerLink: "",
      getBannerId: "",
      isDisabled: false,
      isloading: false,
      sellerActive: [{}],
      showEditModal: false,
      messageTicket: "",
      addMedia: null,
      categoryTicket: "",
      descriptionTicket: "",
      ticketParts: [],
      sendToAll: false,
      mediaType: "",
      selectedSeller: [],
      queryString: "",
    };
  },
  mounted() {
    this.$store.dispatch("getTicketParts").then((respons) => {
      console.log(respons)
      this.ticketParts = respons.data;
      this.ticketParts.forEach((item) => {
        item.title = item.name;
        item.value = item.partId;
      });
    });
    this.getSellerActive();
  },
  computed: {
    sellerListItems() {
      return this.sellerList.filter(post => post.name.toLowerCase().includes(this.queryString) | post.brand.toLowerCase().includes(this.queryString));
    }
  },
  methods: {
    sellerListAdd(id, selected, seller) {
      if (selected) {
        this.sellerActive.push(seller);
      } else {
        const index = this.sellerActive.findIndex(object => {
          return object.sellerId === id;
        });
        this.sellerActive.splice(index, 1);
      }
      this.sellerActive = this.sellerActive.filter(element => {
        if (Object.keys(element).length !== 0) {
          return true;
        }
        return false;
      });
      console.log(this.sellerActive)
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile(event) {
      this.selectedTicketMedia = event.target.files[0];
      console.log(this.selectedTicketMedia)
      this.mediaType = this.selectedTicketMedia.type;
      const input = event.target;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e)
          if (this.selectedTicketMedia.type == "application/pdf") {
            console.log("pdf")
            this.addMedia = this.pdfPlaceholder;
          } else {
            this.addMedia = e.target.result;
          }
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    setDisable() {
      if (this.isDisabled || !this.categoryTicket || !this.topicTicket || !this.descriptionTicket || !this.sendToAll && !this.sellerActive.length) {
        return true;
      } else {
        return false;
      }
    },
    setSearch(value) {
      console.log(value.target.value)
      this.queryString = value.target.value.toLowerCase();
    },
    getSellerActive() {
      const data = {
        QueryString: this.searchQuery,
      };
      this.$store.dispatch("getSellerActive", data).then((respons) => {
        console.log(respons);
        this.isSearchLoading = false;
        this.sellerList = respons.data;
        this.sellerList.splice(0, 1);
        this.sellerList.forEach((item) => {
          item.title = item.brand;
          item.name = item.name.toLowerCase();
          item.value = item.sellerId;
        });
      });
    },
    createTicket() {
      // this.sellerActive.splice(0, 1);
      this.isloading = true;
      this.isDisabled = true;
      var headers = new Headers();
      headers.append("Authorization", `Bearer ${this.$store.state.token}`);
      var formdata = new FormData();
      if (this.sellerActive.length || this.sendToAll) {
        formdata.append("PartId", this.categoryTicket);
        formdata.append("Message", this.descriptionTicket);
        formdata.append("SendToAll", this.sendToAll);
        if (this.selectedTicketMedia) {
          formdata.append(
              "Media",
              this.selectedTicketMedia,
              this.selectedTicketMedia.name
          );
        }
        formdata.append("Title", this.topicTicket);
        this.sellerActive.forEach((item) => {
          formdata.append("Sellers", item.sellerId);
        })
        var requestOptions = {
          method: "PUT",
          headers: headers,
          body: formdata,
          redirect: "follow",
        };
        console.log(requestOptions)
        const baseUrl = this.$store.state.baseUrl;
        fetch(`${baseUrl}Seller/NewTiket`, requestOptions).then((result) => {
          return result
              .json()
              .then((data) => {
                console.log(data);
                if (data.succeed) {
                  this.sendToAll = false;
                  this.isloading = false;
                  this.isDisabled = false;
                  this.selectedTicketMedia = "";
                  this.addMedia = "";
                  this.topicTicket = "";
                  this.categoryTicket = "";
                  this.descriptionTicket = "";
                  this.sellerActive = "";
                  this.toast.success(data.message, {
                    position: "bottom-center",
                    timeout: 3000,
                    icon: true,
                    rtl: true,
                  });
                } else {
                  this.isloading = false;
                  this.isDisabled = false;
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
                this.isloading = false;
                this.isDisabled = false;
                this.$store.dispatch("handleError", error);
                console.log(error);
              });
        });
      } else {
        this.isloading = false;
        this.isDisabled = false;
        this.toast.error("لطفا حداقل یک میزبان انتخاب نمایید", {
          position: "bottom-center",
          timeout: 3000,
          icon: true,
          rtl: true,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.seller-banner {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .seprator:before {
    content: "";
    position: absolute;
    top: 0;
    background: #d2d6da;
    width: 1px;
    height: 90%;
    padding: 0% 0%;
    margin: 2.5% 2%;
    @media (max-width: 992px) {
      display: none;
    }
  }

  .seller-list {
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 3rem;

      .check, label {
        margin: 0 !important;
      }

      h6 {
        font-weight: 700;
        font-size: 12px;
        color: #2f2a43;
        display: inline-block;
        margin: 12px 0;
      }
    }


    hr {
      margin-top: 0;
    }

    /* width */
    .sellers::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    .sellers::-webkit-scrollbar-track {
      background: #fff;
    }

    /* Handle */
    .sellers::-webkit-scrollbar-thumb {
      background: #b1b1b1;
    }

    /* Handle on hover */
    .sellers::-webkit-scrollbar-thumb:hover {
      background: #523fa2;
    }

    .sellers {
      max-height: 32rem;
      overflow-y: scroll;
      overflow-x: hidden;
      padding-left: 5%;

      .seller {
        &:first-child {
          display: grid !important;
        }

        display: grid;
        align-items: center;
        grid-template-columns: 1fr auto;
        margin-bottom: 1rem;

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

  .search-host {
    width: 100% !important;
    position: relative;
  }

  .add-new {
    padding: 0 10% 0 10%;
    display: grid;
    align-content: center;

    .title {
      font-weight: 700;
      font-size: 16px;
      color: #2F2A43;
      border-bottom: 1px solid #EBEBEB;
      padding-bottom: 15px;

    }

    .banner-box {
      border: 1px solid #eaeaea;
      border-radius: 16px;
    }

    img {
      border-radius: 10px;
    }

    .details {
      display: grid;
      grid-template-columns: 1fr auto;
      margin: 6% 3% 2% 3%;
      @media (max-width: 400px) {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
        margin: 5% 6% 5% 6%;
      }
    }

    button {
      font-size: 13px;
      padding: 2px 25px;
      font-weight: 600;
    }

    .details-message {
      .upload-image {
        display: block;
        //.image-input {
        //  background-size: contain;
        //}
      }

      .description-message {
        height: 150px;
        margin-top: 20px;
      }

      h6 {
        font-weight: 400;
        font-size: 13px;
        color: #979797;
      }

      > div {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-column-gap: 3%;
        align-items: center;
        margin-bottom: 1rem;
      }

      .topic {
        h6 {
          margin-left: 20px;
        }
      }

      .placeholder-add {
        padding: 7px 25px;
      }

      .add-link {
        color: #979797;

        &::placeholder {
          color: #979797;
        }
      }

      .image-input {
        background-size: 100%;
      }

      .create-banner {
        width: 22%;
        padding: 10px 0;
        font-size: 15px;
        float: left;
      }

      .category-name {
        grid-area: unset;
        background-color: #fff;
        color: #344767;
        border-color: #CDCDCD;
        height: 40px;
        width: 100%;
        border-radius: 5px;

        .multiselect-caret {
          background-color: #393939 !important;
        }

        .multiselect-placeholder {
          color: #CDCDCD;
        }

        @media (max-width: 768px) {
          width: 100%;
          margin: 0;
        }
      }
    }
  }

  .select-seller {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.p-dialog.banner-modal-edit {
  width: 35rem;
  height: 22rem;
  @media (max-width: 768px) {
    width: 28rem;
    height: 20rem;
  }

  .content {
    margin: 5% 10%;

    .create-discount {
      width: 35%;
      display: block;
      float: left;
    }

    .image-banner {
      img {
        width: 100%;
      }
    }

    .link-banner {
      text-align: left;
    }
  }

  .button-box {
    margin: 0% 10%;
    display: grid;
    grid-template-columns: 30% 30%;
    gap: 15px;
    justify-content: left;
    @media (max-width: 768px) {
      grid-template-columns: 38% 38%;
    }

    button {
      font-size: 13px;
      padding: 5px 30px;
    }
  }
}
</style>
