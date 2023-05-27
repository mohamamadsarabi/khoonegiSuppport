<template>
  <div class="pageBanner-banner position-relative end-0 py-3 px-4 mx-4">
    <div class="row py-4">
      <div class="select">
        <div class="selected-page">
          <h6>انتخاب صفحه:</h6>
          <Multiselect
              class="page-select"
              v-model="pageId"
              :options="pageList"
              placeholder="انتخاب صفحه "
              label="title"
              track-by="title"
              :searchable="false"
          />
        </div>
      </div>
      <div class="banner-list">
        <div class="bannerView banners" v-if="pageId == 0">
          <h6 class="title">بنرهای کنونی:</h6>
          <div class="banner-slide" v-if="banner.length">
            <div class="bannerList" v-for="(item, i) in banner" :key="i">
              <img v-if="item" :src="item.media" alt=""/>
              <img v-else :src="defaultImage" alt=""/>
              <div class="details">
                <div class="link">
									<span class="title"
                  >لینک:
										<a v-if="item" :href="item.link" target="_blank">
											{{ item.link ? item.link : "ندارد" }}
										</a>
									</span>
                </div>
                <khoonegiButton
                    class="form-button mt-0 dark-slate-reverse"
                    text="ویرایش بنر"
                    @click="editBannerModal(item.id, item.link, item.media)"
                    :disabled="!item ? true : false"
                />
              </div>
            </div>
          </div>
          <span v-else>بنر ثبت نشده است</span>
        </div>
        <div class="bannerView" v-else>
          <h6 class="title">بنر کنونی:</h6>
          <div class="banner-box">
            <img v-if="banner" :src="banner.media" alt=""/>
            <img v-else :src="defaultImage" alt=""/>
            <div class="details">
              <div class="link">
								<span class="title"
                >لینک:
									<a v-if="banner" :href="banner.link" target="_blank">
										{{ banner.link ? banner.link : "ندارد" }}
									</a>
								</span>
              </div>
              <khoonegiButton
                  class="form-button mt-0 dark-slate-reverse"
                  text="ویرایش بنر"
                  @click="editBannerModal(banner.id, banner.link, banner.media)"
                  :disabled="!banner ? true : false"
              />
            </div>
          </div>
        </div>
        <!-- main page new-->
        <div v-if="pageId == 0">
          <div class="add-new-banner mt-4" v-if="banner.length < 3">
            <h6 class="title">بنر جدید:</h6>
            <div
                class="image-input"
                :style="{ 'background-image': `url(${bannerMedia})` }"
                @click="chooseImage"
            >
              <button v-if="!bannerMedia" class="placeholder-add mt-0">
                افزودن فایل بنر
              </button>
              <input
                  class="file-input"
                  ref="fileInput"
                  type="file"
                  @change="onSelectFile"
              />
            </div>

            <div class="select-link">
              <input type="radio" id="externalLinkMain" name="linkView" value="externalLink" v-model="linkView">
              <label for="externalLinkMain">لینک خارجی</label>
              <input type="radio" id="internalLinkMain" name="linkView" value="internalLink" v-model="linkView">
              <label for="internalLinkMain">لینک داخلی</label>
            </div>
            <span class="check" v-if="linkView == 'externalLink'">
										<input
                        class="check-box"
                        type="checkbox"
                        id="check"
                        v-model="isWebView"
                        @click="isWebView = !isWebView"
                    />
										<label for="check">نمایش در وب ویو</label>
									</span>
            <input
                v-if="linkView == 'externalLink'"
                class="global-input mt-4 add-link"
                type="text"
                v-model="bannerLink"
                placeholder="افزودن لینک (اختیاری)"
            />
            <Multiselect
                v-if="linkView == 'internalLink'"
                class="link-select"
                v-model="linkId"
                :options="pageAppList"
                placeholder="انتخاب صفحه "
                label="title"
                track-by="title"
                :searchable="false"
            />
            <khoonegiButton
                class="form-button mt-4 slate create-banner"
                text="بارگزاری"
                :loading="isloading"
                @click="createBanner"
                :disabled="this.isDisabled ||
					this.bannerMedia <= 0"
            />
          </div>
        </div>
        <!-- profile page new-->
        <div v-if="pageId == 1">
          <div class="add-new-banner mt-4">
            <h6 class="title">بنر جدید:</h6>
            <div
                class="image-input"
                :style="{ 'background-image': `url(${bannerMediaProfile})` }"
                @click="chooseImage"
            >
              <button v-if="!bannerMediaProfile" class="placeholder-add mt-0">
                افزودن فایل بنر
              </button>
              <input
                  class="file-input"
                  ref="fileInput"
                  type="file"
                  @change="onSelectFile"
              />
            </div>
            <div class="select-link">
              <input type="radio" id="externalLink" name="linkView" value="externalLink" v-model="linkView">
              <label for="externalLink">لینک خارجی</label>
              <input type="radio" id="internalLink" name="linkView" value="internalLink" v-model="linkView">
              <label for="internalLink">لینک داخلی</label>
            </div>
            <span class="check" v-if="linkView == 'externalLink'">
										<input
                        class="check-box"
                        type="checkbox"
                        id="checkA"
                        v-model="isWebView"
                        @click="isWebView = !isWebView"
                    />
										<label for="checkA">نمایش در وب ویو</label>
                </span>
            <input
                v-if="linkView == 'externalLink'"
                class="global-input mt-4 add-link"
                type="text"
                v-model="bannerLink"
                placeholder="افزودن لینک (اختیاری)"
            />
            <Multiselect
                v-if="linkView == 'internalLink'"
                class="link-select"
                v-model="linkId"
                :options="pageAppList"
                placeholder="انتخاب صفحه "
                label="title"
                track-by="title"
                :searchable="false"
            />
            <khoonegiButton
                class="form-button mt-4 slate create-banner"
                text="بارگزاری"
                :loading="isloading"
                @click="createBanner"
                :disabled="this.isDisabled || this.bannerMediaProfile <= 0"
            />
          </div>
        </div>
        <!-- blog page page new-->
        <div v-if="pageId == 2">
          <div class="add-new-banner mt-4">
            <h6 class="title">بنر جدید:</h6>
            <div
                class="image-input"
                :style="{ 'background-image': `url(${bannerMediaBlog})` }"
                @click="chooseImage"
            >
              <button v-if="!bannerMediaBlog" class="placeholder-add mt-0">
                افزودن فایل بنر
              </button>
              <input
                  class="file-input"
                  ref="fileInput"
                  type="file"
                  @change="onSelectFile"
              />
            </div>
            <div class="select-link">
              <input type="radio" id="externalLinkBlog" name="linkView" value="externalLink" v-model="linkView">
              <label for="externalLinkBlog">لینک خارجی</label>
              <input type="radio" id="internalLinkBlog" name="linkView" value="internalLink" v-model="linkView">
              <label for="internalLinkBlog">لینک داخلی</label>
            </div>
            <span class="check"  v-if="linkView == 'externalLink'">
										<input
                        class="check-box"
                        type="checkbox"
                        id="checkBlog"
                        v-model="isWebView"
                        @click="isWebView = !isWebView"
                    />
										<label for="checkBlog">نمایش در وب ویو</label>
									</span>
            <input
                v-if="linkView == 'externalLink'"
                class="global-input mt-4 add-link"
                type="text"
                v-model="bannerLink"
                placeholder="افزودن لینک (اختیاری)"
            />
            <Multiselect
                v-if="linkView == 'internalLink'"
                class="link-select"
                v-model="linkId"
                :options="pageAppList"
                placeholder="انتخاب صفحه "
                label="title"
                track-by="title"
                :searchable="false"
            />
            <khoonegiButton
                class="form-button mt-4 slate create-banner"
                text="بارگزاری"
                :loading="isloading"
                @click="createBanner"
                :disabled="this.isDisabled || this.bannerMediaBlog <= 0"
            />
          </div>
        </div>
        <!--
        <div class="add-new-banner mt-4" v-else-if="pageId > 0">
          <h6 class="title">بنر جدید:</h6>
          <div
            class="image-input"
            :style="{ 'background-image': `url(${bannerMedia})` }"
            @click="chooseImage"
          >
            <button v-if="!bannerMedia" class="placeholder-add mt-0">
              افزودن فایل بنر
            </button>
            <input
              class="file-input"
              ref="fileInput"
              type="file"
              @change="onSelectFile"
            />
          </div>
          <input
            class="global-input mt-4 add-link"
            type="text"
            v-model="bannerLink"
            placeholder="افزودن لینک (اختیاری)"
          />
          <khoonegiButton
            class="form-button mt-4 slate create-banner"
            text="بارگزاری"
            :loading="isloading"
            @click="createBanner"
            :disabled="setDisable()"
          />
        </div> -->
      </div>
    </div>
  </div>
  <Dialog v-model:visible="showEditModal" class="banner-modal-edit">
    <template #header>
      <div class="header">
        <h3>ویرایش بنر</h3>
        <button @click="showEditModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="image-banner">
        <img :src="getBannerMedia" alt=""/>
      </div>
      <input
          class="global-input link-banner"
          type="text"
          v-model="getBannerLink"
          placeholder="افزودن لینک (اختیاری)"
      />
    </div>
    <div class="button-box">
      <khoonegiButton
          class="form-button mt-0 failed"
          text="حذف بنر"
          :loading="isloading"
          @click="deleteBanner"
      />
      <khoonegiButton
          class="form-button mt-0 dark-slate"
          text="ویرایش بنر"
          :loading="isloading"
          @click="editBanner"
      />
    </div>
  </Dialog>
  <page-to-top/>
</template>
<script>
import {useToast} from "vue-toastification";
import khoonegiButton from "@/components/khoonegiButton.vue";
import defaultImage from "@/assets/img/placeholder-banner.png";
import Dialog from "primevue/dialog";
import pageToTop from "../components/pageToTop";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default {
  components: {
    khoonegiButton,
    Dialog,
    pageToTop,
    Multiselect,
  },
  data() {
    return {
      defaultImage,
      toast: useToast(),
      windowWith: window.innerWidth,
      banner: [],
      bannerMedia: null,
      bannerMediaProfile: null,
      bannerMediaBlog: null,
      getBannerMedia: null,
      selectedBannerMedia: null,
      bannerLink: "",
      getBannerLink: "",
      getBannerId: "",
      isDisabled: false,
      isloading: false,
      sellerActive: "",
      showEditModal: false,
      pageId: 0,
      linkId: 0,
      pageList: [
        {
          title: "صفحه اصلی",
          value: 0,
        },
        {
          title: "صفحه کاربری",
          value: 1,
        },
        {
          title: "صفحه بلاگ",
          value: 2,
        },
      ],
      pageAppList: [],
      linkView: "externalLink",
      isWebView: false
    };
  },
  mounted() {
    this.getBanners();
    this.redirectInAppType()
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile(event) {
      this.selectedBannerMedia = event.target.files[0];
      const input = event.target;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (this.pageId == 0) {
            this.bannerMedia = e.target.result;
          } else if (this.pageId == 1) {
            this.bannerMediaProfile = e.target.result;
          } else if (this.pageId == 2) {
            this.bannerMediaBlog = e.target.result;
          }
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },

    getBanners() {
      const data = {
        ApplicationPart: this.pageId,
      };

      this.$store
          .dispatch("getBannerList", data)
          .then((respons) => {
            this.isLoading = false;
            console.log(respons);
            if (respons.data.succeed) {
              this.banner =
                  this.pageId == 0 ? respons.data.banners : respons.data.banners[0];
              console.log(this.banner)
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
    redirectInAppType() {
      this.$store
          .dispatch("redirectInAppTypeDescription")
          .then((respons) => {
            this.isLoading = false;
            console.log(respons);
            this.pageAppList = respons.data;
          })
          .catch((error) => {
            this.$store.dispatch("handleError", error);
            this.isLoading = false;
            console.log(error);
          });
    },
    createBanner() {
      if (this.pageId >= 0) {
        this.isloading = true;
        this.isDisabled = true;
        var headers = new Headers();
        headers.append("Authorization", `Bearer ${this.$store.state.token}`);
        var formdata = new FormData();
        formdata.append(
            "Media",
            this.selectedBannerMedia,
            this.selectedBannerMedia.name
        );
        formdata.append("Link", this.bannerLink);
        formdata.append("ApplicationPart", this.pageId);
        formdata.append("RedirectName", this.linkId);
        formdata.append("IsInnerLink", this.linkView == 'internalLink' ? true : false);
        formdata.append("IsWebView", this.isWebView);
        var requestOptions = {
          method: "PUT",
          headers: headers,
          body: formdata,
          redirect: "follow",
        };
        const baseUrl = this.$store.state.baseUrl;
        fetch(`${baseUrl}Product/Banner`, requestOptions).then((result) => {
          return result
              .json()
              .then((data) => {
                console.log(data);
                if (data.succeed) {
                  this.isloading = false;
                  this.isDisabled = false;
                  this.isWebView = false;
                  this.selectedBannerMedia = "";
                  if (this.bannerMedia) {
                    this.bannerMedia = "";
                  } else if (this.bannerMediaProfile) {
                    this.bannerMediaProfile = "";
                  } else if (this.bannerMediaBlog) {
                    this.bannerMediaBlog = "";
                  }
                  this.bannerLink = "";
                  this.getBanners(this.pageId);
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
                this.isloading = false;
                this.isDisabled = false;
                this.showModalCreate = false;
                this.$store.dispatch("handleError", error);
                console.log(error);
              });
        });
      } else {
        this.toast.error("لطفا صفحه بارگزاری بنر را انتخاب کنید", {
          position: "bottom-center",
          timeout: 3000,
          icon: true,
          rtl: true,
        });
      }
    },
    editBannerModal(id, link, media) {
      this.showEditModal = true;
      this.getBannerLink = link;
      this.getBannerMedia = media;
      this.getBannerId = id;
    },
    editBanner() {
      this.isLoading = true;
      const data = {
        BannerId: this.getBannerId,
        Link: this.getBannerLink,
      };
      console.log(data);
      this.$store
          .dispatch("editSellerBanner", data)
          .then((respons) => {
            this.isLoading = false;
            console.log(respons);
            if (respons.data.succeed) {
              this.showEditModal = false;
              this.getBanners(this.getBannerId);
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
    deleteBanner() {
      this.isLoading = true;
      const data = {
        BannerId: this.getBannerId,
      };
      this.$store
          .dispatch("deleteSellerBanner", data)
          .then((respons) => {
            this.isLoading = false;
            console.log(respons);
            if (respons.data.succeed) {
              this.showEditModal = false;
              this.getBanners(this.getBannerId);
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
  },
  watch: {
    pageId: function () {
      this.getBanners();
    },
  },
};
</script>
<style lang="scss">
.pageBanner-banner {
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

  .pageBanner-list {
    h6 {
      font-weight: 700;
      font-size: 12px;
      color: #2f2a43;
      display: inline-block;
      margin: 12px 0;
    }

    hr {
      margin-top: 0;
    }

    .sellers {
      .pageBanner {
        &:first-child {
          display: none;
        }

        display: grid;
        align-items: baseline;
        grid-template-columns: 1fr auto;
        margin-bottom: 1rem;

        label {
          display: block;
          cursor: pointer;
          font-weight: 300 !important;
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

  .banner-list {
    .title {
      color: #979797;
      font-weight: 400;
    }

    .banner-box {
      border: 1px solid #eaeaea;
      border-radius: 16px;
    }

    img {
      border-radius: 10px;
      //max-height: 12rem;
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
      font-weight: 500;
    }

    .bannerView.banners {
      display: grid;
      justify-content: center;
      padding: 0 0 4% 0;

      img {
        min-width: 28rem;
        max-height: 8rem;
        min-height: 8rem;
      }
    }

    .bannerView {
      padding: 0 30% 4% 30%;
      border-bottom: 1px dashed #dddddd;
      @media (max-width: 992px) {
        padding: 0 0% 4% 0%;
      }
    }

    .bannerList {
      border: 1px solid #eaeaea;
      border-radius: 16px;
    }

    .banner-slide {
      display: flex;
      gap: 1%;
      @media (max-width: 1600px) {
        overflow: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        padding-bottom: 4%;
      }
    }

    .banner-slide::-webkit-scrollbar {
      height: 4px;
    }

    /* Track */
    .banner-slide::-webkit-scrollbar-track {
      background: #ffffff;
    }

    /* Handle */
    .banner-slide::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    .banner-slide::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .add-new-banner {
      padding: 0 30% 4% 30%;
      @media (max-width: 992px) {
        padding: 0 0% 4% 0%;
      }

      .placeholder-add {
        padding: 7px 25px;
      }

      .add-link {
        color: #979797;
        text-align: left;
        direction: ltr;

        &::placeholder {
          color: #979797;
          text-align: right;
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

      .select-link {
        margin-top: 1rem;

        label {
          margin: 0px 1rem;
          cursor: pointer;
        }
      }

      .link-select {
        margin-top: 1.5rem;
        width: 40%;
      }
      .check {
        margin-top: 1rem;
        display: block;
      }
    }
  }

  .select-pageBanner {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .select {
    width: 100%;
    border-bottom: 1px solid #9c9c9c;
    margin-bottom: 2rem;
    padding-bottom: 1rem;

    .selected-page {
      display: grid;
      grid-template-columns: 28% 40%;
      width: 30%;
      align-items: center;
      @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        align-items: baseline;
      }

      h6 {
        color: #2f2a43;
        font-weight: 400;
        margin: 0;
        font-size: 90%;
      }
    }
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
        max-height: 8rem;

      }
    }

    .link-banner {
      text-align: left;
      direction: ltr;

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

.page-select {
  grid-area: unset !important;
  background-color: #fff !important;
  color: #664eca !important;
  border-color: hsl(252, 54%, 55%) !important;
  height: fit-content;
  width: 100%;

  .multiselect-caret {
    background-color: #664eca !important;
  }

  .multiselect-placeholder {
    color: #664eca !important;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
}
</style>
