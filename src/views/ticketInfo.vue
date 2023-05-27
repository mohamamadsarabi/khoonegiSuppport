<template>
  <div
      class="nav-wrapper ticketInfo position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header-info" v-if="windowWith >= 768">
      <div class="details-ticket">
        <div class="item">
          <h6>نام میزبان:</h6>
          <p>{{ sellerName }}</p>
        </div>
        <div class="item">
          <h6>دسته بندی:</h6>
          <p>{{ categoryInfoTicket }}</p>
        </div>
        <div class="item">
          <h6>تاریخ ایجاد تیکت:</h6>
          <p>{{ createTimeTicket }}</p>
        </div>
      </div>
      <div class="close-ticket">
        <khoonegiButton
            style=" width: auto; font-size: 13px; margin-top: 0;"
            class="form-button failed"
            text="بستن تیکت"
            @click.prevent="closeTicket"
        />
      </div>
    </div>
    <div class="header-info" v-else-if="windowWith <= 768">
      <div class="details-ticket">
        <div class="item">
          <p>{{ sellerName + sellerName && categoryInfoTicket ? " - " : '' + categoryInfoTicket }}</p>
        </div>
      </div>
      <div class="close-ticket">
        <khoonegiButton
            style=" width: auto; font-size: 13px; margin-top: 0;"
            class="form-button failed"
            text="بستن تیکت"
            @click.prevent="closeTicket"
        />
      </div>
    </div>
    <div class="chat-ticket">
      <div class="content-ticket">
        <div v-for="ticket in messageList" :key="ticket"
             :class="ticket.sender == 3 ? 'support-message content' : ticket.sender == 1 ? 'seller-message content' : 'content'">
          <img
              v-if="ticket.profileMedia"
              :style="ticket.profileMedia ? 'width: 4% !important;' :''"
              :src="ticket.profileMedia">
            <defaultImage :style="ticket.profileMedia ? 'width: 4% !important;' :''" v-else-if="ticket.sender == 1"/>
            <sellerDefaultImage :style="ticket.profileMedia ? 'width: 4% !important;' :''" v-else/>
<!--          <img-->
<!--              v-else-if="ticket.sender == 1"-->
<!--              :style="ticket.profileMedia ? 'width: 4% !important;' :''"-->
<!--              :src="sellerDefaultImage">-->
<!--          <img-->
<!--              v-else-->
<!--              :style="ticket.profileMedia ? 'width: 4% !important;' :''"-->
<!--              :src="defaultImage">-->
          <p>{{ ticket.message }}
            <span>{{ ticket.date }}</span>
            <img v-if="ticket.fileType == 'png' || ticket.fileType == 'jpeg' || ticket.fileType == 'svg' || ticket.fileType == 'webp' || ticket.fileType == 'avif' || ticket.fileType == 'jpg' && ticket.media" :src="ticket.media">
            <a class="d-block mt-3" v-else-if="ticket.fileType == 'pdf'" :href="ticket.media" target="_blank" download>دانلود فایل</a>
          </p>
        </div>
      </div>
      <div class="mt-8 mb-3">
        <div class="reply-ticket">
          <div class="upload-media">
            <input ref="fileInputReply"
                   accept="image/x-png,image/jpeg,application/pdf"
                   class="file-input"
                   type="file"
                   @change="onSelectFile"/>
            <button :disabled="imgMedia ? true : false" @click="chooseImage">
<!--              <img :src="uploadReply">-->
              <uploadReply />
            </button>
          </div>
          <div class="message-box">
            <div v-if="imgMedia" class="selected-image">
              <button @click="imgMedia = null , replyTicketMedia = null">✘</button>
              <img :src="imgMedia" :style="{ 'width' : `${replyTicketMedia.type == 'application/pdf' ? `6% !important` : `auto !important`}`}">
            </div>
            <textarea class="global-input reply-text" v-model="messageReply" rows='1' @keydown="keymonitor"></textarea>
            <button class="send-reply" @click="sendReplyTicket">
<!--              <img :src="send">-->
              <send />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isloading"/>
</template>
<script>
import LoadingFull from "../components/LoadingCircle";
import defaultImage from "../components/defaultImage";
import sellerDefaultImage from "../components/sellerDefualtImage";
import uploadReply from "../components/uploadReplay";
import send from "../components/send";
import pageToTop from "../components/pageToTop";
import {useToast} from "vue-toastification";
import khoonegiButton from "../components/khoonegiButton.vue";
import pdfPlaceholder from "../assets/img/pdf.svg";

export default {
  components: {
    pageToTop,
    khoonegiButton,
    defaultImage,
    sellerDefaultImage,
    uploadReply,
    send,
    LoadingFull
  },
  data() {
    return {
      pdfPlaceholder,
      // defaultImage: defaultImage,
      // sellerDefaultImage: sellerDefaultImage,
      // uploadReply: uploadReply,
      // send: send,
      toast: useToast(),
      windowWith: window.innerWidth,
      isSearchLoading: false,
      isloading: false,
      sellerName: "",
      categoryInfoTicket: "",
      createTimeTicket: "",
      messageList: [],
      messageReply: "",
      replyTicketMedia: null,
      imgMedia: null
    };
  },
  mounted() {
    this.isloading = true;
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
    this.getTicketInfo()
  },
  methods: {
    chooseImage() {
      this.$refs.fileInputReply.click();
    },
    onSelectFile(event) {
      this.replyTicketMedia = event.target.files[0];
      const input = event.target;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if(this.replyTicketMedia.type == "application/pdf"){
            console.log("pdf")
            this.imgMedia = this.pdfPlaceholder;
          } else {
            this.imgMedia = e.target.result;
          }
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    keymonitor() {
      var el = document.querySelector('.reply-text');
      setTimeout(function () {
        el.style = 'height:auto; padding:0';
        el.style = 'height:' + el.scrollHeight + 'px';
      }, 0);
    },
    getTicketInfo() {
      const data = {
        TiketId: this.$route.params.id
      };
      this.$store
          .dispatch("ticketInfo", data)
          .then((respons) => {
            this.isloading = false;
            console.log(respons)
            if (respons.data.succeed) {
              const headerInfo = respons.data.tiketResult;
              this.sellerName = headerInfo.sellerName;
              this.categoryInfoTicket = headerInfo.tiketPart;
              this.createTimeTicket = headerInfo.createDate;
              this.messageList = headerInfo.messageList;
              this.messageList.map((item)=>{
                item.fileType = item.media.split(".");
                item.fileType = item.fileType.slice(-1)[0];
              })
            }
          })
          .catch((error) => {
            this.isloading = false;
            this.$store.dispatch("handleError", error);
            console.log(error);
          });
    },
    closeTicket() {
      const data = {
        TiketId: this.$route.params.id
      };
      this.$store
          .dispatch("closeTicket", data)
          .then((respons) => {
            if (respons.data.succeed) {
              this.$router.push("/support");
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
            this.isloading = false;
            this.$store.dispatch("handleError", error);
            console.log(error);
          });
    },
    sendReplyTicket() {
      this.isloading = true;
      this.isDisabled = true;
      var headers = new Headers();
      headers.append("Authorization", `Bearer ${this.$store.state.token}`);
      var formdata = new FormData();
      formdata.append("TiketId", this.$route.params.id);
      formdata.append("Message", this.messageReply);
      if (this.replyTicketMedia && this.replyTicketMedia.name) {
        formdata.append(
            "Media",
            this.replyTicketMedia,
            this.replyTicketMedia.name
        );
      }

      var requestOptions = {
        method: "PUT",
        headers: headers,
        body: formdata,
        redirect: "follow",
      };
      const baseUrl = this.$store.state.baseUrl;
      fetch(`${baseUrl}Seller/ResponseTiket`, requestOptions).then((result) => {
        return result
            .json()
            .then((data) => {
              console.log(data);
              if (data.succeed) {
                this.isloading = false;
                this.isDisabled = false;
                this.replyTicketMedia = "";
                this.imgMedia = "";
                this.messageReply = "";
                this.toast.success(data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
                this.getTicketInfo();
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
    },
  },
}
</script>
<style lang="scss">

.ticketInfo {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
  border-radius: 20px;
  margin: 16px auto;

  .header-info {
    display: flex;
    align-items: end;
    justify-content: space-between;
    border-bottom: 0.5px solid #BFBFBF;
    padding-bottom: 15px;

    .details-ticket {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 5rem;
      @media (max-width: 768px) {
        display: block;
      }

      .item {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: baseline;
        grid-column-gap: 10px;

        h6 {
          font-weight: 700;
          font-size: 14px;
          color: #664ECA;
        }

        p {
          color: #393939;
          font-weight: 500;
          line-height: 30px !important;
          font-size: 14px;
        }
      }
    }
  }

  .chat-ticket {
    .selected-image {
      text-align: center;
      padding: 3% 0;
      border: 1px solid #CDCDCD;
      border-radius: 10px 10px 0 0;
      z-index: 0;
      position: relative;
      top: 8px;
      border-bottom: 0;
      @media (max-width: 768px) {
        padding: 10% 0;
      }

      button {
        position: absolute;
        top: 8%;
        left: 1%;
        @media (max-width: 768px) {
          top: 5%;
          left: 5%;
        }
      }

      img {
        max-height: 15rem;
        @media (max-width: 768px) {
          max-height: 10rem;
        }
      }
    }

    .content-ticket {
      margin: 3rem 0;

      p {
        position: relative;
        display: inline-block;
        color: #332E54;
        font-size: 14px;
        padding: 20px 30px;
        line-height: 30px !important;
        box-shadow: 0px 5px 16px rgba(8, 15, 52, 0.06);
        width: auto;
        background: #FFFFFF;
        max-width: 30%;
        min-width: 30%;
        @media (max-width: 1200px) {
          min-width: 50%;
          max-width: 100%;
        }

        img {
          display: block;
          margin: 15px 0;
          max-width: 100%;
          max-height: 10rem;
          border-radius: 0 !important;
        }
      }

      .content {
        display: flex;
        align-items: end;
        margin-bottom: 3rem;

        span {
          font-weight: 500;
          font-size: 13px;
          line-height: 15px;
          color: #BBBBBB;
          position: absolute;
          bottom: -28px;
        }

        img {
          width: auto !important;
          position: relative;
          top: 5px;
        }
      }

      .seller-message {
        text-align: left;
        direction: ltr;

        img {
          border-radius: 50%;
          margin-right: 15px;
        }
        svg {
          border-radius: 50%;
          margin-right: 15px;
        }

        p {
          border: 1px solid #FFD8BB;
          border-radius: 40px 40px 40px 5px;
          img {
            border-radius: 0 !important;
          }
        }

        span {
          left: 0;
        }
      }

      .support-message {
        span {
          right: 0;
        }

        p {
          border: 1px solid #CBBFFF;
          border-radius: 40px 40px 5px 40px;
        }

        img {
          margin-left: 15px;
        }
        svg {
          margin-left: 15px;
        }
      }
    }

    .reply-ticket {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 1%;
      align-items: end;

      img {
        width: auto !important;
      }
      svg {
        width: auto !important;
      }

      .message-box {
        position: relative;

        .global-input {
          display: block;
          overflow: hidden;
          padding-left: 5%;
          @media (max-width: 768px) {
            padding-left: 20%;
          }
        }

        .send-reply {
          position: absolute;
          left: 20px;
          bottom: 9px;
        }
      }

      .upload-media {
        position: relative;
        bottom: 5px;
      }
    }
  }
}
</style>
