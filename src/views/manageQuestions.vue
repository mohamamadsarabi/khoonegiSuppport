<template>
  <div
      class="nav-wrapper manageQuestions position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header">
      <h6>مدیریت سوالات</h6>
      <div class="btn-box">
        <button @click="categoryModal = true">افزودن دسته بندی</button>
        <button @click="questionAddModal" class="not">افزودن سوال</button>
      </div>
    </div>
    <div class="container-lg-fluid">
      <div class="accordion mt-5" id="accordionExample" v-for="(health, index) in questionList" :key="index">
        <div class="category">
          دسته: {{health.categoryName}}
        </div>
        <div class="accordion-item" v-for="(question , i) in health.questions" :key="i">
          <textarea class="question-text global-input" v-model="question.text"/>
          <div class="edit-question">
            <div>
              <input
                  class="check-box active-question"
                  type="checkbox"
                  :id="'active-question' + i"
                  v-model="question.enabled"
                  @click="question.enabled = !question.enabled"
              />
              <label :for="'active-question' + i">فعال</label>
            </div>
            <button @click="editQuestion(health.categoryId , question.questionsId , question.text , question.enabled)">ویرایش</button>
          </div>
<!--          <div :id="'collapse' + i" class="accordion-collapse collapse" aria-labelledby="headingOne"-->
<!--               data-bs-parent="#accordionExample">-->
<!--            <div class="accordion-body">-->
<!--              <textarea class="global-input" placeholder="توضیحات:" :v-model="descriptionQuestion"></textarea>-->
<!--            </div>-->
<!--          </div>-->
          <button @click="rotation = !rotation" class="accordion-button" type="button" data-bs-toggle="collapse"
                  :data-bs-target="'#collapse' + i" aria-expanded="true" :aria-controls="'collapse' + i">
<!--            <svg :style="rotation ? 'transform: rotate(180deg);' : ''" xmlns="http://www.w3.org/2000/svg" width="19"-->
<!--                 height="19" viewBox="0 0 19 19" fill="none">-->
<!--              <path-->
<!--                  d="M14.3894 8.19913C14.647 7.93914 14.6452 7.51949 14.3852 7.26181C14.1252 7.00413 13.7055 7.006 13.4479 7.26599L11.9037 8.82396C11.277 9.45626 10.8458 9.88999 10.4803 10.1835C10.1253 10.4686 9.89731 10.5664 9.6931 10.5924C9.56487 10.6087 9.43513 10.6087 9.3069 10.5924C9.10269 10.5664 8.87468 10.4686 8.51969 10.1835C8.15425 9.88999 7.72296 9.45626 7.09628 8.82396L5.55215 7.26599C5.29447 7.006 4.87481 7.00413 4.61483 7.26181C4.35484 7.51949 4.35297 7.93914 4.61065 8.19913L6.1826 9.78517C6.77463 10.3825 7.25852 10.8708 7.68966 11.217C8.138 11.5771 8.59306 11.8377 9.1393 11.9073C9.37881 11.9379 9.62119 11.9379 9.8607 11.9073C10.4069 11.8377 10.862 11.5771 11.3103 11.217C11.7415 10.8708 12.2253 10.3826 12.8174 9.7852L14.3894 8.19913Z"-->
<!--                  fill="#664ECA"/>-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                    d="M9.5 0C4.25329 0 0 4.25329 0 9.5C0 14.7467 4.25329 19 9.5 19C14.7467 19 19 14.7467 19 9.5C19 4.25329 14.7467 0 9.5 0ZM1.32558 9.5C1.32558 4.98539 4.98539 1.32558 9.5 1.32558C14.0146 1.32558 17.6744 4.98539 17.6744 9.5C17.6744 14.0146 14.0146 17.6744 9.5 17.6744C4.98539 17.6744 1.32558 14.0146 1.32558 9.5Z"-->
<!--                    fill="#664ECA"/>-->
<!--            </svg>-->
          </button>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="categoryModal" class="categoryModal">
    <template #header>
      <div class="header">
        <h3>افزودن دسته بندی جدید</h3>
        <button @click="categoryModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="detail">
        <label>نام دسته بندی:</label>
        <input type="text" v-model="categoryName" class="global-input message-input">
      </div>
      <khoonegiButton
          class="form-button mt-0 slate create-Tips"
          text="ثبت"
          :loading="isLoading"
          @click="addCategory()"
          :disabled="categoryName ? false : true"
      />
    </div>
  </Dialog>
  <Dialog v-model:visible="questionModal" class="categoryModal questionModal">
    <template #header>
      <div class="header">
        <h3>افزودن سوال جدید</h3>
        <button @click="questionModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="detail">
        <label>متن سوال:</label>
        <input type="text" v-model="questionTextAdd" class="global-input message-input">
      </div>
      <div class="detail">
        <label>دسته بندی:</label>
        <Multiselect
            class="category-select"
            v-model="categorySelect"
            :options="categoryList"
            placeholder="انتخاب کنید"
            label="title"
            track-by="value"
        />
      </div>
      <khoonegiButton
          class="form-button mt-0 slate create-Tips"
          text="ثبت"
          :loading="isloading"
          @click="addQuestion()"
      />

    </div>
  </Dialog>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import LoadingFull from "@/components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import {useToast} from "vue-toastification";
import Dialog from "primevue/dialog";
import khoonegiButton from "@/components/khoonegiButton";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
export default {
  name: "manageQuestions",
  components: {
    LoadingFull,
    pageToTop,
    Dialog,
    khoonegiButton,
    Multiselect
  },
  data() {
    return {
      rotation: false,
      descriptionQuestion: "",
      windowWith: window.innerWidth,
      toast: useToast(),
      isLoading: false,
      disableHandle: true,
      questionText: "            1- آیا خاتون در صورت داشتن زخم، بریدگی، سوختگی، تاول یا جوش چرکین، محل را با یک نوار یا باند ضد آب کاملا پوشانده و از دستکش یکبار مصرف استفاده می نمایند؟\n",
      categoryModal: false,
      questionModal: false,
      categoryName: "",
      categorySelect: "",
      categoryList: [],
      questionTextAdd: "",
      questionList: []
    }
  },
  mounted() {
    this.getHealthQuestions()
  },
  methods: {
    questionAddModal(){
      this.questionModal = true;
      this.getCategoryList();
    },
    getCategoryList(){
      this.$store
          .dispatch("healthQuestionCategoriesList")
          .then((respons) => {
            console.log(respons);
            this.categoryList = respons.data.healthQuestionCategories;
            this.categoryList.map((item)=>{
              item.title = item.name;
              item.value = item.id;
            })
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
    addCategory(){
      this.isLoading = true;
      let data = {
        Name: this.categoryName,
        Description: ""
      };

      this.$store
          .dispatch("addHealthQuestionCategory", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.categoryModal = false;
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
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    },
    addQuestion(){
      this.isLoading = true;
      let data = {
        CategoryId: this.categorySelect,
        Text: this.questionTextAdd
      };

      this.$store
          .dispatch("addHealthQuestion", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.questionModal = false;
              this.categorySelect = "";
              this.questionTextAdd = "";
              this.getHealthQuestions();
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
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    },
    editQuestion(categoryId , questionsId , text , enabled){
      this.isLoading = true;
      let data = {
        QuestionId: questionsId,
        CategoryId: categoryId,
        Text: text,
        Enabled: enabled
      };
      console.log(data)
      this.$store
          .dispatch("editHealthQuestion", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.getHealthQuestions();
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
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    },
    getHealthQuestions(){
      this.$store
          .dispatch("healthQuestions")
          .then((respons) => {
            console.log(respons);
            this.questionList = respons.data.healthQuestion;
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
  },
  watch: {
    questionText: function () {
      this.disableHandle = false;
    }
  }
}
</script>

<style lang="scss">
.manageQuestions {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  @media (max-width: 768px) {
    font-size: 13px;
    p, button {
      font-size: 13px !important;
    }
  }

  .form-button {
    width: 12rem;
    float: left;
  }

  .header {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.3rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    h6 {
      color: #664eca;
      font-size: 14px;
      margin: 0;
    }

    span {
      font-size: 14px;
    }

    .btn-box {
      text-align: left;
      @media (max-width: 768px) {
        margin: 1rem 0 0 0;
      }

      .not {
        margin-right: 1rem;
        background-color: #664ECA;
        color: #fff;

        &:hover {
          color: #664ECA;
          background-color: #fff;
        }

        @media (max-width: 768px) {
          margin: 1rem 0 0 0;
        }
      }

      button {
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #664ECA;
        color: #664ECA;
        font-size: 14px;
        padding: 3px 30px;

        &:hover {
          color: #fff;
          background-color: #664ECA;
        }
      }

      @media (max-width: 768px) {
        display: grid;
      }
    }
  }

  .accordion {
    .category {
      display: inline;
      background-color: #fff;
      color: #664ECA;
      border: 1px solid #664ECA;
      border-radius: 10px;
      padding: 7px 50px;
      @media (max-width: 768px) {
        display: block;
        padding: 7px 30px;
      }
    }

    .question-text {
      margin-top: 2rem !important;
      border-color: transparent !important;
     @media (max-width: 768px){
       height: 8rem !important;
       max-height: 10rem !important;
     }

      &:focus {
        border-color: #d144b1 !important;
      }
    }

    .edit-question {
      margin: 2rem 0;
      display: flex;
      justify-content: left;
      column-gap: 30px;
      align-items: center;

      label {
        margin: 0;
      }

      @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      button {
        background-color: #664ECA;
        border-radius: 10px;
        border: 1px solid #664ECA;
        color: #fff;
        font-size: 14px;
        padding: 3px 30px;

        &:hover {
          color: #664ECA;
          background-color: #fff;
        }
      }

      .active-question {
        position: relative;

        &:checked:after {
          content: "✔";
          position: absolute;
          top: -1px;
          right: 4px;
          @media (max-width: 768px) {
            top: 2px;
          }
        }

        @media (max-width: 768px) {
          margin-left: 0.5rem !important;
        }
      }
    }

    .accordion-body {
      width: 32rem;
      margin: 1rem auto;
      @media (max-width: 768px) {
        width: 100%;
        padding: 0;
      }

      textarea {
        height: 8rem;
      }
    }

    .accordion-button {
      flex-direction: row-reverse;
      position: relative;
      @media (max-width: 768px) {
        padding-left: 0;
        padding-right: 0;
      }

      svg {
        z-index: 9;
        background-color: #fff;
      }

      &:before {
        content: "";
        position: absolute;
        left: 1%;
        background-color: #E9E9E9;
        width: 98%;
        height: 1px;
        z-index: 0;
      }
    }
  }
}
.categoryModal.questionModal {
  height: 18rem !important;
}
.categoryModal {
  width: 45rem !important;
  height: 15rem !important;

  .content {
    margin: 5% 8% !important;

    .detail {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      .category-select {
        width: 100%;
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
        }
      }
    }

    button {
      width: 10rem;
      float: left;
    }
  }
}
</style>
