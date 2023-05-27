<template>
  <div
      class="nav-wrapper newUser position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header">
      <h6>کاربر جدید</h6>
    </div>
    <div class="content">
      <div class="firstName">
        <label>نام:</label>
        <input type="text" v-model="firstName" class="global-input">
      </div>
      <div class="lastName">
        <label>نام خانوادگی:</label>
        <input type="text" v-model="lastName" class="global-input">

      </div>
      <div class="userName">
        <label>نام کاربری:</label>
        <input type="text" :style="errorMessage ? borderStyle : ''" @keypress="checkUserName" v-model="userName" class="global-input">
        <transition name="fade" mode="out-in">
          <span v-if="errorMessage" class="error-message">نام کاربری تنها با کاراکتر انگلیسی امکان پذیر است!</span>
        </transition>
      </div>

      <div class="password">
        <label>رمزعبور:</label>
        <input type="text" v-model="password" class="global-input">
      </div>
      <div class="password">
        <label>نوع دسترسی:</label>
        <Multiselect
            v-model="typeName"
            :options="this.$store.state.cancellStateUser"
            placeholder="انتخاب کنید "
            label="title"
            track-by="value"
        />
      </div>
    </div>
    <div class="footer">
      <div class="btn-box">
        <span class="check">
					<input
              class="check-box"
              type="checkbox"
              id="checkEnable"
              v-model="enable"
              @click="setEnable()"
          />
					<label for="checkEnable">فعال</label>
				</span>
        <khoonegiButton
            class="form-button mt-0 slate"
            text="تایید اطلاعات"
            :icon="false"
            @click="registerUser"
        />
      </div>
    </div>
  </div>
  <page-to-top/>
</template>

<script>
import {useToast} from "vue-toastification";
import khoonegiButton from "../components/khoonegiButton.vue";
import pageToTop from "@/components/pageToTop";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
export default {
  name: "newUser",
  components:{
    pageToTop,
    khoonegiButton,
    Multiselect
  },
  data(){
    return {
      toast: useToast(),
      enable: false,
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      errorMessage: false,
      borderStyle: "border-color: red !important;",
      typeName: Number
    }
  },
  methods:{
    checkUserName(e){
      var regex = new RegExp("^[a-zA-Z0-9_]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
        this.errorMessage = false;
        return true;
      }
      e.preventDefault();
      this.errorMessage = true;
      return false;
    },
    setEnable(){
      this.enable = !this.enable;
    },
    registerUser(){
      if(this.firstName && this.lastName && this.userName && this.password){
        const data = {
          FirstName: this.firstName,
          LastName: this.lastName,
          UserName: this.userName,
          Password: this.password,
          IsActive: this.enable,
          Type: this.typeName
        };
        this.$store
            .dispatch("registerNewUser", data)
            .then((respons) => {
              console.log(respons)
              if (respons.data.succeed) {
                this.toast.success(respons.data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
                this.$router.push(`/accessUsers`)
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
      } else {
        this.toast.error("اطلاعات کاربر ناقص است!", {
          position: "bottom-center",
          timeout: 3000,
          icon: true,
          rtl: true,
        });
      }

    }
  }
}
</script>

<style lang="scss">
.newUser {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .header {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 5px;
  }
  .content {
    margin: 5rem 20%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 20%;
    grid-column-gap: 15%;
    @media (max-width: 768px){
      grid-template-columns: 1fr;
      margin: 2rem 0;
      grid-row-gap: 10%;
    }
    label {
      color: #979797;
      font-weight: 300 !important;
    }
    .userName {
      position: relative;
    }
  }
  .footer {
    text-align: left;
    margin: 5rem 20%;
    @media (max-width: 768px){
      margin: 3rem 0;
    }
    .btn-box {
      margin-top: 25%;
      display: grid;
      grid-template-columns: 1fr 30%;
      align-items: baseline;
      @media (max-width: 768px){
        grid-template-columns: 1fr 1fr;
        justify-items: flex-start;
        margin-top: 45%;
        .check-box {
          margin-left: 10px !important;
        }
      }
    }
  }
  .error-message {
    position: absolute;
    top: 5rem;
    font-size: 12px;
    color: red;
  }
}
</style>
