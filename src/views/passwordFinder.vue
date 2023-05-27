<template>
  <div
      class="nav-wrapper passwordFinder position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header">
      <Multiselect
          class="user-type"
          v-model="userType"
          :options="typeUserList"
          placeholder="انتخاب کنید "
          label="title"
          track-by="value"
      />
    </div>
    <div v-if="userType == 0 || userType == 1" class="password">
      <div class="set-phoneNumber mb-3">
        <label>ورود شماره همراه:</label>
        <input class="global-input" v-model="phoneNumber" type="tel">
      </div>
      <div class="get-password">
        <label>رمز این شماره:</label>
        <input :class="passwordNumber.length ? 'global-input set-value' : 'global-input'" disabled type="number"
               v-model="passwordNumber">
      </div>
      <div class="btn-box">
        <button @click="newPhone" class="new-phone">شماره جدید</button>
        <khoonegiButton
            @click="getPassword"
            class="form-button mt-0 slate"
            text="جستجوی رمز"
            :disabled="passwordNumber.length ? true : false"
        />
      </div>

    </div>
    <div class="password text-center" v-else>
      لطفا کاربر موردنظر را انتخاب کنید
    </div>
  </div>
</template>

<script>
import khoonegiButton from "@/components/khoonegiButton.vue";
import {useToast} from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
export default {
  name: "passwordFinder",
  components: {
    khoonegiButton,
    Multiselect
  },
  data() {
    return {
      toast: useToast(),
      passwordNumber: "",
      phoneNumber: "",
      typeUserList: [
        {
          title: "مشتری",
          value: 0
        },
        {
          title: "میزبان",
          value: 1
        },
      ],
      userType: Number
    }
  },
  methods: {
    newPhone(){
      this.phoneNumber = "";
      this.passwordNumber = "";
    },
    getPassword() {
      const data = {
        PhoneNumber: this.phoneNumber,
        type: this.userType
      };
      console.log(this.phoneNumber)


      this.$store
          .dispatch("getCodeLogin", data)
          .then((respons) => {
            console.log(respons);
            if(respons.data.succeed){
              this.isLoading = false;
              this.passwordNumber = respons.data.code;
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
.passwordFinder {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .header {
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 15px;

    .user-type {
      grid-area: unset;
      background-color: #fff;
      color: #664ECA;
      border-color: #664ECA;
      height: fit-content;
      width: 100%;
      border-radius: 5px;
      width: 17%;

      .multiselect-caret {
        background-color: #664ECA !important;
      }

      .multiselect-placeholder {
        color: #664ECA;
      }

      @media (max-width: 768px) {
        width: 100%;
        margin: 0;
      }

    }
  }

  .password {
    padding: 15% 28%;
    @media (max-width: 1000px) {
      padding: 15% 1%;
    }

    .set-value {
      color: #1c1c1c;
      border-color: #d144b1 !important;
    }

    label {
      color: #979797;
      font-weight: 300 !important;
    }

    .get-password {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: baseline;
      column-gap: 5%;
    }

    .btn-box {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: baseline;
      column-gap: 45%;
      margin-top: 2rem !important;

      @media (max-width: 580px) {
        column-gap: 0;
        grid-template-columns: 1fr;
        margin-top: 2rem;
      }
    }
    .new-phone {
      color: #664eca;
      font-size: 15px;
      font-weight: 600;
    }
    .form-button {
      font-size: 14px;
      font-weight: 400;
      @media (max-width: 580px) {
        margin-top: 0.8rem !important;
      }
    }

    .set-phoneNumber {
      .global-input {
        text-align: left;
      }
    }
  }
}
</style>
